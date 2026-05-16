import { createServer, IncomingMessage, ServerResponse } from "http";
import { readFile } from "fs/promises";
import { join, resolve } from "path";
import { parseBrandFile, createAdapter, BrandSpec, ContentBrief, CarouselOutput } from "@stencil-frame/core";
import { buildSystemPrompt, buildCarouselPrompt } from "../prompts/carousel.js";

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

  if (method === "GET" && url === "/brands") return listBrands(res);
  if (method === "GET" && url.startsWith("/brands/")) {
    const id = url.split("/brands/")[1];
    return getBrand(res, id);
  }
  if (method === "POST" && url === "/generate/carousel") return generateCarousel(req, res);

  json(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`Frame server running on http://localhost:${PORT}`);
  console.log(`Brands directory: ${BRANDS_DIR}`);
});
