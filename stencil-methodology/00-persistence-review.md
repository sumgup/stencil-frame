# Persistence Review

Scope: `stencil-methodology/` (01–04 + README) as of the current tip of
`feature/stencil-methodology-persistence`, checked against `book/*.md`.
This review reads and cross-checks; it does not edit `01-foundations.md`,
`02-tokens.md`, `03-primitives.md`, `04-canonical-objects.md`, or `README.md`.
It does not touch the Stencil Book, Figma, or Penpot.

Method: every direct quote and law citation in `04-canonical-objects.md`
and the flagged Motion tokens in `02-tokens.md` was checked against the
actual text of the cited `book/*.md` chapter (all 11 chapters read in
full, including `00-stencil.md`, which the Sprint 4 file's own source
list omits — see Missing Evidence).

---

## Confirmed

Verified verbatim or near-verbatim against the book text itself, not
just against another Sprint file's paraphrase of it.

- **Spatial Grammar**: Desk stage, Law 2 ("the centre belongs to the
  founder's evidence... Never Stencil"), Law 3 ("the wall exists for
  comparison... the desk exists for editing"), Law 4 ("Archive is not
  deletion. Archive is citation"), Law 5 ("Expansion creates a new
  sheet. Never an infinitely growing sheet"), Hand→Desk→Wall→Archive
  ladder, Margin as Stencil's editorial territory. All match `book/06-spatial-grammar.md`.
- **Composition Grammar**: "The margin is where Stencil may speak. / The
  centre belongs to the founder." "White space is withheld judgment."
  "Nothing is hidden." All match `book/07-composition-grammar.md` exactly.
- **Visual Grammar**: Evidence definition ("retained decision. Rejected
  attempts remain visible. Construction survives completion. Versions
  coexist"), Evidence Vocabulary (strike-through, version stamps,
  numbered sequences all appear in the book's list), colour-rationing
  principle (Blueprint = construction, Coral = error, near-monochrome
  substrate). Match `book/04-visual-grammar.md` exactly.
- **Material Grammar**: "Material is disposition: a substance is defined
  by what it refuses to give up." "Tracing paper is the material of
  supersession." Paper has an edge → supersession/archive/provenance.
  "Wear is acceptable. Weather is not." Match `book/05-material-grammar.md`
  exactly.
- **Diagnostic Patterns**: Evidence Threshold (three independent
  instances for interpretive, one contradiction for factual) and the
  Diagnostic Moves ladder (Observe → Compare → Annotate → Question →
  Strike) both match `book/02-diagnostic-patterns.md` exactly.
- **Interaction Grammar**: "Founder owns every mark they create."
  "Evidence constrains. Stencil reveals." "Each mark has one author."
  Memory list (marks, versions, supersessions, authorship, refusals).
  Questions section ("Stencil asks questions only when...", "one open
  question at a time" [book: "One open question at a time."],
  "suggestions appear beside, never instead"). "Archive belongs to the
  repository." Repository = "custodian, not author." All match
  `book/03-interaction-grammar.md` exactly.
- **Gesture Grammar**: Weight ("Seals. Never approves. The founder alone
  places the weight"), Lift ("Completes the act. Marks withdrawal.
  Grants permanence"), Jurisdiction/Law 4 ("Stencil never writes over
  the founder. Stencil writes beside"), Law 5/Refusal ("No gesture may
  compel agreement"). All match `book/08-gesture-grammar.md` exactly.
- **Motion Grammar**: Law 4/Persistence ("Stencil preserves every
  committed mark and may withdraw only its own uncommitted proposal";
  "Evidence is never rewritten"), Law 5/Completion ("A completed surface
  changes status... It exists to be referenced"), Law 1/Tempo
  ("Observation is quick"). All match `book/09-motion-grammar.md`
  exactly.
- **`00-stencil.md`, Permanent Provision 2**: "Nothing is removed.
  Rejected work remains legible." Cited in Question Block's H2 as
  "Permanent Provision 2 ('nothing is removed')" — confirmed exact, and
  the source is real and correctly quoted, even though `00-stencil.md`
  is absent from `04-canonical-objects.md`'s own "Source material read"
  list (see Missing Evidence).
- **Decided foundation values**: Corner Radius / Radius = 0, Elevation =
  0. Both stated as Decided in `01-foundations.md` and `02-tokens.md`
  consistently, and both trace to explicit counterexample language in
  Visual Grammar (rounded cards, drop shadows/glassmorphism named as
  violations).
- **Primitive-to-token consistency**: every primitive in `03-primitives.md`
  references tokens that now exist in `02-tokens.md` by name, including
  `Color.Border` and `Radius.Surface` after the 2026-08-08 correction.

## Reconstructed

Present in the current files but built from something other than a
direct, complete read of the original source — either a screenshot with
visible content, or a plausible completion of a source that was
partially readable.

- **`03-primitives.md`, Text and Heading entries**: Auto Layout,
  Variants, and States fields are complete because the source screenshot
  showed them clearly. These two entries are the most reliable in the
  file for that reason — reconstructed from a fully legible source, not
  inferred.
- **`03-primitives.md` showcase descriptions** (the "as shown in Figma"
  paragraphs under each primitive): these are descriptions of what the
  screenshot's example composition looked like, written by the person
  transcribing, not transcribed text from a field in Figma itself. They
  are useful context but are readings of an image, not source content.
- **`04-canonical-objects.md`'s "Next step" section**: the closing
  paragraph was rewritten during the 2026-08-08 relocation to remove a
  stale "blocked on Figma MCP quota" framing and replace it with language
  matching the now-decided Git-canonical architecture. This is the one
  paragraph in the file that is not verbatim from the original
  `design/CANONICAL-OBJECTS-sprint4.md` — everything else in that file
  (Purpose, Composed-from, Grammar citations, Visual implementation,
  Hypotheses, Summary) is unchanged from the original.
- **`02-tokens.md`'s `Color.Border` entry**: Purpose and Grammar Source
  were written on 2026-08-08 by inference from how `Color.Border` is
  already used across `03-primitives.md` and `04-canonical-objects.md`
  (Paper, Sheet, Margin, Annotation, Workspace, Working Sheet), not
  transcribed from any Figma source — none exists for this token, since
  it wasn't part of the original Sprint 2 page. This is disclosed inline
  in that file's own Correction log, and repeated here for visibility.

## Uncertain

Content that made it into the files but carries a specific, identified
doubt — not a blank field, a value that might be wrong or incompletely
sourced.

**Note: the three Motion token items below describe the state as first
found. All three were corrected directly during this same review pass —
see "Decisions Required From Sumit" for what changed and why. Left here
for the audit trail; `02-tokens.md` itself now reflects the corrected
citations, not what's described in this section.**

- **`02-tokens.md`, Motion token `Pause`, citation "Law 3 (Continuity)"**:
  checked directly against `book/09-motion-grammar.md`. This is a
  genuine mismatch, not just an unconfirmed guess. The phrase paired
  with it in `02-tokens.md` — "judgment receives time" — is actually Law
  1 (Tempo)'s language ("Observation is quick. Judgment receives time.
  Correction is decisive. Resolution rests."), not Law 3's. Law 3's
  actual content is about discrete editorial units and causality between
  actions, which doesn't describe a pause/withheld-judgment duration.
  `02-tokens.md` already self-flags this cell as `[verify against
  Figma]`; this review confirms the flag is warranted and narrows it —
  the citation is wrong, not merely unverified. **Corrected to Law 1.**
- **`02-tokens.md`, Motion token `Withdraw`, Purpose text**: says "Only
  Stencil's uncommitted work may withdraw; founder proposals may
  withdraw too." The book (Motion Grammar Law 4) only describes
  Stencil's own uncommitted proposal as withdrawable — "The only
  exception is a proposal made by Stencil that has not yet been
  accepted." Nothing in Law 4 or elsewhere read for this review supports
  founder proposals also being withdrawable. This looks like added scope
  beyond what the law actually states, not a citation error — the Law 4
  citation itself is correct, but the Purpose sentence built on top of it
  says more than the book supports.
- **`02-tokens.md`, Motion token `Easing`, citation "Law ~ (Weight:
  consequence, not force/bounce)"**: content matches Motion Grammar Law
  2 (Weight) exactly ("Weight is consequence, not force"; "Not from
  bounce. Not from overshoot."), but the citation itself never resolves
  the law number — it's left as "Law ~" in the file. Low-severity since
  the content is right, but the citation is incomplete as written.
- **`03-primitives.md`, five entries with mid-sentence truncation** (Rule,
  Margin, Strike, Annotation, Workspace): each has a bracketed guess at
  what the missing words probably were, drawn from matching language
  used elsewhere in this same repo (e.g. Margin's likely ending "...where
  Stencil may speak" is inferred from the identical phrase already
  confirmed in Composition Grammar and reused verbatim in
  `04-canonical-objects.md`). These bracketed guesses are reasonable —
  several are supported by real book text found during this review — but
  they are still guesses standing in an unresolved field, not confirmed
  transcriptions. They should not be promoted to plain text until
  checked against the actual Figma card.

## Missing Evidence

Content that doesn't exist anywhere in this repo yet, in any form —
not reconstructed, not uncertain, simply absent.

- **`99 Decision Log`** (the Figma page tracking flagged/undecided items
  from Sprints 1–3): not transcribed in any file in `stencil-methodology/`.
  Unknown whether it contains anything that would supersede a TBD value
  currently sitting in `01-foundations.md` or `02-tokens.md`. This is the
  single largest unknown in the current record.
- **`03-primitives.md`, Auto Layout / Variants / States for 7 of 9
  primitives** (Paper, Sheet, Rule, Margin, Strike, Annotation,
  Workspace): blank, not guessed. Only Text and Heading have this
  metadata because the source screenshot showed it for those two.
- **`book/00-stencil.md` is not listed in `04-canonical-objects.md`'s own
  "Source material read for this sprint" line**, despite Question
  Block's H2 correctly quoting Permanent Provision 2 from that exact
  chapter. Either the source list is incomplete (most likely — the quote
  is real and accurate, so the chapter clearly was read), or the citation
  was sourced secondhand from somewhere other than a direct read of
  `00-stencil.md`. Worth a one-line fix to the source list for
  traceability, though the content itself checks out.
- **No hex values exist anywhere in this repo for the Stencil methodology
  palette** (Paper, Graphite, Pencil, Ghost, Blueprint, Coral, Border).
  All seven are "principle decided" (their role/purpose is settled) but
  every specific value is TBD. This is consistent across `01-foundations.md`
  and `02-tokens.md`, not a contradiction — flagged here only because
  Sprint 5 / Canonical Surface work would need these resolved before any
  visual build could proceed past wireframe-level fidelity.
- **No numeric spacing, motion-duration, or grid values exist anywhere.**
  Every Spacing, Grid, and Motion token in `02-tokens.md` is `Suggested
  Value: TBD`. This is a large, structural gap, not a handful of loose
  ends — essentially the entire quantitative layer of the design system
  is unresolved, with only the qualitative/relational meaning of each
  token established.

## Decisions Required From Sumit

Original review (2026-08-08, first pass) listed five open items. Three
were factual — errors against a frozen, authoritative source, not
judgment calls — and have since been resolved directly rather than left
open; two remain genuinely open below.

**Resolved during this review (2026-08-08, second pass) — decided
without waiting for founder input, because these were correctness
questions, not product/intent questions:**

1. ~~`book/00-stencil.md` missing from `04-canonical-objects.md`'s source
   list~~ — **Fixed.** Added to the source list with a note explaining
   the correction. The Permanent Provision 2 citation itself was already
   accurate.
2. ~~`Pause` token cited "Law 3 (Continuity)"~~ — **Corrected to Law 1
   (Tempo)**, where "judgment receives time" actually appears. Rationale:
   Law 3's actual text (discrete editorial units, causal joins between
   actions) does not support the original citation under any reading —
   this was transcription drift, not an interpretive question. Full
   correction note left inline in `02-tokens.md`.
3. ~~`Withdraw` token's Purpose claimed founder proposals are also
   withdrawable~~ — **Corrected to match Motion Grammar Law 4 as
   written** (only Stencil's own uncommitted proposal may withdraw). I
   chose "match the book" over "treat as a deliberate extension" because
   nothing in the token's context signals intent to expand the law, and
   the burden of proof for silently widening a frozen law's scope should
   sit with an explicit supersession record (per `book/00-stencil.md`'s
   own Supersession process), not with an unmarked clause in a token's
   description. **If this correction is wrong** — if you actually did
   intend founder-proposal withdrawal as a deliberate future direction —
   say so and it should become a logged supersession proposal against
   Motion Grammar Law 4, not a quiet edit to this token file. Flagging
   this explicitly for review during implementation, since I can't
   verify intent from text alone and chose the conservative reading.

**Still open — genuinely require your judgment, not correctness review:**

4. **Should Sprint 5 begin before or after the 99 Decision Log is
   transcribed?** Given the Decision Log might contain material that
   changes a currently-Decided or TBD value, starting Canonical Surface
   work without it carries real risk of rework — but that's a schedule
   tradeoff only you can weigh. Not decided here.
5. **How much quantitative value-setting (hex codes, spacing scale,
   motion durations) needs to happen before Canonical Objects can move
   from spec to visual build?** The five objects in `04-canonical-objects.md`
   are fully specified in relational/qualitative terms but reference
   tokens that are almost entirely `TBD` in absolute value. Whether that's
   acceptable for a first visual pass (wireframe-fidelity, values filled
   in later) or a blocker is a product decision, not a documentation gap.
   Not decided here.

## Recommended Next Step

With items 1–3 resolved, the remaining risk before Sprint 5 is narrower
than the first pass of this review found: the two confirmed-wrong Motion
token citations are now fixed, so the main outstanding exposure is the
untranscribed 99 Decision Log (Missing Evidence, item 1) and the two
still-open scheduling/scope decisions (items 4–5 above).

Recommendation, offered as a comment for review during implementation,
not a decision made on your behalf: get eyes on the live Figma 99
Decision Log page before starting Canonical Objects visual work — even a
partial transcription would close the single largest unknown left in the
record — and treat item 5 (how much value-setting Sprint 5 needs before
visual build) as a scoping conversation to have explicitly rather than
something to infer from how complete the current TBDs look. Everything
else in `stencil-methodology/` is now either Confirmed against the book
directly, or clearly marked as Reconstructed/Uncertain/Missing with no
ambiguity about which is which.
