---
name: overture
description: Story engine for moving-image assets — takes section context + brand.md, produces a narrative spine, hook, form casting, and annotated storyboard. Form-agnostic — video, kinetic type, scroll-driven SVG, stop-motion. Story decides the form, never the reverse.
---

# Overture — Story Engine for Moving Assets
## Stencil + Frame

> **Why "Overture":** an overture states the opera's themes in compressed form
> before the curtain rises. A hero video does exactly this for the page; a
> cold-open does it for an episode. The correspondence is structural, not
> decorative: both are the whole argument, performed in miniature, before the
> audience decides to stay.
>
> **Position in the stack:** copy-engine writes the words. Art-Direction picks
> the evidence. Rubato performs the type. Coda gates the build. **Overture
> decides what happens in time.** It is the narrative brain for
> `ART_DIRECTION_SKILL.md §7` (motion layer).

When this skill is invoked, execute the steps below in order. Do not skip
steps or merge them. Steps 2–7 are non-skippable regardless of asset type.

---

## Step 1 — Load context

Read from the repo root (clone if needed — project knowledge snapshots are
not authoritative):

- `brand.md` — hold verbatim: **Purpose**, **Difference**, **Personality
  tension**, **Voice do's/don'ts**, **Guardrails**
- `skills/Art-Direction/ART_DIRECTION_SKILL.md` — §2 registers, §7 motion
  rules, §9 device library (each device's approved motion verb)
- `skills/Rubato/motion-tokens.md` — the only legal durations and eases
- `DESIGN.md §5` — the current page's device budget

brand.md is the source of truth. If anything below conflicts with it,
brand.md wins.

---

## Step 2 — Accept input

Require three things before storyboarding a frame:

**`placement`** — where the asset lives. One of:
- `hero-loop` — landing page hero, ≤ 15s loop, silent, must not delay LCP
- `section-motion` — one motion event inside a page section
- `demo` — How It Works recording or product walkthrough, ≤ 60s
- `episode-open` — YouTube cold-open, ≤ 20s
- `teaser` — social cut, 6–15s, vertical-first

An unlisted placement changes only the duration ceiling — it is not a reason
to shorten the pipeline.

**`section_argument`** — which argument this placement carries: critique /
method / soul / personality (same taxonomy as Art-Direction's device
selection rule).

**`brief`** — one sentence: what the viewer should believe after watching.
If vague, ask one clarifying question before proceeding.

---

## Step 3 — Narrative spine

Before any visual thinking, write the spine using a structure from
`References/story-spines.md`. State it in exactly this format:

> *Spine: [structure name] — Setup: [x] / Tension: [y] / Resolution: [z]*
> *Hero: the founder-viewer. Guide: the product. Never inverted.*

Rules:
- The viewer is the hero; Stencil is the pencil. If the spine casts the
  product as protagonist, rewrite it.
- The resolution must map to a named `brand.md` concept. Name it.
- One spine per asset. Cut-downs (Step 7) trim this spine; they never get
  their own.

---

## Step 4 — Hook selection

Select exactly ONE hook pattern from `References/hook-patterns.md` and state
it in one line:

> *Hook: [pattern name] — [one-sentence reason it fits this brief]*

Hard rules:
- The hook must land inside 3 seconds and be legible as a still frame.
- Silent-first: the hook may not depend on audio. Sound is opt-in seasoning
  (detail-patterns P-11 governs the only approved sound moment).
- Never stack hooks. One pattern per asset.
- Emotion before explanation; clarity before cleverness. If the hook needs a
  caption to be understood, it failed.

---

## Step 5 — Form casting

Only now decide what the asset physically is. Consult
`References/form-casting.md` and state:

> *Form: [form] — [why this story demands this body]*

The casting question is: **which form makes the spine's tension visible with
the least production cost?** Story decides form. Choosing the form first and
retrofitting a story is a violation — flag and restart at Step 3.

Check against the page's device budget (DESIGN.md §5) — a motion asset that
requires an unapproved device is rejected at this step, not discovered at
build time.

---

## Step 6 — Storyboard (the gate)

Produce the storyboard as a numbered beat table. No production — filming,
animating, coding, prompting — may begin before this table is approved by
Sumit. Each beat carries:

| # | Time | Frame (what is visible) | Motion verb | Device / register | brand.md trace |
|---|------|--------------------------|-------------|-------------------|----------------|

Rules per beat:
- **Still-frame test:** every beat must communicate as a freeze frame
  (Art-Direction §7). If a beat only works in motion, split or cut it.
- **Motion verbs** come from the device library only (D1: the line draws
  itself, slow, once; D2: unfolds line by line; D4: sequential cross-outs —
  the only device allowed an extended sequence; etc.). No invented motion.
- **Durations and eases** come from motion-tokens.md only. A beat that needs
  a new duration is a declared gap that goes to Rubato first.
- **One motion event per viewport** for web placements — the storyboard for
  `section-motion` is one row, not a sequence.
- Every beat's last column names the positioning concept it derives from.
  A beat with an empty trace column is decoration — cut it.

Include below the table:
- **Fallback still** — which single frame serves as the poster/reduced-motion
  variant (mandatory for all web placements)
- **Performance note** — expected weight; hero-loop must not delay LCP;
  critical content (headline, CTA) renders before motion loads

---

## Step 7 — Cut-down plan

At storyboard stage — never in post — declare the derivative cuts by listing
which beats each cut keeps:

- e.g. `hero-loop` (beats 2–4), `teaser` (beats 1, 4), `episode-open` (all)

A spine that cannot be trimmed without losing integrity is a spine with
structural fat. Revisit Step 3 rather than shipping an untrimmable asset.

Skip this step ONLY when the brief explicitly states single-use.

---

## Step 8 — Self-check (visible, un-silenceable)

Run and output the audit under `## Self-check`, one line per gate, format:

```
[PASS|FLAG] gate-name — one-line evidence
```

Gates:
1. **hook-3s** — hook lands within 3 seconds, legible as a still
2. **silent-first** — meaning survives with sound off
3. **hero-inversion** — viewer is hero, product is guide, throughout
4. **still-frame** — every beat passes the freeze-frame test
5. **trace** — every beat names its brand.md concept
6. **device-budget** — devices used are approved for this page (DESIGN.md §5)
7. **motion-legality** — all verbs from device library, all timings from
   motion-tokens.md
8. **restraint** — one hook, one motion event per viewport, no stacking
9. **fallback** — poster frame + reduced-motion variant declared
10. **anti-slop** — nothing glossy, no spectacle-for-spectacle; would a human
    believe a human staged this?

FLAGs are never resolved silently. Present them to Sumit with the storyboard.
The audit trail stays attached to the asset (same discipline as copy-engine
Step 5) — the reasoning is the product's argument made real.

---

## Boundaries

- Overture does not write final copy (copy-engine), pick still imagery
  (Art-Direction), animate type (Rubato), or verify builds (Coda). It hands
  each of them an approved storyboard.
- Overture never attributes Frame's outputs to Stencil or vice versa in any
  narrative beat.
- The imagistic register remains protected per brand.md — spines are told in
  evidence, not metaphor.
