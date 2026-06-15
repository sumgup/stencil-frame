import { createServer, IncomingMessage, ServerResponse } from "http";
import { readFile } from "fs/promises";
import { join, resolve } from "path";
import { parseBrandFile, createAdapter, BrandSpec, ContentBrief, CarouselOutput } from "@stencil-frame/core";
import { buildSystemPrompt, buildCarouselPrompt } from "../prompts/carousel.js";
import { buildWeakAnswerCheckPrompt, buildAct0ReflectionPrompt, buildAct0DraftPrompt, Act0QuestionId } from "../prompts/act0.js";
import { buildAct1WeakAnswerCheckPrompt, buildAct1ReflectionPrompt } from "../prompts/act1.js";

// Load .env into process.env (no-op if the file doesn't exist).
try {
  process.loadEnvFile(resolve(import.meta.dirname, "../../.env"));
} catch {
  // .env is optional — generation routes fail with a clear error if a key is missing.
}

const PORT = process.env.PORT ?? 3001;
const BRANDS_DIR = resolve(process.env.BRANDS_DIR ?? "../brands");

// ─── Simple router ────────────────────────────────────────────────────────────

function json(res: ServerResponse, status: number, data: unknown) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, x-api-key",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  });
  res.end(JSON.stringify(data));
}

async function readBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try { resolve(JSON.parse(body)); }
      catch { reject(new Error("Invalid JSON body")); }
    });
    req.on("error", reject);
  });
}

// ─── Route handlers ───────────────────────────────────────────────────────────

// GET /brands — list brands with enough data for the sidebar UI
async function listBrands(res: ServerResponse) {
  try {
    const { readdir } = await import("fs/promises");
    const files = await readdir(BRANDS_DIR);
    const ids = files.filter((f) => f.endsWith(".brand.md")).map((f) => f.replace(".brand.md", ""));
    const brands = await Promise.all(ids.map(async (id) => {
      const brand = await parseBrandFile(join(BRANDS_DIR, `${id}.brand.md`));
      return {
        id,
        name: brand.identity.name,
        tagline: brand.identity.tagline ?? "",
        colors: (brand.identity.visual as { color?: Record<string, string> } | undefined)?.color ?? {},
        moodKeywords: (brand.identity.visual as { $extensions?: { "org.frame.brand"?: { mood_keywords?: string[] } } } | undefined)
          ?.$extensions?.["org.frame.brand"]?.mood_keywords ?? [],
      };
    }));
    json(res, 200, { brands });
  } catch {
    json(res, 500, { error: "Could not read brands directory" });
  }
}

// GET /brands/:id — return parsed brand spec
async function getBrand(res: ServerResponse, id: string) {
  try {
    const filePath = join(BRANDS_DIR, `${id}.brand.md`);
    const brand = await parseBrandFile(filePath);
    json(res, 200, brand);
  } catch (err) {
    json(res, 404, { error: `Brand "${id}" not found` });
  }
}

// POST /generate/carousel — generate carousel from brand + brief
// Body: { brandId: string, brief: string, api_key?: string }
// Accepts camelCase brandId (from UI) and a plain-text brief string.
async function generateCarousel(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await readBody(req) as {
      brandId?: string;
      brand_id?: string;
      brief: string | ContentBrief;
      api_key?: string;
    };

    const brandId = body.brandId ?? body.brand_id;
    if (!brandId || !body.brief) {
      return json(res, 400, { error: "brandId and brief are required" });
    }

    // Accept brief as plain string or structured object
    const brief: ContentBrief = typeof body.brief === "string"
      ? { campaign: body.brief, channel: "instagram" }
      : body.brief;

    // Load brand
    const filePath = join(BRANDS_DIR, `${brandId}.brand.md`);
    const brand: BrandSpec = await parseBrandFile(filePath);

    // Create adapter — use request-supplied key or fall back to env
    const adapter = createAdapter({
      provider: "anthropic",
      apiKey: body.api_key ?? process.env.ANTHROPIC_API_KEY,
    });

    // Generate — tier: smart (core content generation)
    const response = await adapter.call(
      [
        { role: "system", content: buildSystemPrompt(brand) },
        { role: "user", content: buildCarouselPrompt(brand, brief) },
      ],
      "smart"
    );

    // Parse the JSON response
    const clean = response.content.replace(/```json|```/g, "").trim();
    const rawSlides = JSON.parse(clean);

    // Normalise slide shape for the UI
    const slides = rawSlides.map((s: { role?: string; name?: string; image_prompt?: string; imagePrompt?: string; [k: string]: unknown }) => ({
      ...s,
      name: s.role ?? s.name ?? "",
      imagePrompt: s.image_prompt ?? s.imagePrompt ?? "",
    }));

    json(res, 200, {
      brand: { id: brandId, name: brand.identity.name },
      brief,
      slides,
      generated_at: new Date().toISOString(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    json(res, 500, { error: message });
  }
}

// POST /act0/check-answer — is this Act 0 answer weak?
// Body: { question: "q1"|"q2"|"q3", answer: string, api_key?: string }
// tier: cheap
async function checkAct0Answer(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await readBody(req) as { question?: Act0QuestionId; answer?: string; api_key?: string };
    if (!body.question || typeof body.answer !== "string") {
      return json(res, 400, { error: "question and answer are required" });
    }

    const adapter = createAdapter({
      provider: "anthropic",
      apiKey: body.api_key ?? process.env.ANTHROPIC_API_KEY,
    });

    const response = await adapter.call(
      [{ role: "user", content: buildWeakAnswerCheckPrompt(body.question, body.answer) }],
      "cheap"
    );

    const clean = response.content.replace(/```json|```/g, "").trim();
    const { weak } = JSON.parse(clean) as { weak: boolean };
    json(res, 200, { weak: Boolean(weak) });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    json(res, 500, { error: message });
  }
}

// POST /act0/draft — scaffold a draft answer for q2/q3 from prior answers
// Body: { question: "q2"|"q3", q1: string, q2?: string, api_key?: string }
// tier: cheap
async function draftAct0Answer(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await readBody(req) as { question?: "q2" | "q3"; q1?: string; q2?: string; api_key?: string };
    if ((body.question !== "q2" && body.question !== "q3") || typeof body.q1 !== "string") {
      return json(res, 400, { error: "question (q2 or q3) and q1 are required" });
    }

    const adapter = createAdapter({
      provider: "anthropic",
      apiKey: body.api_key ?? process.env.ANTHROPIC_API_KEY,
    });

    const response = await adapter.call(
      [{ role: "user", content: buildAct0DraftPrompt(body.question, { q1: body.q1, q2: body.q2 }) }],
      "cheap"
    );

    json(res, 200, { draft: response.content.trim() });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    json(res, 500, { error: message });
  }
}

// POST /act0/reflect — reflect the three Act 0 answers back as one paragraph
// Body: { oneLiner: string, values: string, purpose: string, api_key?: string }
// tier: smart
async function reflectAct0(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await readBody(req) as { oneLiner?: string; values?: string; purpose?: string; api_key?: string };
    if (!body.oneLiner || !body.values || !body.purpose) {
      return json(res, 400, { error: "oneLiner, values, and purpose are required" });
    }

    const adapter = createAdapter({
      provider: "anthropic",
      apiKey: body.api_key ?? process.env.ANTHROPIC_API_KEY,
    });

    const response = await adapter.call(
      [{ role: "user", content: buildAct0ReflectionPrompt({ oneLiner: body.oneLiner, values: body.values, purpose: body.purpose }) }],
      "smart"
    );

    json(res, 200, { reflection: response.content.trim() });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    json(res, 500, { error: message });
  }
}

// POST /act1/check-answer — is this Act 1 answer weak?
// Body: { answer: string, api_key?: string }
// tier: cheap
async function checkAct1Answer(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await readBody(req) as { answer?: string; api_key?: string };
    if (typeof body.answer !== "string") {
      return json(res, 400, { error: "answer is required" });
    }

    const adapter = createAdapter({
      provider: "anthropic",
      apiKey: body.api_key ?? process.env.ANTHROPIC_API_KEY,
    });

    const response = await adapter.call(
      [{ role: "user", content: buildAct1WeakAnswerCheckPrompt(body.answer) }],
      "cheap"
    );

    const clean = response.content.replace(/```json|```/g, "").trim();
    const { weak } = JSON.parse(clean) as { weak: boolean };
    json(res, 200, { weak: Boolean(weak) });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    json(res, 500, { error: message });
  }
}

// POST /act1/reflect — organise the Act 1 answer into facts / obstacles / opportunities
// Body: { answer: string, oneLiner?: string, values?: string, purpose?: string, api_key?: string }
// tier: smart
async function reflectAct1(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await readBody(req) as {
      answer?: string;
      oneLiner?: string;
      values?: string;
      purpose?: string;
      api_key?: string;
    };
    if (!body.answer) {
      return json(res, 400, { error: "answer is required" });
    }

    const adapter = createAdapter({
      provider: "anthropic",
      apiKey: body.api_key ?? process.env.ANTHROPIC_API_KEY,
    });

    const response = await adapter.call(
      [{ role: "user", content: buildAct1ReflectionPrompt({ ...body, answer: body.answer }) }],
      "smart"
    );

    const clean = response.content.replace(/```json|```/g, "").trim();
    const { facts, obstacles, opportunities } = JSON.parse(clean) as {
      facts: string[];
      obstacles: string[];
      opportunities: string[];
    };
    json(res, 200, {
      facts: facts ?? [],
      obstacles: obstacles ?? [],
      opportunities: opportunities ?? [],
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    json(res, 500, { error: message });
  }
}

// ─── Server ───────────────────────────────────────────────────────────────────

const server = createServer(async (req, res) => {
  const url = req.url ?? "/";
  const method = req.method ?? "GET";

  // CORS preflight
  if (method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, x-api-key",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    });
    return res.end();
  }

  if (method === "GET" && (url === "/" || url === "/health")) {
    return json(res, 200, {
      status: "ok",
      version: "0.2",
      routes: [
        "GET /brands", "GET /brands/:id", "POST /generate/carousel",
        "POST /act0/check-answer", "POST /act0/draft", "POST /act0/reflect",
        "POST /act1/check-answer", "POST /act1/reflect",
      ],
    });
  }
  if (method === "GET" && url === "/brands") return listBrands(res);
  if (method === "GET" && url.startsWith("/brands/")) {
    const id = url.split("/brands/")[1];
    return getBrand(res, id);
  }
  if (method === "POST" && url === "/generate/carousel") return generateCarousel(req, res);
  if (method === "POST" && url === "/act0/check-answer") return checkAct0Answer(req, res);
  if (method === "POST" && url === "/act0/draft") return draftAct0Answer(req, res);
  if (method === "POST" && url === "/act0/reflect") return reflectAct0(req, res);
  if (method === "POST" && url === "/act1/check-answer") return checkAct1Answer(req, res);
  if (method === "POST" && url === "/act1/reflect") return reflectAct1(req, res);

  json(res, 404, { error: "Not found" });
});

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\n  Port ${PORT} is already in use.\n  Run: npx kill-port ${PORT}\n  Then retry: npm run dev\n`);
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, () => {
  console.log(`Frame server running on http://localhost:${PORT}`);
  console.log(`Brands directory: ${BRANDS_DIR}`);
});
