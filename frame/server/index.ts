import { createServer, IncomingMessage, ServerResponse } from "http";
import { readFile } from "fs/promises";
import { join, resolve } from "path";
import { parseBrandFile, createAdapter, BrandSpec, ContentBrief, CarouselOutput } from "@stencil-frame/core";
import { buildSystemPrompt, buildCarouselPrompt } from "../prompts/carousel.js";

const PORT = process.env.PORT ?? 3001;
const BRANDS_DIR = resolve(process.env.BRANDS_DIR ?? "../../brands");

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

// GET /brands — list available brand files
async function listBrands(res: ServerResponse) {
  try {
    const { readdir } = await import("fs/promises");
    const files = await readdir(BRANDS_DIR);
    const brands = files
      .filter((f) => f.endsWith(".brand.md"))
      .map((f) => f.replace(".brand.md", ""));
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
// Body: { brand_id: string, brief: ContentBrief, api_key?: string }
async function generateCarousel(req: IncomingMessage, res: ServerResponse) {
  try {
    const body = await readBody(req) as {
      brand_id: string;
      brief: ContentBrief;
      api_key?: string;
    };

    if (!body.brand_id || !body.brief) {
      return json(res, 400, { error: "brand_id and brief are required" });
    }

    // Load brand
    const filePath = join(BRANDS_DIR, `${body.brand_id}.brand.md`);
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
        { role: "user", content: buildCarouselPrompt(brand, body.brief) },
      ],
      "smart"
    );

    // Parse the JSON response
    const clean = response.content.replace(/```json|```/g, "").trim();
    const slides = JSON.parse(clean);

    const output: CarouselOutput = {
      brand_id: body.brand_id,
      brief: body.brief,
      slides,
      generated_at: new Date().toISOString(),
    };

    json(res, 200, output);
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
