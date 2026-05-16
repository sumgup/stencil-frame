# Roadmap

## Current status: v0.2 in progress

---

## v0.1 — spec and worked example ✓ DONE

**Goal:** SPEC.md finalized. Hand-written ColorFlix brand.md as a worked example.

**What was built:**
- `SPEC.md` — full structural spec for the brand.md format (seven layers, DTCG visual tokens)
- `brands/colorflix.brand.md` — complete worked example, all seven layers
  - Identity + DTCG visual tokens
  - Research (market context, audience, competitor table: ColorFlix vs Insight, MARS, Swiss Beauty)
  - Positioning (all nine fields — Johnson's six + three Frame sharpeners)
  - Voice (philosophy, do's, don'ts, reference moves, anti-examples)
  - Framework (The ColorFlix Five — Provoke, Flex, Tease, Justify, Convert)
  - Bridging (the Half Step — how visual exploration sharpened the Rejects field)

**Vlog opportunity:** "I read Michael Johnson and now I'm building this."
**Short opportunity:** Show the empty schema → filled brand.md in 60 seconds.

---

## v0.2 — Frame rebuild ← IN PROGRESS

**Goal:** Frame rebuilt to consume brand.md. ColorFlix end-to-end carousel output.

**Built so far:**
- `brands/colorflix.brand.md` — complete brand file, all seven layers ✓
- `core/src/parser/` — brand.md → BrandSpec (TypeScript), 13 tests passing ✓
- `core/src/adapter/` — AI-agnostic LLM adapter, smart/cheap tier routing ✓
- `frame/server/index.ts` — Node API: `/health`, `/brands`, `/brands/:id`, `/generate/carousel` ✓
- `index.html` — Frame UI shell: brand selector, brief input, carousel output, slide cards ✓
- ESM confirmed working (TypeScript throughout, `"type": "module"`) ✓
- Dev server running: `npm run dev` starts server + UI, auto-kills port conflicts ✓

**Still needed to complete v0.2:**
- Real LLM generation — add `ANTHROPIC_API_KEY` to `.env` and test end-to-end
- Image generation — slide cards show placeholders, need image gen integration
- React UI in `frame/ui/` — current UI is standalone `index.html`, Vite/React shell not yet built

**Definition of done:**
Load `colorflix.brand.md` → enter a brief → get five carousel slides (copy + image prompts)
driven entirely by the brand file. Swap the brand file, get different content.

**Vlog opportunity:** "I rebuilt the content engine to read a spec file. Here's what changed."
**Short opportunity:** brand.md → carousel in 60 seconds, live.

---

## v0.3 — Stencil v1

**Goal:** Agent-assisted Johnson walkthrough → produces brand.md live in a session.

**What to build:**
- Interviewer agent (tier: smart) — walks through Johnson's six questions + three sharpeners
- Critic agent (tier: cheap) — checks consistency as each section is drafted
- CLI session flow: question → human answers → agent proposes → human accepts/edits → next
- Output: a complete brand.md file

**Not in scope for v0.3:** Bridger agent, visual layer generation, GUI.

**Vlog opportunity:** Build days — building the agent session flow.
**Short opportunity:** "Watch an AI build a brand" — live Stencil session on camera.

---

## v0.4 — two real brands

**Goal:** Sumit-as-artist and Sumit-as-ADHD both built through Stencil. Two real brand.md files.

**What to build:**
- `brands/sumit-artist.brand.md` — cinema art brand, built through a live Stencil session
- `brands/sumit-adhd.brand.md` — ADHD content creator brand, same
- Both run through Frame to produce sample carousel output

**Vlog opportunity:** The actual brand-building sessions, on camera.
**Short opportunity:** Before/after — what the brand looked like before Stencil vs after.

---

## v0.5 — open-source launch 🚀

**Goal:** Public repo, docs, BYO-key story, two case studies. Channel launch.

**What to build:**
- Public GitHub repo
- README with clear setup, BYO-key instructions, two worked examples (ColorFlix + one Sumit brand)
- Contribution guide
- The Stencil + Frame brand itself built through Stencil (the meta-loop)

**Vlog opportunity:** Launch video — "What is Stencil + Frame?" Channel intro.

---

## v1.0 — research / listening agent

**Goal:** Brand stays sharp by watching the category.

**Design deferred until after v0.4** — need real experience with what goes stale and why
before designing the listening mechanism.

Rough shape: agent periodically re-runs Johnson Step 1 (market scan) and proposes diffs
to brand.md. Human reviews and accepts/rejects.

**Vlog opportunity:** "I taught the AI to watch my competition."

---

## v1.1+ — output adapters

Reels, landing pages, decks, animated stories. Each gets its own sub-repo and reads the
same brand.md. Sub-product launch shorts per adapter.

---

## Content strategy (parallel workstream)

Each milestone produces:
1. A **demo page** showing the thing working (build this first)
2. A **short** (30–60s): the thing working on camera
3. A **vlog**: how it got built, told backward from the working demo

The short is the hook. The vlog is the depth. People who find the short watch the vlog.
