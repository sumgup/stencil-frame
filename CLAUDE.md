# CLAUDE.md — instructions for AI coding agents

This file tells any AI agent (Claude, OpenCode, Cursor, Copilot) how to work in this repo.
Read this before writing any code, editing any file, or running any command.

## What this project is

**Stencil + Frame** — an open-source, AI-agnostic brand engine and content engine.

- **Stencil** builds brands: agent-assisted workflow → `brand.md` file
- **Frame** consumes `brand.md` and produces content (Instagram carousels first)
- **`brand.md`** is the portable single-file brand spec that connects them

Full context: `PROJECT_INSTRUCTIONS.md` and `SPEC.md` (in the Claude project).

## How to run

```bash
# Install all dependencies
npm install

# Run Frame dev server (UI + API)
npm run dev

# Run unit + functional tests
npm test

# Run E2E tests (requires Frame running)
npm run test:e2e

# Type check
npm run lint
```

## Project structure

```
brands/           ← brand.md files live here. One file per brand.
core/src/
  types/brand.ts  ← BrandSpec TypeScript types. The schema lives here.
  parser/         ← brand.md → BrandSpec. No dependencies.
  adapter/        ← LLM calls. smart/cheap tier routing.
frame/
  server/         ← Node HTTP API. No framework.
  ui/             ← React + Vite demo page.
  prompts/        ← Prompt templates assembled from BrandSpec.
stencil/          ← Brand builder. Not built yet (v0.3).
tests/
  unit/           ← Parser tests, type tests. Fast, no I/O.
  functional/     ← Prompt builder tests. Uses real brand files.
  e2e/            ← Playwright. Requires running UI.
```

## Architecture rules — do not violate these

1. **No heavyweight agent frameworks.** No LangChain, LangGraph, CrewAI, AutoGen.
   Plain code + deliberate LLM calls only.

2. **LLM tier system.** Every LLM call must be annotated with its tier:
   - `tier: smart` — complex generation, positioning work, content creation
   - `tier: cheap` — checking, scoring, simple classification
   The adapter routes tiers to models via env vars. Never hardcode a model name
   outside `core/src/adapter/index.ts`.

3. **No database.** JSON/markdown files on disk only. `brands/*.brand.md` is the data layer.

4. **AI-agnostic.** All LLM calls go through `createAdapter()` in `core/src/adapter/`.
   Never call an LLM API directly from frame/ or stencil/ code.

5. **brand.md is the contract.** `BrandSpec` in `core/src/types/brand.ts` is the
   single source of truth for what the system knows about a brand. If you need a new
   field, add it to the type AND to `SPEC.md`.

6. **No TypeScript in the UI layer.** `frame/ui/` is plain React + JSX + Tailwind.
   TypeScript is only in `core/` and `frame/server/`.

7. **Frame server has no framework.** It's a plain Node `http.createServer()`.
   Do not add Express, Fastify, Hono, or any HTTP framework.

## Environment variables

```bash
# Required for generation
ANTHROPIC_API_KEY=sk-ant-...

# Optional — override provider or models
LLM_PROVIDER=anthropic          # anthropic | openai | ollama
LLM_API_KEY=...                 # overrides ANTHROPIC_API_KEY
LLM_BASE_URL=...                # for OpenAI-compatible or Ollama
LLM_MODEL_SMART=...             # default: claude-sonnet-4-20250514
LLM_MODEL_CHEAP=...             # default: claude-haiku-4-5-20251001

# Optional
BRANDS_DIR=./brands             # path to brand.md files
PORT=3001                       # Frame server port
```

Copy `.env.example` to `.env` and fill in your key.

## What's in scope right now (v0.2)

- `core/src/parser/` — brand.md parser
- `core/src/adapter/` — LLM adapter
- `frame/server/` — carousel generation API
- `frame/ui/` — demo page: load brand → enter brief → generate carousel
- `tests/unit/` and `tests/functional/` — parser and prompt tests

## What is NOT in scope yet

- Stencil (v0.3) — do not build it
- Image generation (v0.2 UI uses placeholder images)
- Multi-brand tenancy, user accounts, login
- Database of any kind
- Deployment / Docker / CI pipeline
- Motion tokens, sonic identity, photography layer in brand.md

## Adding a new brand

1. Create `brands/<brand-id>.brand.md` following the schema in `SPEC.md`
2. The parser picks it up automatically — no registration needed
3. Add a parser test in `tests/unit/` using the new file

## Git conventions

- `main` — always working
- `dev` — active development
- Feature branches: `feature/<thing>` off `dev`
- Merge to `main` at milestone completions only
- Tag every milestone: `v0.1`, `v0.2`, etc.
- Commit messages: imperative, lowercase, specific
  - good: `add brand.md parser for positioning section`
  - bad: `Updated stuff`, `WIP`, `fix`
