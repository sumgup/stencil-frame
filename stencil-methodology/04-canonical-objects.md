# 04 — Canonical Objects

> **Scope note:** Stencil *methodology* system (see `01-foundations.md` for full disambiguation). These five objects are composed from the primitives in `03-primitives.md` and the tokens in `02-tokens.md`.
>
> Relocated from `design/CANONICAL-OBJECTS-sprint4.md` (2026-08-08) to complete the 01–04 set in this folder. Content unchanged from the original — this sprint's output was already text, not a Figma transcription, so no re-transcription was needed. Only the "Next step" section at the bottom was updated to reflect the decided architecture (Git canonical, Figma/Penpot for visual exploration only) rather than the original's "blocked on Figma MCP quota" framing.

**Status:** Spec complete. Not yet built visually in any tool. This document is the ready-to-execute build spec — once you're ready to compose these visually (Figma, Penpot, or otherwise), follow "Visual implementation" per object, using the same documentation-card + showcase pattern established by `03-primitives.md`.

**Source material read for this sprint:**
- `stencil-methodology/01-foundations.md`, `02-tokens.md` (31 tokens / 9 foundations), `03-primitives.md` (9 primitives: Text, Heading, Paper, Sheet, Rule, Margin, Strike, Annotation, Workspace)
- `book/02-diagnostic-patterns.md`, `book/03-interaction-grammar.md`, `book/04-visual-grammar.md`, `book/05-material-grammar.md`, `book/06-spatial-grammar.md`, `book/07-composition-grammar.md`, `book/08-gesture-grammar.md`, `book/09-motion-grammar.md` (Law 4–5)

The Stencil Book is frozen and was not modified. These five objects are readings of it, not additions to it.

---

## 1. Working Sheet

**Purpose**
The live, bounded desk surface where one thing is actively edited. The founder's mutable centre before commitment — the physical form of Spatial Grammar's "Desk" stage.

**Composed from primitives**
- `Sheet` — bounded document surface, finitude
- `Margin` — editorial column running alongside, where Stencil may speak
- `Rule` — separates header zone from body zone
- `Heading` + `Text` — working title and body placeholder

Occupies (not composed from, but its spatial stage): `Workspace`.

**Grammar chapters expressed**
- **Spatial Grammar** — Desk stage; Law 5 ("expansion creates a new sheet, never an infinitely growing sheet")
- **Material Grammar** — Paper has an edge; finitude generates supersession, archive, provenance
- **Composition Grammar** — Margins law ("the margin is where Stencil may speak; the centre belongs to the founder")
- **Spatial Grammar Law 2** — "the centre belongs to the founder's evidence. Never Stencil."

**Visual implementation (build spec)**
A `Sheet` instance (`Color.Paper` fill, `Color.Border`, corner radius `Radius.Surface`) sized to `Grid.CentreWidth`. A `Margin` instance runs along the trailing edge at `Grid.MarginWidth`, separated by `Spacing.MarginGap`. Inside the Sheet: `Heading` at top, a `Rule` (`Stroke.Hair`) beneath it, then `Text` filling the remainder as body placeholder. No invented content — placeholder text only, default state.

**Hypotheses**
- *H1:* Working Sheet is currently modeled as a compound (`Sheet` + `Margin` in horizontal auto-layout, gap = `Spacing.MarginGap`) rather than a new primitive. Unconfirmed against a real founder session.
- *H2:* Assumed the Working Sheet inherits Empty/Working state from its parent `Workspace` rather than duplicating `Workspace`'s own state indicator. Not yet tested for redundancy.

---

## 2. Evidence Block

**Purpose**
A self-contained unit that preserves a decision together with what was rejected to reach it — the physical unit of Visual Grammar's definition of evidence: *"retained decision. Rejected attempts remain visible. Construction survives completion. Versions coexist."*

**Composed from primitives**
- `Sheet` or `Paper` — carrier surface
- `Strike` — rejected alternatives, remaining legible
- `Annotation` — marginal rationale for the decision
- `Rule` — separates the accepted item from the struck alternatives

**Grammar chapters expressed**
- **Visual Grammar** — Evidence property; Evidence Vocabulary (strike-through, version stamps, numbered sequences)
- **Diagnostic Patterns** — Evidence Threshold (three independent instances for interpretive diagnosis, one contradiction for factual); Claim vs Evidence in the contradiction hierarchy
- **Motion Grammar Law 4 (Persistence)** — "Stencil preserves every committed mark... Evidence is never rewritten."
- **Interaction Grammar** — Ownership ("founder owns every mark they create"); "Evidence constrains. Stencil reveals."

**Visual implementation (build spec)**
A bounded `Sheet`/`Paper` card. Top: the accepted item in normal `Text`/`Heading` weight, `Color.Graphite`. Below a `Rule` (`Stroke.Hair`, `Color.Ghost`): a stack of rejected alternatives, each rendered through `Strike` (`Color.Pencil`; `Color.Coral` reserved only if the rejection is itself flagged as an error, per Visual Grammar's colour-rationing rule). An `Annotation` instance carries the one-line rationale in `Color.Blueprint` (construction register — never asserting certainty).

**Hypotheses**
- *H1:* Assumed all rejected alternatives render inline rather than behind a collapse/expand affordance, per Composition Grammar ("nothing is hidden"). Untested at high alternative-count.
- *H2:* Evidence Vocabulary calls for "version stamps" and "numbered sequences" as native marks. Neither exists as a primitive yet — Evidence Block currently borrows `Annotation`'s left-border treatment as a stand-in. Flagged as a likely **Sprint 5 primitive candidate: "Stamp."**

---

## 3. Disposition Log

**Purpose**
A sequential, append-only record of dispositions — accept / reject / withdraw / supersede. The ledger form of Gesture Grammar's Weight/Lift/Withdrawal and the literal referent of Material Grammar's own tagline: *"Material is disposition: a substance is defined by what it refuses to give up."*

**Composed from primitives**
- `Sheet` — bounded, append-only surface (grows by starting a new sheet, never infinite scroll)
- `Rule` — separates entries
- `Strike` — renders rejected/struck entries within the log
- `Annotation` — Stencil's objection attached to an entry
- `Text` — entry description, alongside the existing **`Typography.Disposition`** token for the status word

**Grammar chapters expressed**
- **Interaction Grammar** — Ownership ("each mark has one author"); Memory ("remember: marks, versions, supersessions, authorship, refusals")
- **Diagnostic Patterns** — Diagnostic Moves ladder (Observe → Compare → Annotate → Question → Strike) — a Disposition Log is a rendered trace of these moves in sequence
- **Gesture Grammar** — Weight ("seals, never approves — the founder alone places the weight"); Lift ("completes the act, marks withdrawal, grants permanence")
- **Material Grammar** — governing metaphor ("material is disposition")
- **Motion Grammar Law 4–5** — Persistence; Completion ("a completed surface... exists to be referenced")

**Visual implementation (build spec)**
A tall, narrow `Sheet` (`Elevation.Sheet`, `Color.Paper`) with vertical auto-layout, entries stacked chronologically, newest at the bottom (append-only, never reordered). Each entry: a `Rule` (`Stroke.Hair`) as top divider; a status word set in `Typography.Disposition` ("ACCEPTED" / "STRUCK" / "WITHDRAWN"), `Color.Graphite` for accepted, rendered through `Strike` when struck; a `Text` line for the entry content; an `Annotation` nested beneath where Stencil raised an objection. No entry is ever deleted or reordered — this constraint is structural, not a style choice.

**Hypotheses**
- *H1:* Assumed one Disposition Log per Working Sheet (scoped to that sheet's lifetime, archivable alongside it) rather than one global log per founder session. Needs a multi-session test.
- *H2:* `Typography.Disposition`'s actual size/weight is still `TBD` in the Token Library (`02-tokens.md`). Assumed it's reserved for the status word only, with `Body`/`Annotation` styling the entry description depending on author. Needs designer confirmation once the token is resolved.

---

## 4. Question Block

**Purpose**
Renders Stencil's single, currently-open question — the physical form of Interaction Grammar's rule *"one open question at a time"* and the fourth rung of the Diagnostic Moves ladder (Observe → Compare → Annotate → **Question** → Strike). Lives exclusively in Margin territory — never the centre.

**Composed from primitives**
- `Margin` — the editorial column that houses it
- `Annotation` — marginal voice ("Stencil speaking without overwriting the founder")
- `Text` — the question copy

**Grammar chapters expressed**
- **Interaction Grammar** — "Stencil asks questions only when..."; "one open question at a time"; "suggestions appear beside, never instead"
- **Gesture Grammar** — Jurisdiction (Margin territory); Law 4 ("Stencil never writes over the founder, Stencil writes beside")
- **Diagnostic Patterns** — Diagnostic Moves ladder
- **Composition Grammar** — Margins ("the margin is where Stencil may speak; the centre belongs to the founder")

**Visual implementation (build spec)**
A `Grid.MarginWidth`-wide block using `Annotation`'s left-border jurisdiction mark (`Color.Blueprint`, `Stroke.Trace`), containing one line of question `Text` in `Typography.Annotation`. No counter or badge is rendered — the *absence* of a second question is the constraint, not a number communicating it. No accept/dismiss button chrome: Gesture Grammar Law 5 (Refusal) forbids compelling agreement, so the founder's implicit refusal is simply not answering.

**Hypotheses**
- *H1:* Modeled as a distinct object rather than an `Annotation` content-variant, because its interaction contract differs — a Question is meant to block new questions from appearing until answered or declined, where Annotation has no such gate. Needs a founder-facing interaction test to confirm blocking is desirable rather than obstructive.
- *H2:* Assumed a declined/answered Question converts into a **Disposition Log** entry rather than disappearing from the Margin, per Permanent Provision 2 ("nothing is removed"). This is the clearest cross-object dependency surfaced this sprint — flag for review before Question Block and Disposition Log are built as connected components.

---

## 5. Archive

**Purpose**
The read-only, citable resting place for completed, superseded, or struck material — the final rung of the Spatial Grammar maturity ladder (Hand → Desk → Wall → Archive). *"Archive is not deletion. Archive is citation."*

**Composed from primitives**
- `Sheet`/`Paper` — the settled, completed surface (once a Sheet reaches Motion Grammar's Law 5 Completion, it exists only to be referenced)
- `Rule` — separates archived entries
- `Strike` — struck/rejected material preserved, not deleted
- `Annotation` — citation metadata (when/why this was archived)

**Grammar chapters expressed**
- **Spatial Grammar** — Archive stage; Law 4 ("Archive is not deletion. Archive is citation"); the Hand → Desk → Wall → Archive maturity ladder
- **Gesture Grammar** — Archive territory ("read-only, neither actor edits, both actors cite")
- **Interaction Grammar** — "Archive belongs to the repository"; Repository = "custodian, not author"
- **Motion Grammar Law 5 (Completion)** — "a completed surface... exists to be referenced"
- **Visual Grammar** — Evidence Vocabulary (version stamps, numbered sequences) as the archive's native citation marks

**Visual implementation (build spec)**
A Wall-style array of discrete miniature `Sheet` instances (each a completed Working Sheet with no editing chrome, `Color.Paper`), laid out with generous `Spacing.WallGap` between them, per Spatial Grammar Law 3 ("the wall exists for comparison"). Each archived Sheet carries a small `Annotation`-style citation stamp in its corner (date/version, `Color.Blueprint`). Any struck content preserved within an archived sheet keeps its `Strike` rendering — archiving never cleans up rejected material.

**Hypotheses**
- *H1:* Assumed full-value `Paper` rather than a desaturated/dimmed treatment to signal read-only — dimming would fabricate a weathering event the object never underwent (Material Grammar: "wear is acceptable, weather is not"). Immutability is communicated by removing edit chrome, not by colour. Flagged as a hard call worth explicit founder review.
- *H2:* Assumed Archive renders as an array of discrete Sheets (each retaining its own edge/finitude) rather than one continuously growing Sheet, since the latter would contradict Spatial Law 5. This is the current best guess and the most likely to need revision once real archive volume is tested.

---

## Summary

Five objects specified, none yet built visually. Each traces to primitives and tokens already documented in `02-tokens.md` and `03-primitives.md` rather than inventing new visual language; the one new dependency surfaced is a **"Stamp" primitive candidate** (version/citation marks used by both Evidence Block and Archive but not yet built as its own primitive — currently stood in for by `Annotation`'s left-border treatment).

Two structural relationships surfaced that weren't visible from the Primitive Library alone:
1. Question Block → Disposition Log: an answered/declined question is hypothesized to convert into a log entry, not disappear.
2. Working Sheet → Disposition Log: hypothesized to be scoped 1:1 (one log per sheet's lifetime), archivable together.

No product screens, dashboards, or landing pages were created, per instruction. Optimized throughout for traceability to the Book over visual polish — several fields above are intentionally left as open hypotheses rather than resolved defaults.

**Next step:** these five "Visual implementation" specs are ready to execute in whichever visual tool you're using for spatial exploration (Penpot, Figma, or otherwise) — following `03-primitives.md`'s documentation-card + showcase pattern (Purpose / Derived From / Tokens Used / Auto Layout / Variants / States). Per this project's architecture, this markdown file remains canonical regardless of which tool renders it; update here first if any hypothesis above gets resolved during that visual pass.
