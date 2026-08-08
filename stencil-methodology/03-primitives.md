# 03 — Primitive Library

> **Scope note:** Stencil *methodology* system (see `01-foundations.md` for full disambiguation).
>
> Transcribed verbatim from Figma (Sprint 3 output, "Primitive Library" page, "Stencil + Frame · Design System · Sprint 3 · Derived from Stencil Book v1.0"). Source: pasted screenshot, 2026-08-08. Not independently re-verified against live Figma. 9 visual primitives. No application UI — only the substances from which Stencil-native objects are composed.

---

## Text

**Purpose**
Body-level readable text. The information substrate. Language as worked surface.

**Derived From**
Visual Grammar · Composition Grammar

**Tokens Used**
`typography/Body` · `color/Graphite` · `color/Ghost`

**Auto Layout**
VERTICAL · HUG both axes · no padding

**Variants**
Style: Body, Subdued, Ghost

**States**
Default

**Showcase (as shown in Figma)**
Three text weight examples reading "Every mark has one author." at decreasing visual weight (Body / Subdued / Ghost, left to right).

---

## Heading

**Purpose**
Display-level type. Worked-at surface. The most assertive typographic expression — arrived at, not produced.

**Derived From**
Visual Grammar

**Tokens Used**
`typography/Heading` · `color/Graphite`

**Auto Layout**
VERTICAL · HUG both axes · no padding

**Variants**
Size: H1, H2, H3

**States**
Default

**Showcase (as shown in Figma)**
The word "Evidence" set at three decreasing sizes (H1 large bold, H2 medium bold, H3 small caps-style), left to right.

---

## Paper

**Purpose**
The native carrier surface. Receives marks.

**Derived From**
Material Grammar — Carrier Materials

**Tokens Used**
`Color.Paper` · `Color.Border`

**Auto Layout**
*(not specified in source — flag for verification)*

**Variants**
*(not specified in source — flag for verification)*

**States**
*(not specified in source — flag for verification)*

**Showcase (as shown in Figma)**
A dashed-border container holding a filled rectangle (the Paper surface itself, shown against its containing frame).

---

## Sheet

**Purpose**
A bounded document surface. Finitude.

**Derived From**
Material Grammar — Paper section · Spatial Grammar

**Tokens Used**
`Color.Paper` · `Color.Border` · `Color.Graphite`

**Auto Layout**
*(not specified in source — flag for verification)*

**Variants**
Two states shown: bordered/white and filled/gray

**States**
*(not specified in source — flag for verification)*

**Showcase (as shown in Figma)**
Two Sheet instances side by side — one with a solid dark border on white, one filled light gray with a thin border.

---

## Rule

**Purpose**
A horizontal trace line. Separates without [text continues, cut off in source — flag for verification: likely "separates without enclosing" or similar, per Composition Grammar's margin/boundary logic].

**Derived From**
Visual Grammar — Trace property · Material Grammar

**Tokens Used**
`Color.Ghost` · `Color.Pencil` · `Color.Graphite`

**Auto Layout**
*(not specified in source — flag for verification)*

**Variants**
Three weights shown: thin/light, medium, bold — corresponding likely to `Stroke.Hair` / `Stroke.Trace` / `Stroke.Mark`

**States**
*(not specified in source — flag for verification)*

**Showcase (as shown in Figma)**
Three horizontal rule lines stacked, increasing in weight top to bottom.

---

## Margin

**Purpose**
The editorial column. Where Stencil may [text continues, cut off in source — almost certainly "speak" per the Composition Grammar quote used elsewhere in this same sprint's output: "the margin is where Stencil may speak; the centre belongs to the founder" — flag for verification against Figma rather than asserting silently].

**Derived From**
Composition Grammar — Margins law

**Tokens Used**
`Color.Border` · `Color.Blueprint`

**Auto Layout**
*(not specified in source — flag for verification)*

**Variants**
*(not specified in source — flag for verification)*

**States**
*(not specified in source — flag for verification)*

**Showcase (as shown in Figma)**
Two narrow vertical columns, each with a blue left-border rule and the label "Stencil may..." (text truncated in source), demonstrating the margin's jurisdiction marker.

---

## Strike

**Purpose**
Committed evidence of rejection. The [text continues, cut off in source — flag for verification].

**Derived From**
Visual Grammar — Evidence vocabulary

**Tokens Used**
`Color.Pencil` · `Color.Coral`

**Auto Layout**
*(not specified in source — flag for verification)*

**Variants**
Two color states shown: gray/pencil strike and coral/error strike

**States**
*(not specified in source — flag for verification)*

**Showcase (as shown in Figma)**
The phrase "A considered path" shown struck through twice — once in gray (Pencil), once in coral (Coral/error) — demonstrating the two rejection registers.

---

## Annotation

**Purpose**
A marginal voice — Stencil speaking without [text continues, cut off in source — likely "overwriting the founder," consistent with the Composition Grammar margins quote used in Sprint 4's Question Block spec elsewhere in this repo — flag for verification].

**Derived From**
Interaction Grammar — Annotation as [text cut off in source — flag for verification]

**Tokens Used**
`Color.Blueprint` · `Color.Pencil` · `Color.Border`

**Auto Layout**
*(not specified in source — flag for verification)*

**Variants**
NOTE, QUESTION (two labeled types shown)

**States**
*(not specified in source — flag for verification)*

**Showcase (as shown in Figma)**
Two annotation callouts with left-border marker: one labeled "NOTE" and one labeled "QUESTION," both reading "Worth examining further." beneath the label.

---

## Workspace

**Purpose**
The bounded desk surface. One thing is [text continues, cut off in source — likely "active" or "edited at a time," consistent with the Working Sheet object's description elsewhere in this repo ("the live, bounded desk surface where one thing is actively edited") — flag for verification].

**Derived From**
Spatial Grammar — Desk stage · Spatial Grammar

**Tokens Used**
`Color.Paper` · `Color.Border`

**Auto Layout**
*(not specified in source — flag for verification)*

**Variants**
Two states shown: empty/gray-filled workspace and occupied (containing a bordered Sheet)

**States**
Empty, Occupied (inferred from the two showcased variants — not explicitly labeled as "States" in source)

**Showcase (as shown in Figma)**
Two workspace frames side by side — one an empty light-gray field, one containing a single white bordered Sheet instance inside the gray field.

---

## Transcription notes

- 9 primitives total, matching the source page's own count.
- **Several "Purpose" and "Derived From" fields were cut off mid-sentence in the source screenshot** (Rule, Margin, Strike, Annotation, Workspace) — these are flagged inline above rather than completed by inference. Where a plausible completion exists elsewhere in this repo (e.g., other Sprint 4 documents quoting the same book passages), I've noted it as a hypothesis, not asserted it as the transcribed text. These five entries need a direct re-check against live Figma to get the actual, uncut sentence.
- **Auto Layout, Variants, and States fields are largely blank** for Paper, Sheet, Rule, Margin, Strike, Annotation, and Workspace — the source screenshot's card layout appears to place this metadata below the fold or in a section not fully visible/legible in the image provided. Only Text and Heading have complete Auto Layout/Variants/States data as transcribed. This is the single largest gap in this file and the main reason a live Figma re-check matters most for this sprint specifically.
- Showcase descriptions are my visual reading of the adjacent example composition for each primitive, included for reference since the visual arrangement itself is part of what Sprint 3 specified — but these are descriptions of the image, not transcribed text, and should be read as such.
