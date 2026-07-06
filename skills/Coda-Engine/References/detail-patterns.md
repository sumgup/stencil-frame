# detail-patterns.md
> Coda engine · reference file 03
> The micro-interaction library. Loaded at Step 3. Every pattern: what it is,
> when to use it, brand.md trace, implementation note, and performance cost.
> Coda applies these; it never invents new ones mid-pass. A needed-but-missing
> pattern is a declared gap that comes back here as a new entry first.

---

## Cost legend
- **FREE** — compositor-only (transform/opacity), no layout, no JS per frame
- **CHEAP** — small JS on event, no per-frame work
- **BUDGETED** — per-frame JS or paint; must appear in the perf gate recording

## Global tokens (single source — mirror in motion-tokens.md when Rubato Stage 2 lands)
```css
--ease-out:   cubic-bezier(0.22, 1, 0.36, 1);   /* arrivals */
--ease-in-out:cubic-bezier(0.65, 0, 0.35, 1);   /* state changes */
--t-fast: 150ms;  /* acknowledgments */
--t-base: 300ms;  /* state changes */
--t-slow: 600ms;  /* entrances */
```
Rule: three durations, two eases, site-wide. A new duration requires a written reason.

---

## P-01 · Graphite underline (links)
- **Use:** every inline text link
- **Trace:** craft-as-evidence — marks are drawn, not toggled
- **How:** `background-image: linear-gradient` sized 0%→100% on hover,
  `background-position: left`, `--t-base` `--ease-out`. Draws left→right like a stroke
- **Cost:** FREE

## P-02 · Press acknowledgment (buttons)
- **Use:** all buttons incl. waitlist submit
- **Trace:** "nothing accidental" — every input is answered
- **How:** `:active { transform: translateY(1px) scale(0.995) }`, `--t-fast`;
  release springs back instantly (no transition on release)
- **Cost:** FREE

## P-03 · Focus ring, drafted
- **Use:** all interactive elements, keyboard focus only
- **Trace:** construction-line language; accessibility as values
- **How:** `:focus-visible { outline: 1.5px solid var(--gold); outline-offset: 3px }`
  — offset ring reads as a registration mark. Never remove without replacement
- **Cost:** FREE

## P-04 · Section entrance (the one and only)
- **Use:** every section below the fold; the ONLY entrance pattern on the site
- **Trace:** restraint — repetition is coherence; spectacle belongs to the signature moment alone
- **How:** IntersectionObserver adds a class: `opacity 0→1`, `translateY(12px)→0`,
  `--t-slow` `--ease-out`, `once: true`. Children may stagger ≤ 80ms, max 4 items
- **Cost:** CHEAP

## P-05 · The strike-through (signature moment only)
- **Use:** hero Correction. NOWHERE else — scarcity is what makes it signature
- **Trace:** the audit-trail thesis performed; corrections left visible
- **How:** SVG path over the generic headline, `stroke-dashoffset` animated
  `--t-slow`; real headline enters via SplitText chars, 42ms/char (existing kinetic
  reveal spec); struck version stays at 22% opacity (existing settle token)
- **Cost:** BUDGETED (one-time, ≤ 2s window)

## P-06 · Rubato axes (sustained hero behavior)
- **Use:** hero headline only while in viewport
- **Trace:** slowness produces the human quality — reader tempo reshapes the letterforms
- **How:** Lenis velocity → clamp → CSS vars for SOFT/WONK/opsz via `@property`;
  lerp toward target each frame; kill the rAF loop when hero leaves viewport
- **Cost:** BUDGETED (the page's one per-frame job; nothing else may run per-frame)

## P-07 · Proof-mark form feedback
- **Use:** waitlist input validation
- **Trace:** Register C annotations; errors in brand voice
- **How:** inline `<span role="alert">` beside field, DM Mono, gold; enters with
  P-04's motion at `--t-base`. Success = a small drawn check (SVG stroke, P-05's
  technique at 1/10 scale). No browser default popups (`novalidate` + JS)
- **Cost:** CHEAP

## P-08 · Cursor registration mark
- **Use:** over hero headline only (≤ 2 element types, per judged-surfaces 05)
- **Trace:** the cursor becomes a drafting tool over the drafted object
- **How:** `cursor: none` scoped to hero; small crosshair div follows via
  `transform` + lerp inside P-06's existing rAF (no second loop). Touch: untouched
- **Cost:** BUDGETED (piggybacks P-06's loop — no added frame cost)

## P-09 · Selection ink
- **Use:** site-wide
- **Trace:** even the unowned states are owned
- **How:** `::selection { background: var(--gold); color: var(--bg) }`
- **Cost:** FREE

## P-10 · Margin annotation reveal
- **Use:** the ≤ 3 brand.md fragments (judged-surfaces 13)
- **Trace:** audit trail as seasoning
- **How:** static in DOM, revealed with P-04's observer; DM Mono, 22% → 100%
  opacity on section focus. `display: none` < 768px
- **Cost:** FREE

## P-11 · Sound stroke (opt-in)
- **Use:** Correction strike-through only, after explicit toggle
- **Trace:** sonic identity system; sound with a reason
- **How:** single short sample (< 30KB, lazy-loaded on toggle), Web Audio,
  played once per Correction replay. Toggle state in `sessionStorage`
- **Cost:** CHEAP (zero until opted in)

---

## Anti-patterns (Coda flags these on sight)
- A second entrance style anywhere (dilutes P-04's coherence)
- Hover effects on non-interactive elements (false affordance)
- Parallax on content text (legibility tax, motion-sickness risk)
- Animating `top/left/width/height/box-shadow` (layout/paint per frame)
- Any per-frame loop besides P-06's single rAF
- Custom scrollbar styling (documented native-scrollbar decision, judged-surfaces 14)
- Skeleton screens (we have the Correction beat; skeletons are someone else's brand)

## Known gaps (v0)
- Tokens here are provisional until Rubato's motion-tokens.md is written — that
  file becomes the source of truth and this one references it
- No pattern yet for in-product Stencil session surfaces (this file is landing-page
  scoped; session patterns follow ART_DIRECTION_SKILL.md's recessive placement map)
