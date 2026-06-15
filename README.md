# Stencil + Frame

An open-source, AI-agnostic brand engine and content engine.

**Stencil** walks you through Michael Johnson's *Five and a Half Steps* and produces a `brand.md` file — a portable, single-file brand spec.

**Frame** reads that `brand.md` and produces content: Instagram carousels first, more formats later.

**`brand.md`** is the contract between them. One file captures everything the system needs to know about a brand: positioning, voice, visual tokens, content framework. Swap the file, get a different brand's content.

---

## Status

| Version | Status | What it is |
|---|---|---|
| v0.1 | ✅ Done | `brand.md` spec + ColorFlix worked example |
| v0.2 | 🔨 Building | Frame rebuild: brand.md → carousel output |
| v0.3 | Planned | Stencil: agent-assisted brand-building session |
| v0.4 | Planned | Two real brands built through Stencil |
| v0.5 | Planned | Open-source launch |

---

## Quick start (v0.2+)

```bash
git clone https://github.com/YOUR_USERNAME/stencil-frame
cd stencil-frame
npm install

cp .env.example .env
# add your ANTHROPIC_API_KEY (or configure another provider)

npm run dev
# Frame UI opens at http://localhost:5173
```

Bring your own API key. Works with Anthropic, OpenAI, or local Ollama.

### Setup

1. Copy `.env.example` to `.env`.
2. Add your `ANTHROPIC_API_KEY` (default provider — see `.env.example` for
   how to point the adapter at OpenAI or Ollama instead via `LLM_PROVIDER`
   / `LLM_API_KEY` / `LLM_BASE_URL`).
3. The server (`frame/server`) reads this through `createAdapter()` — every
   LLM call is routed through the AI-agnostic adapter described in
   `CLAUDE.md`, never called directly.

A configured key is **required** for Investigate's Act 0 (weak-answer
push-back) and Act 1 (facts/obstacles/opportunities reflection) — these are
"co-thinking" steps that genuinely need an LLM. Act 2a's research export is
plain prompt-export and works without a key.

---

## The brand.md format

A `brand.md` file is markdown with YAML frontmatter. Seven layers:

| Layer | Required | What it captures |
|---|---|---|
| Identity | yes | id, name, version, visual tokens (DTCG) |
| Research | yes | market context, audience, competitors |
| Positioning | yes | Johnson's six questions + three sharpeners |
| Voice | recommended | do's, don'ts, reference moves, anti-examples |
| Framework | recommended | content structure (e.g. The ColorFlix Five) |
| Visual | recommended | DTCG-compliant design tokens |
| Bridging | optional | the Half Step — how strategy and visual refined each other |

See `brands/colorflix.brand.md` for a complete worked example.
See `SPEC.md` for the full schema.

---

## The intellectual foundation

The brand-building methodology comes from Michael Johnson's *Branding in Five and a Half Steps* (Thames & Hudson, 2016). The positioning layer uses Johnson's six-question model directly. The visual layer uses the [W3C Design Tokens Community Group format (v2025.10)](https://www.designtokens.org/tr/drafts/format/).

---

## Architecture

- **No heavyweight agent framework.** Plain code + deliberate LLM calls.
- **AI-agnostic.** Every LLM call goes through a thin adapter. Works with Anthropic, OpenAI, Ollama.
- **Tier-per-task model selection.** Every call is `smart` or `cheap`. Map tiers to models via env vars.
- **No database.** `brands/*.brand.md` files are the data layer.
- **Local-first.** `npm install && npm run dev` is the entire setup.

See `ARCHITECTURE.md` for locked decisions and rationale.

---

## Contributing

This is a build-in-public project. The repo is public from day one.

If you want to add a brand, create `brands/<your-brand-id>.brand.md` following the schema in `SPEC.md`.

If you want to add a feature, read `CLAUDE.md` first — it explains the architecture rules and what's in/out of scope for each version.

---

## License

MIT. See `LICENSE`.

---

*Built by Sumit. Documented in a YouTube vlog series.*
