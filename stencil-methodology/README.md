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
- `02-tokens.md` — 32 semantic design tokens derived from the foundations
  above (e.g. `Spacing.EvidenceGap`, `Color.Blueprint`, `Motion.Correction`).
  31 transcribed from Figma, plus `Color.Border` added 2026-08-08 (see
  Correction log in that file).
- `03-primitives.md` — 9 visual primitives (Text, Heading, Paper, Sheet,
  Rule, Margin, Strike, Annotation, Workspace) composed from the tokens.
- `04-canonical-objects.md` — 5 canonical objects composed from the
  primitives (Working Sheet, Evidence Block, Disposition Log, Question
  Block, Archive), each with grammar citations, a visual-implementation
  build spec, and explicit hypotheses where a design decision isn't yet
  confirmed by a real founder session.

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

- Sprints 1–3: transcribed from Figma screenshots into this folder. See
  "Open items" below for what couldn't be read cleanly from the source
  screenshots.
- Sprint 4 (Canonical Objects): relocated from `design/CANONICAL-OBJECTS-sprint4.md`
  into `04-canonical-objects.md`. Content unchanged except the closing
  "Next step" section, updated to reflect the decided architecture
  (Git canonical, Figma/Penpot for visual exploration only) instead of
  the original's "blocked on Figma MCP quota" framing. None of the five
  objects are built visually yet in any tool.
- **Naming gap found in final review (2026-08-08) — resolved.** `03-primitives.md`
  and `04-canonical-objects.md` referenced `Color.Border` and
  `Radius.Surface`, neither of which existed under those exact names in
  `02-tokens.md` (which had 6 Color tokens with no Border, and
  `CornerRadius.Surface` rather than `Radius.Surface`). Founder decision:
  treat the Primitive/Object specs as correct. `02-tokens.md` was
  updated to add `Color.Border` (7th color token) and rename
  `CornerRadius.Surface` → `Radius.Surface`. Full detail and rationale
  in `02-tokens.md`'s own "Correction log" section.
  **Residual inconsistency, intentionally left as-is:** `01-foundations.md`
  still calls this foundation category "Corner Radius" — it was not
  edited, since it's a separate verbatim Figma transcription and the
  founder decision was scoped to the token/primitive naming collision,
  not to renaming the Foundations page's category label. `01` and `02`
  now use different names for the same underlying concept
  ("Corner Radius" vs. "Radius"); this is cosmetic, not a value
  conflict, but worth knowing about before assuming the two files use
  identical section names.

## Open items — require live Figma access, not resolvable from Git alone

These are genuine gaps, not TBD-by-design values. Nothing below was
guessed to close it — per Stencil's own rule (undefined values are not
invented), each is left exactly as unreadable/missing until someone with
Figma access does the re-check. Treat this as the actual next-session
checklist, in priority order:

1. **`03-primitives.md` — 5 primitives have sentences cut off mid-word**
   in Purpose or Derived From: Rule, Margin, Strike, Annotation,
   Workspace. Each has an inline `[flag for verification]` marking
   exactly where the source screenshot truncated. Re-open the Figma
   Primitive Library page, read the full sentence, replace the flag.
2. **`03-primitives.md` — Auto Layout / Variants / States are blank**
   for 7 of 9 primitives (Paper, Sheet, Rule, Margin, Strike, Annotation,
   Workspace). Only Text and Heading transcribed with this metadata
   complete — the screenshot didn't show it clearly for the rest. Needs
   a direct look at each primitive's Figma properties panel, not just
   the canvas screenshot.
3. **`99 Decision Log` page — not transcribed anywhere in this folder.**
   It was never included in the screenshots this transcription was made
   from, so it doesn't exist in Git in any form yet, not even partially.
   If it contains rationale or open questions beyond what's already
   captured inline in `01-foundations.md`'s "Transcription notes" and
   this README's own flagged items, that content is currently nowhere
   but Figma. Highest-priority of the three, since it may contain
   decisions that supersede TBD values elsewhere in this folder.
4. **Once 1–3 are closed:** re-run a diff-style comparison between the
   updated `stencil-methodology/*.md` and live Figma to confirm no other
   silent truncation happened in fields that looked complete but
   weren't (the Motion token law citations in `02-tokens.md` — Pause,
   Withdraw, Easing — were also partially obscured and are a lower-
   confidence transcription than the rest of that file; worth a second
   look during the same pass rather than a separate one).

## Source of truth going forward

Per this project's architecture: Git is canonical, Figma/Penpot is for
spatial/visual exploration only. Any future change to a Decided or TBD
value in this folder should be made here first (with grammar-source
citation), then reflected visually in whatever tool you're using — not
the other way around.
