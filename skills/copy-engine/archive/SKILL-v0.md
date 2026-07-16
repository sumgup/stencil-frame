---
name: copy
description: Generate on-voice copy for Stencil + Frame — reads brand.md, writes to voice, self-checks against 5 do's / 5 don'ts, flags violations visibly
---

# Copywriting Skill — Stencil + Frame v0

When this skill is invoked, execute the steps below in order. Do not skip steps or merge them.

---

## Step 1 — Load brand context

Read `brand.md` from the project root. Hold the following sections verbatim in context for the duration of the task — do not paraphrase or compress them:

- The full **Voice** section: philosophy, 5 Do's, 5 Don'ts, reference moves, anti-examples
- **Personality** and **Personality tension** from Positioning
- The full **Guardrails** section

The brand.md is the source of truth. If anything in these instructions conflicts with brand.md, brand.md wins.

---

## Step 2 — Accept input

Require two things from the user before writing a word:

**`content_type`** — one of:
- `tagline` — 5–9 words, the brand's stated position
- `hero line` — 1–2 sentences, top-of-page premise
- `manifesto paragraph` — 3–5 sentences, the belief stated plainly
- `CTA` — call to action, 3–12 words
- `boilerplate` — 3–4 sentences, the brand in plain description for bios, footers, press
- `social post` — single post, platform-agnostic, 280-char ceiling unless specified
- `headline` — ad or article headline, single sentence

If the user names a type not on this list (video script, email subject line, ad copy, etc.), accept it. An unlisted content_type changes only the length guidance you apply in Step 4 — it is not a reason to shorten the pipeline. Steps 3, 4, and 5 still run in full, in order, exactly as they would for `tagline` or any other listed type.

**`brief`** — one sentence describing the angle, context, or specific claim to make. If the brief is vague ("write something good"), ask one clarifying question before proceeding.

---

## Step 3 — Choose technique

Mandatory for every content_type, listed or unlisted. There is no content_type for which technique selection can be skipped — if the brief doesn't obviously map to one of the core four, that means think harder about the reader's awareness level and audience frustration, not skip the step.

First, identify which failure mode the reader is living in — consult `failure-modes.md`. If a mode applies, the misdiagnosis (not the symptom) is the primary copy target. If no mode applies, proceed to framework selection as before.

Before writing, select the primary technique from `copy-frameworks.md` that matches the content_type and brief. State it in one line:

> *Technique: [name from copy-frameworks.md] — [one-sentence reason it fits this brief]*

Do not apply more than one major technique per piece. v0 is not the place for synthesis.

---

## Step 4 — Generate copy

Write the copy. Output it under the heading `## Copy`.

**Length guidance by type:**
- Tagline: 1 version. One clause or short sentence.
- Hero line: 1–2 variants. 1–2 sentences each. Present both if you write two.
- Manifesto paragraph: 1 version. 3–5 sentences, no more.
- CTA: 1 primary + 1 alternative.
- Boilerplate: 1 version. 3–4 sentences, dense, no filler.
- Social post: 1 version. Hard 280-char ceiling.
- Headline: 1–2 variants.

Write as if the reader is a solo founder who has been tweaking their Canva template for three weeks and suspects the problem is not the template. The voice is already in brand.md — follow it, don't interpret it.

---

## Step 5 — Self-check

Mandatory for every content_type, listed or unlisted. An unfamiliar content_type is a reason to run this step more carefully, not a reason to skip it — there's no prior example to lean on, so the audit is the only thing standing between the draft and brand.md's rules being violated silently.

Run a visible pass against every do and don't from brand.md. Output under `## Self-check`.

Format each line exactly as:

```
✓ Do 1 — [3-word shorthand]: [one-line reason this passes]
✓ Do 2 — ...
✗ Don't 3 — [3-word shorthand]: FLAG — [what the specific violation is in the copy]
```

Use `✓` for pass, `✗` for flag. All 10 rules must appear, in order (Do 1–5, then Don't 1–5). Do not skip a rule because it seems irrelevant — note "not applicable" if it genuinely cannot apply to this content_type.

**If there are flags:**
- Leave the original copy exactly as written above the self-check
- Add a `## Revision` section below the self-check with only the flagged elements rewritten
- The self-check must remain visible and unedited — it is the audit trail

Do not silently fix anything. The check is the point.

---

## Step 6 — Anti-slop pass

After the self-check (or revision if there was one), output `## Anti-slop pass`.
*(Rationale for each test in `copy-frameworks.md §Anti-slop`.)*

Check for and call out each of the following if present in the final copy (or the revision, if it exists):

**Buzzwords to cut:** innovative, seamless, unlock, leverage, empower, journey, ecosystem, game-changing, next-level, transformative, powerful, robust, holistic, scalable, dynamic, streamlined, revolutionize, disruptive, cutting-edge, world-class

**Hedging language to cut:** might, sort of, perhaps, we think, we believe, in our opinion, kind of, we feel — *exception: past-tense earned uncertainty ("we got this wrong first") is not hedging; it is allowed per Do 3*

**Punctuation doing emotional work:** exclamation marks, ellipses used for drama, ALL CAPS for emphasis

**Filler openers:** "At [Brand], we..." / "We're excited to..." / "We're passionate about..." / "We're proud to..."

**Sentence length:** flag any sentence over 25 words — in this voice, length reads as hedging

Report each finding as:
```
⚠ [finding]: "[the offending phrase]" — cut or rewrite
```

If nothing is found: `Anti-slop: clean.`

Do not rewrite for the user here — name the problem, let them decide. The anti-slop pass is diagnostic, not prescriptive.

---

## Output order (always)

1. Technique selection (one line)
2. `## Copy`
3. `## Self-check`
4. `## Revision` (only if flags exist in self-check)
5. `## Anti-slop pass`

---

Reference: `copy-frameworks.md`, `failure-modes.md`
Brand source of truth: `brand.md`
