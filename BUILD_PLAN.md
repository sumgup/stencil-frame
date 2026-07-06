# Stencil + Frame — Investigate Step
## Build Plan (Step 5)
*Created: June 2026*

This document is the brief for Claude Code. Everything here is finalized from
Steps 0–4. Read this first, then read the four companion documents:

- `investigate-conceptual-design.md` — session flow, all five acts
- `investigate-schema.md` — brand.md schema, full YAML structure
- `investigate-agent-design.md` — agent behaviour, questions, edge cases
- `INVESTIGATE_DESIGN_PHILOSOPHY.md` — blob/icosahedron morph system
- `EMOTIONAL_DESIGN_LANGUAGE.md` — typography, colour, motion, sound principles

---

## Architecture (already locked in project spec)

- Node 20 LTS
- TypeScript — core + server
- React + Vite — Frame UI
- Tailwind CSS
- Vitest — unit/component tests
- Playwright — end-to-end tests
- Plain `http.createServer()` — no Express, no framework
- No database — markdown files on disk (`brand.md`)
- All LLM calls through single adapter — but Investigate v1 uses **Option B
  (prompt export)**, no embedded AI

---

## Session Structure — Five Acts

1. **Act 0 — Who Are You** (identity: values, purpose, one-liner)
2. **Act 1 — Warm Up** (facts, obstacles, opportunities)
3. **Act 2a — Research** (prompt export → paste results → competitor cards)
4. **Act 2b — The Gap Map** (axis selection → plot → name the gap)
5. **Act 3 — Confirm** (synthesis → write to brand.md)

Full agent behaviour, questions, push-backs, and edge cases for each act are
specified in `investigate-agent-design.md`. Implement exactly as written.

---

## Design Tokens — Source of Truth

### Colour
```css
--bg:         #080f0a;   /* British Racing Green dark */
--accent:     #c8a96e;   /* gold */
--accent-dim: #5a4520;
--text:       #f0ede6;   /* warm white, never pure white */
/* secondary text: opacity 0.7 on --text — see design/tokens.json body.$description. --text-sub removed; #6a7a6a superseded. */
--text-dim:   #1a2a1a;
--text-ghost: #0e1a0f;
```

### Typography
Source of truth: `design/tokens.json`. Session UI uses a calmer, conversational register
than the landing page — axis presets differ accordingly.

- **session-hero** — Fraunces, opsz 72, wght 700, uppercase, letterSpacing 0.05em.
  Vertical hero (full session name). Fraunces at large (not max) optical size — authority
  restrained relative to landing page display (opsz 144, wght 900) to suit the session's
  introspective register. Token: `typography.session-hero`.
- **session-question** — Mona Sans Variable, wght 350, wdth 100, italic available.
  Questions, masked slide-up reveal. Lighter than body (400/100) — reads as genuinely
  questioning rather than declarative. Italic for invitation lines; upright for statements.
- **body / input** — existing `typography.body` token (wght 400, wdth 100). Unchanged.
- **DM Mono** — labels, whispers, structural text (high letter-spacing, 0.2–0.35em). Unchanged.

Fonts: Fraunces via Google Fonts (OFL); Mona Sans Variable via `@fontsource-variable/mona-sans` (jsDelivr, OFL); DM Mono via Google Fonts. All free. See `DESIGN.md §4`.

### Motion — Emotional Words (internal only, never shown in UI)
| Act | Word | Blob speed | Geometry target |
|---|---|---|---|
| 0 | Origin | fast, restless | 0% (pure blob) |
| 1 | Noise | medium | 20% |
| 2b | Gap | medium-fast | 50% |
| 3 | Born | very slow → snap on confirm | 85% → 100% on confirm |

### The Blob → Icosahedron Morph System
- N=12 control points, Catmull-Rom spline
- `geometryT` (0→1) lerps each point toward corresponding icosahedron vertex
- Smoothing reduces as geometryT increases (curves → edges)
- Wireframe edges fade in from geometryT > 0.3
- Vertices appear from geometryT > 0.6
- **Edge glow birth animation** on Act 3 confirm: rise (60 frames) → peak pulse
  (40 frames) → settle (80 frames), then birth message fades in/out
- Reference implementation: `blob-morph-demo.html` in prototypes folder

### Typographic Arrival Sequence (every act)
1. Vertical hero text reveals bottom→top (clip-path), arrives bold gold
2. Holds at peak ~1.5s
3. Recedes to atmospheric (~5% opacity) over ~2s
4. While receding: question masks slide up line by line (Mona Sans Variable session-question token)
5. Whisper text fades in last (DM Mono, tiny)

### Sonic Identity
- Core 4-note motif in D major (D4→F#4→A4→E4), intentional harmonic suspension
- Never fully resolves until Act 3
- Reference: `SONIC_IDENTITY_SYSTEM.md` in project root
- v1 build: simple Web Audio triangle-wave tones per act as placeholders;
  full Ableton-produced assets integrated later

---

## brand.md Schema — Investigate Section

Full schema in `investigate-schema.md`. Summary of structure:

```yaml
investigate:
  identity:
    values: [string]       # list
    purpose: string        # single
    one_liner: string
  research_raw:
    facts: [string]
    obstacles: [string]
    opportunities: [string]
  market:
    competitors:
      - name, descriptor, colour, position: {x, y}
    gap_maps:               # list, one primary: true
      - id, axes: {x:{left,right}, y:{bottom,top}}, gap, primary
  synthesis:
    gap_identity_connection: string
```

Rules:
- Only one `gap_maps` entry has `primary: true` at any time
- `position.x/y` are plain labels, UI converts to coordinates
- Investigate section is additive — never overwritten by later steps

---

## UX Reference Prototypes

Located in `design/prototypes/`:
- `act0-typographic.html` — **final direction**, split stack: Fraunces (session-hero token,
  opsz 72/wght 700) + Mona Sans Variable (session-question token) per `design/tokens.json`,
  three-phase animation, blob, examples panel
- `act1.html` — question + reflection cards (facts/obstacles/opportunities)
- `act2a.html` — research prompt generation, copy/paste flow
- `act2b.html` — axis selection, animated competitor plotting, gap reveal
- `act3.html` — synthesis statement, brand.md writing animation
- `blob-morph-demo.html` — full morph system with edge glow

Earlier variants (`act0-final.html`, `act0-variations.html`,
`act0-authority.html`) kept for design evolution history — not implementation
references.

---

## Day 1 Plan — Foundation + Act 0

1. **Scaffold** — Vite + React + TypeScript + Tailwind for Frame UI
   (or extend existing scaffold if present)
2. **Design tokens** — Tailwind config + CSS variables matching the source
   of truth above
3. **Shared components:**
   - `<BlobMorph>` — canvas component, accepts `geometryT`, `baseR`, `speed`
     props, reusable across all acts
   - `<VerticalHero>` — Fraunces session-hero token (opsz 72, wght 700), vertical text with three-phase animation
   - `<MaskedReveal>` — Mona Sans Variable session-question token, line-by-line slide-up
   - `<ProgressIndicator>` — Who/Warm/Research/Map/Confirm
   - `<ExamplePanel>` — "show me an example" trigger + slide-in panel
4. **Build Act 0** — full component matching `act0-typographic.html`,
   wired to real state (can be mocked data for now)
5. **Vitest unit tests for Act 0:**
   - Input validation (empty/too short triggers push-back per agent design)
   - State transition logic (Act 0 → Act 1)
   - Weak-answer detection per `investigate-agent-design.md`

---

## Day 2 Plan — Acts 1–3 + Integration

6. **Build Act 1** — reflection cards (facts/obstacles/opportunities),
   colour-coded per `investigate-conceptual-design.md`
7. **Build Act 2a** — prompt generation via string substitution
   (pure function, highly testable), copy/paste UI
8. **Build Act 2b** — axis proposal (2-3 variations), competitor plotting,
   gap zone reveal, `<BlobMorph>` geometry transitions
9. **Build Act 3** — synthesis statement, brand.md writing animation,
   edge glow birth trigger
10. **Integration** — wire all five acts into one session with shared state
    passed between them (React context or similar — keep simple, no
    over-engineering)
11. **Playwright end-to-end test** — full session run using Stencil + Frame's
    own data as the test case, validates final `brand.md` output matches
    schema
12. **Write to actual `brand.md`** — implement the file write using schema
    from Step 2, additive to existing file

---

## Testing Strategy

| Level | Tool | Covers |
|---|---|---|
| Unit | Vitest | Prompt generation, schema validation, weak-answer detection, axis proposal logic, brand.md read/write |
| Component | Vitest + Testing Library | MaskedReveal triggers, BlobMorph responds to geometryT changes, ProgressIndicator state |
| End-to-end | Playwright | Full session — Stencil + Frame test case, Act 0 through Act 3, validates brand.md output |

---

## Out of Scope for This Build (Parked)

- Pre-branded examples / cold start onboarding (Step 4 parked item)
- Node-based workflow
- Logo APIs — dominant colour only
- Bring-your-own-key (Option C)
- Decode feature (v2)
- p5.js generative backgrounds (Track 1/2 from Emotional Design Language —
  add after core flow works)
- Full Ableton sonic assets — placeholder tones only for v1

