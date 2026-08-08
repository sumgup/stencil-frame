# stencil-methodology/

This folder is the persisted, versioned home for **the Stencil methodology
design system** — the design system that documents Stencil itself (the
brand-building methodology described in `book/*.md`), as opposed to any
product or landing-page UI built on top of it.

It was built through four sprints (Foundations → Tokens → Primitives →
Canonical Objects), each derived directly from `book/*.md` chapters, with
undefined values explicitly marked `TBD` rather than invented. Sprints 1–3
were originally designed in Figma; this folder is the Git-native
transcription of that work, done because ongoing Figma MCP access requires
a paid tier this project isn't paying for yet.

## Files

- `01-foundations.md` — the 9 foundation categories (Typography, Spacing,
  Grid, Stroke, Corner Radius, Elevation, Color, Motion, Material), each
  with Purpose / Grammar Source / Initial Recommendation / Status.
- `02-tokens.md` — 31 semantic design tokens derived from the foundations
  above (e.g. `Spacing.EvidenceGap`, `Color.Blueprint`, `Motion.Correction`).
- `03-primitives.md` — 9 visual primitives (Text, Heading, Paper, Sheet,
  Rule, Margin, Strike, Annotation, Workspace) composed from the tokens.
- `04-canonical-objects.md` *(pending — see status below)* — objects
  composed from the primitives (Working Sheet, Evidence Block, Disposition
  Log, Question Block, Archive).

## ⚠ Naming collision — read before touching any "Blueprint," "Coral," or "DESIGN.md" reference in this repo

This repo currently contains **three separate design systems** that share
some vocabulary with different meanings. Do not assume a token name means
the same thing across them:

| System | Where it lives | Palette | Governs |
|---|---|---|---|
| **Stencil methodology** (this folder) | `stencil-methodology/`, sourced from `book/*.md` | Near-monochrome: Graphite / Blueprint / Coral / Ghost / Paper. Zero corner radius, zero elevation (both Decided). | Documents the Stencil methodology itself — the "constitution," not a product |
| **Stencil+Frame brand/landing** | root `DESIGN.md`, `design/tokens.json` | Print/Ink model: Near-Black / Glare Yellow / Blueprint Blue / Paper. Coral = mascot + error states only. | Landing page, brand pages, editorial surfaces |
| **Frame product UI** | `design/MEMORY.md`'s embedded `DESIGN.md` section | Dark near-black, Instrument Serif + Syne. Explicitly self-flagged as placeholder, not final. | Frame's functional screens (carousel generator, etc.) |

Notably: **"Blueprint" and "Coral" exist in all three systems with
different roles.** In this folder's system, Blueprint = construction
state (unverified/in-progress), Coral = validation error only. In the
brand/landing system, Blueprint Blue is a full secondary ink used for
annotation and dark-ground CTAs, and Coral is restricted to the mascot.
Never copy a hex value or usage rule from one system into another without
checking which system you're actually in.

`penpot/foundation-library/01-foundations-spec.md` is built from the
**brand/landing** system's `tokens.json`, despite its filename looking
like it answers this folder's Sprint 1 prompt. See the header added to
that file for the explicit disambiguation.

## Status

- Sprints 1–3: transcribed from Figma screenshots into this folder.
  Several fields in `03-primitives.md` (Auto Layout / Variants / States
  for most primitives, plus a few truncated Purpose/Derived From
  sentences) could not be read cleanly from the source screenshots and
  are flagged inline for a live-Figma re-check rather than guessed.
- Sprint 4 (Canonical Objects): a spec already exists at
  `design/CANONICAL-OBJECTS-sprint4.md`, written directly against this
  folder's Sprint 1–3 output — not yet copied here or built visually
  (blocked on Figma MCP quota at time of writing). Not duplicated into
  this folder yet to avoid two sources of truth; treat
  `design/CANONICAL-OBJECTS-sprint4.md` as canonical for Sprint 4 until
  it's moved.
- `99 Decision Log` (the Figma page tracking undecided/flagged items)
  has not been transcribed — it wasn't included in the screenshots this
  transcription was made from. Needs a separate pass against live Figma.

## Source of truth going forward

Per this project's architecture: Git is canonical, Figma/Penpot is for
spatial/visual exploration only. Any future change to a Decided or TBD
value in this folder should be made here first (with grammar-source
citation), then reflected visually in whatever tool you're using — not
the other way around.
