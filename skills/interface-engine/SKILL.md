---
name: Interface Engine — Perspective
description: >
  Maps UX flow specs to exact UI controls, macro patterns, motion, and
  overview ("bigger picture") design — with every decision traced back to
  a flow requirement and a theme token. Use when designing or reviewing
  any Stencil + Frame screen, flow, or interface component.
---

# Interface Engine — Perspective

Named for the Renaissance technique of representing spatial depth on a
flat plane: this engine takes flat flow specs and produces spatial
hierarchy, exact controls, and the zoom-out view of the whole.

**Prime directive:** interface decisions are derived, not invented.
Every control, pattern, and motion choice must trace to (a) a flow
requirement and (b) a theme token or brand principle. If a choice can't
be traced, it doesn't ship. (Same auditability rule as the Copy Engine.)

## Required inputs — refuse to generate without both

1. **Flow spec** — must contain: job-to-be-done (one sentence),
   emotional arc (arrive feeling X → leave feeling Y), screens with the
   data collected / actions taken on each, and the exit (primary next
   action). If any element is missing, ask for it — do not infer.
2. **Theme tokens** — the active visual system from `brand.md` /
   DTCG tokens: colors (#080f0a bg, #c8a96e gold, #f0ede6 warm white,
   #e8673a coral — logo mark only), typefaces (Mona Sans Variable for
   display + body roles, DM Mono for code/UI chrome), and any component
   tokens defined. Full token spec: `design/tokens.json`.
   For Stencil session screens: also load `EMOTIONAL_DESIGN_LANGUAGE.md`
   for the session's emotional arc, act-by-act vocabulary, and typography
   layer grammar (session-hero / session-question / body token presets).

## The six steps — run in order, show your work

### 1. Load and restate
Restate the JTBD and emotional arc in one line each. This restatement
heads the output; everything below must serve it.

### 2. Classify each screen's job
Every screen is exactly one of: **input · review · decide · monitor ·
celebrate · recover**. State the classification and one sentence of
justification. The class constrains everything downstream (e.g. an
input screen never carries competing CTAs; a celebrate screen never
introduces new data).

### 3. Map controls mechanically
For each datum collected or action taken, output a table row:
`need → control → rationale → reference`. Rationale must cite a
checkable rule from `references/ui-controls.md` (e.g. "≤5 mutually
exclusive, all visible before choosing → radio cards, never dropdown").
No vibes. If two controls genuinely tie, present both with tradeoffs
and let the human pick.

### 4. Select macro patterns
Choose flow-level patterns (wizard vs. hub, progressive disclosure,
inline vs. summary validation, optimistic UI…) from
`references/ui-patterns.md`. Each selection cites *when it earns its
place* and which Devouring Details / HIG principle backs it.
One primary action per screen — HIG deference rule is non-negotiable.

### 5. Design the overview layer
Answer explicitly: **as inputs accumulate, how does the whole reveal
itself?** Select a mechanism from `references/ui-overview.md`
(live artifact preview, minimap, constellation, radial timeline,
contextual chrome). Default for Stencil: the brand.md assembling live
as a visible artifact — document-as-progress, not progress bar.
Shneiderman governs: overview first, zoom and filter, details on demand.

### 6. Gate spatial/motion, then audit
- **3D gate:** 3D must communicate something flat design cannot
  (feeling, not navigation). Immersion is a moment, not a mode; always
  windowed task UI with an easy exit. Depth = hierarchy (recede
  deprioritized, advance interactive); never add depth to text.
- **Motion gate:** motion must carry meaning (state change, causality,
  spatial continuity) per `references/ui-motion.md`. Decorative motion
  fails the gate.
- **Theme audit (visible, below the design output):** for every
  control/pattern/motion choice, one line:
  `choice → flow requirement → theme token/principle → PASS/FLAG`.
  FLAGs are surfaced, never silently resolved.

## Output format
1. Restated JTBD + emotional arc
2. Screen classification table
3. Control map (step 3 table)
4. Pattern selections with citations
5. Overview-layer design
6. Gates + audit trail

## Known gaps (v0)

The following reference files are **non-operational stubs** — placeholder text only;
must not be cited as authoritative until written:

- `references/ui-controls.md` — control-to-need mapping rules
- `references/ui-patterns.md` — macro patterns (wizard, hub, progressive disclosure)
- `references/ui-motion.md` — motion gate rules
- `references/ui-overview.md` — overview mechanisms (minimap, constellation, etc.)
- `references/ui-spatial.md` — 3D gate + depth-as-hierarchy principles

Until these exist: cite principles from §The six steps directly in the audit trail.
No accessibility pass yet — planned as step 6.5 (contrast after any translucency,
reduced-motion fallbacks, target sizes).
