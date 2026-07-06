# SKILL.md — Coda Engine
> The finish-and-seal layer. Coda adds no new design decisions; it completes and
> seals the ones the other engines made. A page is unfinished until Coda has run.

## When this skill activates
Use when: finishing a page or feature for ship; auditing judged surfaces (404,
loading, empty, error, hover, focus); running pre-launch quality gates; preparing
an award submission. Trigger phrases: "polish", "finish", "ship-ready", "award
pass", "run Coda".

Do NOT use for: choosing motion treatments (Rubato), choosing UI controls
(Perspective), visual direction (Art Direction engine), writing copy
(Copywriting engine). If those decisions are missing, STOP and name the gap —
Coda seals decisions, it never invents them.

## Inputs required before running
1. `brand.md` — every treatment must trace to it
2. The page/feature in a buildable, reviewable state
3. Outputs of upstream engines where they exist (motion tokens, UI patterns,
   approved copy). Missing upstream output = declared gap in the audit trail,
   never silently improvised.

## References (load on demand, in this order)
- `References/judged-surfaces.md` — the 14 surfaces, tiers, pass conditions (ALWAYS load)
- `References/floor-gates.md` — hard pass/fail thresholds (load at Step 4) [NOT YET WRITTEN — use gates table in judged-surfaces.md]
- `References/detail-patterns.md` — micro-interaction library with perf costs (load at Step 3) [NOT YET WRITTEN]
- `References/submission-craft.md` — award submission timing/categories/shots (load only when preparing a submission) [NOT YET WRITTEN]

## The six steps (run in order, no skipping)

### Step 1 — Load inputs
Read brand.md. Read the current build. List upstream engine outputs present/absent.

### Step 2 — Inventory judged surfaces
Walk judged-surfaces.md tier by tier (P0 → P1 → P2). For each surface, mark:
DONE (pass condition met) / IN PROGRESS / NOT STARTED / N/A (with reason).
Output the inventory as a table before doing any work.

### Step 3 — Detail pass
Work surfaces in tier order, one at a time. For each: apply the S+F treatment
from judged-surfaces.md, citing the brand.md line it traces to. No surface ships
in default browser/framework state. If a treatment needs a token or pattern that
doesn't exist upstream, declare the gap — do not invent a one-off.

### Step 4 — Floor gate
Run every gate in the floor gates table. Report actual measured numbers, not
"looks fine". A failing gate blocks ship unless the failure is explicitly
accepted and recorded in the audit trail.

### Step 5 — Narrative audit
Read the page top to bottom, headlines only. Does the arc hold:
problem → thesis → proof → invitation? Does each section answer exactly one
question? Flag any section that is a feature list wearing a headline.

### Step 6 — Self-check + audit trail (UN-SILENCEABLE)
Always output, even if everything passes:

```
CODA AUDIT
Surfaces: [n] done / [n] gaps (list gaps)
Gates:    [pass/fail per gate, measured values]
Narrative:[verdict + weakest beat]
Traces:   [each treatment → brand.md line]
Verdict:  SHIP / HOLD (reason)
Fallback: [if HOLD: smallest change that flips it to SHIP]
```

This block cannot be omitted, summarized away, or replaced with prose.

## Voice of this engine
Coda reports like an inspector, not a cheerleader. Measured numbers over
adjectives. A gap named plainly is worth more than a pass described warmly.

## Known gaps (v0)
- floor-gates.md, detail-patterns.md, submission-craft.md not yet written
- Perf testing protocol assumes local Lighthouse; no CI wiring yet
- No per-surface time estimates for ADHD-bounded task sizing (add in v0.1)
