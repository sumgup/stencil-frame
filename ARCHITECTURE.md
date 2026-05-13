# Architecture

All decisions here are locked for v0.x. Re-open only if a decision creates genuine friction
in the build — not for preference.

## Runtime

**Node.js 20 LTS.** LLM SDKs are best in JS/TS. No install friction. Runs locally without
Docker. `npm install && npm run dev` is the entire setup story.

## Language

**TypeScript in core/ and frame/server/. Plain JS/JSX in frame/ui/.**

The brand.md schema has enough structure that `BrandSpec` types catch real bugs at the
LLM adapter boundary. The UI doesn't need types — it's a demo page, not a library.
No decorators, no fancy patterns. Strict mode on.

## UI framework

**React + Vite.** React for Frame's demo page only. Vite for zero-config fast bundling.
Stencil (v0.3) starts as CLI — no UI needed until there's a reason.

## Styling

**Tailwind CSS.** Works with React, zero design system overhead, looks good quickly.
No component library in v0.x.

## HTTP server

**Plain Node `http.createServer()`.** No Express, Fastify, or Hono. The API surface is
small (3 routes). A framework would add more weight than value. Revisit at v1.0 if the
route count grows beyond ~10.

## LLM calls

**Thin adapter in core/src/adapter/. Two tiers: smart and cheap.**

Every call site in the codebase is annotated `// tier: smart` or `// tier: cheap`.
Tier-to-model mapping lives only in the adapter config — never hardcoded elsewhere.
Defaults: smart = claude-sonnet-4-20250514, cheap = claude-haiku-4-5-20251001.
Override via env vars for any provider.

Supported providers: Anthropic, OpenAI (and OpenAI-compatible), Ollama (local).
No LangChain, LangGraph, or any agent framework.

## Data layer

**Markdown files on disk.** `brands/*.brand.md` is the database.
No SQLite, no JSON database, no multi-tenancy.
Local cost logging via SQLite is planned for v0.3 (optional, not blocking).

## Testing

| Layer | Tool | What it covers |
|---|---|---|
| Unit | Vitest | Parser, types, pure functions |
| Functional | Vitest | Prompt builders with real brand files |
| E2E | Playwright | Frame UI in a real browser |

The E2E test that exercises the full generation pipeline (brand → brief → slides)
is marked `test.skip` and only runs when `LLM_TEST_KEY` is set. This keeps CI fast
and cost-free.

## Monorepo structure

Three packages sharing one root `package.json` via npm workspaces:

```
@stencil-frame/core     ← types, parser, adapter. Zero UI dependencies.
@stencil-frame/frame    ← server + UI. Depends on core.
@stencil-frame/stencil  ← brand builder. Not built yet (v0.3).
```

`core` has no dependencies on `frame` or `stencil`. Frame and Stencil both depend on core.
Core is the thing you'd publish to npm if this becomes a library.

## brand.md as contract

`BrandSpec` in `core/src/types/brand.ts` is the single source of truth for what the system
knows about a brand. The parser produces it. The prompt builder consumes it. The LLM adapter
is brand-agnostic — it just moves messages.

If a new field is needed in brand.md:
1. Add it to `BrandSpec` in `core/src/types/brand.ts`
2. Add it to `SPEC.md`
3. Add it to `core/src/parser/index.ts`
4. Add a test in `tests/unit/parser.test.ts`

## Open questions (to resolve in later versions)

- **Framework layer in brand.md or separate file?** Currently in. Revisit when there's
  a second consumer of brand.md.
- **Local cost logging.** SQLite, optional Langfuse integration. Planned for v0.3.
- **DTCG visual token parsing.** Currently the parser skips the visual block (complex nested
  YAML). Full visual token parsing needed for v0.2 image generation integration.
