# 01 — Foundations

> **Scope note:** This is the Stencil *methodology* design system — the one derived directly from the Stencil Book (`book/*.md`): near-monochrome palette (Graphite / Blueprint / Coral / Ghost / Paper), zero corner radius, zero elevation, Mona Sans Variable + DM Mono.
>
> This is **not** the same system as root `DESIGN.md` (Stencil+Frame brand/landing — Print/Ink model: Near-Black / Glare Yellow / Blueprint Blue / Paper) or `design/MEMORY.md`'s embedded product-UI `DESIGN.md` (Frame's functional screens — Instrument Serif / Syne, explicitly flagged placeholder). Those three systems currently share some vocabulary ("Blueprint," "Coral") with different meanings — do not cross-reference token values between them.
>
> Transcribed verbatim from Figma (Sprint 1 output, "Foundations" page, "Stencil + Frame · Design System · Sprint 1 · Frozen Book v1.0"). Source: pasted screenshot, 2026-08-08. Not independently re-verified against live Figma. Values marked TBD require implementation testing, per the original page's own subtitle. Principles derived from Stencil Book v1.0.

---

## Typography

**Purpose**
Establishes the written surface. Language must appear worked at — not styled. Each typeface choice is testimony to the process that produced it.

**Grammar Source**
Visual Grammar

**Initial Recommendation**
TBD — requires implementation testing.
Mona Sans Variable as primary face; DM Mono as secondary. Type scale steps, size ramp, and line height values to be validated in production.

**Status**
TBD

---

## Spacing

**Purpose**
The interval between elements communicates editorial standing — not decorative breathing room. White space is withheld judgment, not rest.

**Grammar Source**
Composition Grammar · Spatial Grammar

**Initial Recommendation**
TBD — requires implementation testing.

**Status**
TBD

---

## Grid

**Purpose**
The structural substrate of arrangement. Working surfaces are asymmetrical; reference surfaces may resolve. Precision belongs to the substrate — discovery belongs to the occupation of that substrate.

**Grammar Source**
Composition Grammar

**Initial Recommendation**
TBD — requires implementation testing.

**Status**
TBD

---

## Stroke

**Purpose**
Strokes are trace — the visible path of making. Every stroke must name the decision that caused it. Strokes are evidence, not decoration.

**Grammar Source**
Visual Grammar

**Initial Recommendation**
TBD — requires implementation testing.

**Status**
TBD

---

## Corner Radius

**Purpose**
Corners declare the nature of the surface. Rounded cards simulate comfort. Stencil surfaces are working sheets — they hold marks and commit to a boundary.

**Grammar Source**
Visual Grammar — rounded cards are an explicit counterexample

**Initial Recommendation**
0 — No rounding. Stencil surfaces have square edges. Softening corners is forbidden.

**Status**
Decided

---

## Elevation

**Purpose**
Governs whether a surface floats or rests. Floating surfaces (drop shadows, depth layers, blur) claim authority through appearance rather than evidence.

**Grammar Source**
Visual Grammar — drop shadows, glassmorphism, neumorphism are explicit counterexamples

**Initial Recommendation**
0 — Flat. No drop shadows, no depth layers, no glassmorphism, no blur-based elevation.

**Status**
Decided

---

## Color

**Purpose**
Color communicates intervention, not importance. Scarcity is the mechanism — meaning increases through rationing. Colour marks human judgment, not hierarchy.

**Grammar Source**
Visual Grammar

**Initial Recommendation**
Near-monochrome substrate. One deliberate accent for human judgment. Blueprint blue for construction. Coral reserved for error only. Specific hex values: TBD — requires implementation testing.

**Status**
Principle decided; values TBD

---

## Motion

**Purpose**
Makes judgment visible through time. Movement must communicate editorial intent — removing it should reduce understanding. Motion belongs to meaning before aesthetics.

**Grammar Source**
Motion Grammar

**Initial Recommendation**
Rubato rhythm: time is redistributed across observation, judgment, correction, and rest. Discrete actions — no continuous morphs. Specific durations and curves: TBD — requires implementation testing.

**Status**
TBD

---

## Material

**Purpose**
Defines which substances can carry evidence. Chosen for retention behaviour — can the material receive a mark, preserve it, and receive another mark without destroying the first?

**Grammar Source**
Material Grammar

**Initial Recommendation**
Native: paper, pencil, tracing paper, monospace type, version history, diff, plain text.
Foreign: glassmorphism, cards, sticky notes, whiteboards, correction fluid. Specific surface treatments: TBD — requires implementation testing.

**Status**
TBD

---

## Transcription notes

- Two foundation items are **Decided**: Corner Radius (0) and Elevation (0). All others are TBD in the source Figma page as of the screenshot date.
- The Typography and Material cards in the source screenshot have visually overlapping "Initial Recommendation" / "Status" text (a likely Figma layout overflow issue, not a content ambiguity) — transcribed here by best reading; worth a visual diff against live Figma to confirm no text was clipped off-frame.
- The source page's `99 Decision Log` was not included in the screenshots provided and is not transcribed here. If that page contains additional rationale beyond what's in the Decision Log entries captured in `penpot/foundation-library/01-foundations-spec.md` (which is a *different* system's decision log — see scope note above), it still needs manual transcription from Figma.
