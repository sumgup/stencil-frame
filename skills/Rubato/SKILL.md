---
name: rubato
description: Recommends and specifies expressive typography/motion treatments for a given piece of text, scored against brand.md tokens and hard legibility/accessibility rules. Vetoes unsafe treatments with reasons and a legible fallback.
---

# Rubato — Expressive Typography + Motion Engine

Rubato takes a string of content and returns a *typographic performance spec* —
which treatment to apply, why it's safe (or why it isn't), and the exact
tokens to render it with. It never invents a treatment outside brand.md's
type system, and it never lets theatrics override legibility.

## Step 1 — Load
Load `brand.md`'s visual/typography tokens (font families, DTCG type scale)
and the three Rubato reference files:
- `references/treatments.md` — the techniques catalog
- `references/legibility-rules.md` — the scoring/veto rule set
- `references/motion-tokens.md` — duration/easing/stagger token schema
- `brand.md` → `personality.creative_stance` — hold: `primary_tension`,
  `supporting`, `archetype_hint`. These govern tone, density, motion
  personality, and visual register for this output. If the field is
  absent, proceed without it (v0.x brands may not have it yet).

If brand.md has no typography tokens yet, stop and say so — Rubato has
nothing to theme against.

## Step 2 — Require
Before recommending anything, require:
- **text** — the exact string
- **role** — display / heading / body / UI-chrome
- **context** — surface size (hero vs. card vs. inline), script/language,
  audience/accessibility sensitivity, whether `prefers-reduced-motion` is
  signaled

Missing role or context is not fatal — assume the least permissive case
(body, reduced-motion on) rather than blocking, and say which assumption
was made.

## Step 3 — Recommendation pass
Score **every** treatment in `treatments.md` against `legibility-rules.md`.
For each, return:

```
{
  treatment: "radial",
  verdict: "veto" | "allow" | "recommend",
  reasons: ["...", "..."],
  fallback: "oversized-balanced-headline"
}
```

Reasons must cite the specific rule that fired (string length, case,
role, script, reading-level, reduced-motion) — never a bare "not
recommended." This table is the audit trail's spine.

## Step 4 — Select treatment + motion preset
Pick from `recommend` first, `allow` only if no `recommend` exists, and
never from `veto`. Pull the matching duration/easing/stagger tokens from
`motion-tokens.md`, themed via brand.md (never hardcoded).

If everything vetoes, select the fallback and say so plainly — a vetoed
cascade is a valid, expected outcome, not a failure.

## Step 5 — Output spec
Produce the implementation-ready spec:
- technique name + one-line description
- implementation layer (CSS-only / GSAP / R3F) per treatments.md's
  recommended approach
- token references used (not literal values — point at the token names)
- ARIA requirements if the technique splits text (aria-label on parent,
  aria-hidden on shards)

## Step 6 — Accessibility self-check + restraint check
Visible, un-silenceable, two parts:

**Accessibility gates** (pass/fail each, shown):
- [ ] `prefers-reduced-motion` fallback defined and legible
- [ ] WCAG 2.3.3 (motion from interaction), 2.2.2 (pause on >5s autoplay),
      2.3.1 (flash threshold) — not applicable / satisfied
- [ ] Contrast holds if image/video-in-text is used
- [ ] Split-text ARIA present if applicable
- [ ] Reflow/zoom not broken

**Restraint check** (the anti-slop equivalent):
- Does this treatment earn its theatrics, or would a plainer choice serve
  the content equally well? An extreme treatment applied because it's
  *available*, not because the content role demands it, fails this check —
  rewrite down to `allow` or the fallback.

**Stance check:** Where on the `primary_tension` axis does this output
sit? Is that appropriate for the surface type (brand surface → lean
toward the first pole; product surface → lean toward the second)?
Does it satisfy `supporting`?

Both checks are shown in the output, not silently passed.
