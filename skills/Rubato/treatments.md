# Rubato — Treatments Catalog

Each treatment is a named entry Rubato can recommend, allow, or veto.
`legibility-rules.md` scores against these; `motion-tokens.md` supplies
the duration/easing/stagger values referenced in "motion tokens used."

Fields per treatment:
- **Implementation** — the recommended technical approach
- **Fallback** — what to degrade to when vetoed or reduced-motion fires.
  Where the fallback is `oversized-balanced-headline`, reference it by
  its exact slug (not a paraphrase) so it resolves unambiguously.
- **Motion tokens used** — which token categories apply (if any)
- **Notes** — quirks, browser gaps, brand-specific caveats

---

## radial
Text set along a circular path.
- **Implementation:** SVG `<textPath>` on a real `<path>`, `startOffset:50%`, `text-anchor: middle`, `textLength` fit
- **Fallback:** `oversized-balanced-headline`
- **Motion tokens used:** none required (static by default); optional entrance via `duration.fast` + `easing.expressive`
- **Notes:** short strings only; rotated glyphs compound legibility cost with length. Cross-browser `textLength` inheritance quirks — test in Firefox/Chrome both.

## text-on-path
Text following an arbitrary (non-circular) path.
- **Implementation:** SVG `<textPath>` for static placement; CSS `offset-path`/`offset-distance` for motion
- **Fallback:** `oversized-balanced-headline` (rendered as a static horizontal baseline)
- **Motion tokens used:** `duration.standard` region, `easing` if animated along the path
- **Notes:** `offset-path` uses fixed units — not responsive. Prefer SVG route unless motion along the path is the point.

## vertical
Vertical typesetting.
- **Implementation:** `writing-mode: vertical-rl/vertical-lr` + `text-orientation: upright/mixed` — never `transform: rotate()`
- **Fallback:** `oversized-balanced-headline` (rendered as a horizontal stack — same treatment, different axis)
- **Motion tokens used:** none required; optional axis-choreo layered on top
- **Notes:** `mixed` keeps CJK upright, rotates Latin runs; `upright` forces all upright (illegible for Latin). CJK vertical is native — treat as always-allow for CJK scripts regardless of other signals; Latin vertical is a legibility risk that must go through the full scoring pass.

## axis-choreo
Variable-font axis animation (opsz/wght/SOFT/WONK on Fraunces for display treatments; wght/wdth on Mona Sans Variable for body-scale effects).
- **Implementation:** register each axis as a typed `@property` custom property; CSS transitions/keyframes; GSAP for multi-axis sequencing
- **Fallback:** static axis values at the brand's default display setting (this is the treatment's own resting state, not a separate catalog entry)
- **Motion tokens used:** `duration.moderate`, `easing.expressive`, optionally `stagger` if per-character
- **Notes:** SOFT and WONK are Fraunces display-only axes — never animate at body sizes; WONK auto-substitutes off at opsz ≤18. For Mona Sans Variable body-scale use, keep wdth animation to hero/display scale only — at small sizes the delta is imperceptible and the rendering cost isn't justified. See `DESIGN.md §4` for the canonical font role split.

## split-stagger
Per-character/word/line entrance stagger.
- **Implementation:** GSAP SplitText (free) or Motion's `splitText`
- **Fallback:** whole-string fade/slide, no split (a reduced form of the same treatment, not `oversized-balanced-headline`)
- **Motion tokens used:** `duration.fast`, `easing.settle`, `stagger` (tight/loose)
- **Notes:** mandatory ARIA — `aria-label` on the parent with the full string, `aria-hidden="true"` on every shard. Never ship a split without this pairing.

## scroll-driven
Type choreographed to scroll position.
- **Implementation:** CSS `animation-timeline: scroll()/view()` where supported; GSAP ScrollTrigger + Lenis fallback
- **Fallback:** static final-state composition (no animation tied to scroll)
- **Motion tokens used:** `duration.instant` (the `1ms` convention — see motion-tokens.md), `easing.linear`
- **Notes:** use `overflow: clip`, not `hidden`, or the timeline breaks. Firefox gap on the CSS route — gate with `@supports`.

## background-clip-text
Image/video/gradient rendered inside type.
- **Implementation:** `background-clip: text` + `color: transparent`
- **Fallback:** solid brand color text (this is treatment-specific — not `oversized-balanced-headline`, since the type shape stays identical, only the fill changes)
- **Motion tokens used:** none required; optional slow pan/zoom on the background layer using `duration.slow`
- **Notes:** contrast fallback is mandatory — if the media behind the text can't guarantee WCAG contrast, this treatment vetoes outright regardless of other signals.

## 3d-extruded
Extruded or shader-driven 3D type.
- **Implementation:** R3F `<Text3D>` (typeface.json) for extrusion, drei/troika `<Text>` + GLSL/TSL for shader distortion
- **Fallback:** `oversized-balanced-headline` (flat, no WebGL)
- **Motion tokens used:** `duration.slow`, `easing.settle`; stagger rarely applies
- **Notes:** heaviest treatment in the catalog. Always lazy-load, always gate behind `prefers-reduced-motion` and a perf budget check (see motion-tokens.md's perf tier), never load above the fold without a static placeholder.

## marquee-ticker
Continuously scrolling text band.
- **Implementation:** Motion `Ticker` / CSS scroll / GSAP
- **Fallback:** `oversized-balanced-headline` (static single line, no loop)
- **Motion tokens used:** `duration.ambient`, `easing.linear`
- **Notes:** this is the treatment reading science scores *worst* (slower than rotated text) — reserve for genuinely decorative, non-informational strings only, and always ship a pause control.

## oversized-overlap
Paula Scher-style layered, overlapping, tight-packed display type.
- **Implementation:** CSS Grid + `text-box-trim` + negative margins + `mix-blend-mode`
- **Fallback:** stacked, non-overlapping headline at the same scale (a variant of this treatment, not `oversized-balanced-headline` — the packing changes, the theatrical scale doesn't)
- **Motion tokens used:** `duration.moderate`, `easing.expressive` on entrance if animated; otherwise static
- **Notes:** `text-box-trim` unsupported in Firefox — progressive enhancement required. This is the primary Scher/Public-Theater-energy treatment.

## collage-grid
Brutalist collage layout, type fragments tethered to a grid.
- **Implementation:** CSS Grid + anchor positioning (progressive)
- **Fallback:** single-column stacked layout
- **Motion tokens used:** `stagger.tight` or `stagger.loose` on fragment entrance, depending on density
- **Notes:** anchor positioning not yet Baseline — treat as enhancement, not default.

## oversized-balanced-headline
The universal safe fallback. Not a "theatrical" treatment — the floor every other treatment degrades to.
- **Implementation:** `text-wrap: balance`, fluid `clamp()` scale, no motion required
- **Fallback:** — (this *is* the fallback target for every other entry above)
- **Motion tokens used:** none, or minimal fade-in only (`duration.fast`, `easing.standard`)
- **Notes:** always legible, always accessible. Every recommendation pass should be able to name this as a valid `allow` even when nothing else is. Only `legibility-rules.md`'s reflow/contrast/flash gates can veto this treatment — role and length rules never apply to it.
