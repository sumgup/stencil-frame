# /design/SYSTEM.md
*Every agent reads this before acting. These decisions are locked for v0.x.*

---

## Architecture rules (from ARCHITECTURE.md — do not re-litigate)

- No heavyweight agent frameworks. Plain code + deliberate LLM calls.
- No database. `brands/*.brand.md` files are the data layer.
- No Express/Fastify/Hono. Plain Node `http.createServer()`.
- No TypeScript in `frame/ui/`. TypeScript only in `core/` and `frame/server/`.
- All LLM calls go through `createAdapter()` in `core/src/adapter/`. Never call an API directly from UI code.
- Every LLM call is annotated `tier: smart` or `tier: cheap`.
- `BrandSpec` in `core/src/types/brand.ts` is the single source of truth for brand data shape.

## Design rules (locked)

- Dark background UI. Near-black (`#0c0c0f` or equivalent). Not optional.
- Three fonts only: Instrument Serif (editorial), DM Mono (data/mono), Syne (sans/UI).
- No color outside the DTCG tokens in brand.md and DESIGN.md.
- Wireframe approval is required before Styling Agent runs. No exceptions.
- `data-component` attributes are the source of truth for test selectors. Never remove them.
- Motion: `transform` and `opacity` only. No layout property animations.
- All animations wrapped in `@media (prefers-reduced-motion: no-preference)`.

## Agent pipeline order

Research → UX Flow → Visual Direction → Wireframe → [APPROVAL GATE] → Styling → Motion → Testing → Code

No agent may skip an earlier agent's output. Each agent's input is the previous agent's output.

---

# /design/FEATURES.md
*Updated after every feature ships. Every agent reads this to check for reuse before proposing new components.*

---

## Shipped features

### v0.1 — Spec and worked example
- No UI shipped. Spec only.

### v0.2 — Frame rebuild (in progress)

**Route:** `GET /brands` — list all brand.md files  
**Route:** `GET /brands/:id` — parse and return BrandSpec  
**Route:** `POST /generate/carousel` — brand + brief → carousel slides  

**Components (frame/ui/src/components/):**
*(none yet — being built)*

**Core modules:**
- `core/src/parser/index.ts` — brand.md → BrandSpec. Parses all 9 positioning fields.
- `core/src/adapter/index.ts` — LLM adapter, smart/cheap tier routing.

---

## Component map
*(Updated as each feature ships. Format: ComponentName | file | states supported | data-component value)*

| Component | File | States | data-component |
|---|---|---|---|
| *(none yet)* | | | |

---

## Patterns established
*(Interaction patterns that are now "the way we do it" — new features should follow these)*

- *(none yet — first UI feature being designed)*

---

# /design/DESIGN.md
*The visual system. Styling Agent and Motion Agent read this as source of truth.*

> **System boundary (2026-07-06):** This is Frame's product-UI system — deliberately
> separate from the brand system in root `DESIGN.md`. Governs Frame's functional screens
> (carousel generator, etc.) **only**. NOT the Stencil session, which uses the brand
> stack (Fraunces + Mona Sans Variable + DM Mono) per `EMOTIONAL_DESIGN_LANGUAGE.md`.
>
> ⚠ Current values below (Instrument Serif, Syne, multi-accent palette) are an early
> placeholder, not a deliberate design decision. Do not treat them as final — Frame's
> product UI needs its own design pass before real screens are built. Logged in root
> `DESIGN.md §0` as an open decision.

---

## Color tokens (from brand.md visual layer)

*(To be populated when Stencil + Frame's own brand.md is run through Stencil.)*
*(For now, using design-process.html as reference.)*

```
--bg:          #0c0c0f   (near-black background)
--surface:     #13131a   (card/panel surfaces)
--surface2:    #1c1c26   (elevated surfaces)
--border:      rgba(255,255,255,0.07)
--border-hi:   rgba(255,255,255,0.15)
--text:        #e8e8f0   (primary text)
--muted:       #7a7a94   (secondary text)
--accent:      #c8a97e   (warm amber — primary accent)
--accent2:     #7e9bc8   (cool blue — secondary accent)
--accent3:     #9bc87e   (sage green — tertiary accent)
```

## Typography

| Role | Font | Weight | Size | Usage |
|---|---|---|---|---|
| Display / hero | Instrument Serif | 400 (italic) | clamp(2.4rem, 5vw, 3.8rem) | Feature titles, hero moments |
| Heading | Instrument Serif | 400 | 1.3–1.6rem | Section headings |
| UI sans | Syne | 400/600/700 | 0.8–1rem | Navigation, labels, body |
| Mono / data | DM Mono | 400/500 | 0.72–0.85rem | Code, data, system labels |
| Eyebrow | DM Mono | 400 | 9–11px, tracked | Section labels, metadata |

## Spacing scale

4px base unit. Use multiples: 4, 8, 12, 16, 24, 32, 48, 64, 96.

## Motion principles

*(From Motion Agent timing reference — see 06-motion-agent.md)*

Governing principle: **suspension to resolution**. Elements that are in-progress feel unresolved. Completion feels like release. Silence (stillness) is a design tool, not an omission.

| Moment | Duration | Easing |
|---|---|---|
| State entry | 240–320ms | ease-out cubic |
| State exit | 140–180ms | ease-in cubic |
| Micro-interaction | 80–120ms | ease-out |
| Loading hold | 1400–2000ms loop | ease-in-out sine |
| Success resolution | 280–360ms + 80ms pause | ease-out cubic |
| Step transition | 200ms | ease-in-out |

## What to avoid

- Purple gradients on white backgrounds (generic AI aesthetic)
- Inter or Roboto (generic)
- Shadows as depth cues — use layering and opacity instead
- Spinning loaders — use held tension
- Color outside the token set

## Information Architecture
Product-level IA lives in `design/ia/`. Read `SITEMAP.md` and `TAXONOMY.md`
before proposing any new screens or navigation changes. IA docs are
scaffolded — content pending after founder concierge sessions.
