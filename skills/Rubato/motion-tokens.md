# Rubato — Motion Tokens

DTCG-format (2025.10) motion tokens. One `brand.md` fans these out; Rubato
never hardcodes a duration, easing curve, or stagger value — every
treatment in `treatments.md` references a token name from here.

## Schema

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "motion": {
    "duration": {
      "$type": "duration",
      "instant":  { "$value": "1ms" },
      "fast":     { "$value": "200ms" },
      "moderate": { "$value": "400ms" },
      "slow":     { "$value": "800ms" },
      "ambient":  { "$value": "2400ms" }
    },
    "easing": {
      "$type": "cubicBezier",
      "expressive": { "$value": [0.2, 0.8, 0.2, 1] },
      "standard":   { "$value": [0.4, 0.0, 0.2, 1] },
      "linear":     { "$value": [0.0, 0.0, 1.0, 1.0] },
      "settle":     { "$value": [0.16, 1, 0.3, 1] }
    },
    "stagger": {
      "$type": "number",
      "tight":  { "$value": 0.02 },
      "loose":  { "$value": 0.08 },
      "reveal": { "$value": 0.042, "$description": "42ms per character — The Correction reveal and any kinetic character-by-character reveal on the landing page. Line 2 starts when line 1 is 40% through. Design-specific value; not for general character-stagger use." }
    }
  }
}
```

## Token-to-treatment mapping

| Token | Used by | Notes |
|---|---|---|
| `duration.instant` (1ms) | `scroll-driven` | Per the CSS convention: scroll-timeline-driven animations set `animation-duration: 1ms` so the timeline (not the duration) governs playback — this is a technical requirement, not a stylistic choice. Never substitute another duration token here. |
| `duration.fast` | `radial` (optional entrance), `split-stagger` (per-shard), `oversized-balanced-headline` (minimal fade-in) | Entrance/reveal beats |
| `duration.moderate` | `axis-choreo`, `oversized-overlap` (if animated) | Default choreography speed |
| `duration.slow` | `background-clip-text` (pan/zoom), `3d-extruded` | Slow, ambient movement — theatrical without being frantic |
| `duration.ambient` | `marquee-ticker` | Full loop cycle length |
| `easing.expressive` | `axis-choreo`, `oversized-overlap`, `collage-grid`, `radial` (optional entrance) | The "Rubato" curve — overshoots slightly, reads as alive |
| `easing.standard` | `text-on-path` entrance, `oversized-balanced-headline` fade-in | Neutral, doesn't compete with the treatment itself |
| `easing.linear` | `scroll-driven`, `marquee-ticker` | Required — scroll position and ticker loops must map linearly or they feel like they're stuttering |
| `easing.settle` | `split-stagger`, `3d-extruded` entrance | Gentle overshoot-then-settle, good for elements arriving individually |
| `stagger.tight` | `split-stagger` (word/line splits), `collage-grid` (dense fragments) | Characters/words feel like one gesture |
| `stagger.loose` | `split-stagger` (character splits on short display strings), `collage-grid` (sparse fragments) | Individual elements read as distinct beats |
| `stagger.reveal` | `split-stagger` (The Correction + any kinetic landing-page reveal) | 42ms per character; line 2 starts when line 1 is 40% through. Design-specific — not a general stagger default. |

## Perf/lazy-load tier (not a DTCG motion type — a Rubato-specific gate)

`3d-extruded` and any WebGL treatment carries a non-token requirement that
doesn't fit the duration/easing/stagger schema: it must be lazy-loaded and
paused off-screen (IntersectionObserver) regardless of brand or treatment
choice. This isn't themeable — it's a hard performance floor, tracked
alongside tokens here so it isn't lost, but enforced in the Step 6
accessibility self-check, not the scoring pass.

## Brand override pattern

A brand's `brand.md` may override any value above under its own
`motion` block using the same token names — Rubato reads the brand's
values first, falling back to this file's defaults only for tokens the
brand hasn't specified. A brand that wants a punchier, less "settled"
feel might override `easing.settle` to something with more overshoot;
Rubato never assumes the values above are universal, only that the
*names* are stable across brands.

## Reduced-motion behavior (cross-reference to legibility-rules.md §5)

When `prefers-reduced-motion` is signaled, no token substitution happens —
motion is removed, not slowed. A treatment either renders its static
fallback state or, where the treatment has a meaningful non-animated form
(e.g. `axis-choreo` at its resting axis values), renders that with
`duration.instant` and no easing curve at all. This file supplies *how
fast and how expressive* motion is; it never decides *whether* motion
happens — that's `legibility-rules.md`'s job.
