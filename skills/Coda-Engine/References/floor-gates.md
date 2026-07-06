# floor-gates.md
> Coda engine · reference file 02
> Hard pass/fail thresholds. Loaded at Step 4. A gate reports a measured number
> or it hasn't been run. "Looks fine" is not a measurement.

---

## How to run the gates

All gates measured on the production build (`npm run build` + `npm run preview`
or deployed URL), never dev server. Record: gate, measured value, pass/fail,
date, device/throttle used. Paste into the Coda audit block.

---

## Gate 1 — Performance

| Metric | Threshold | How to measure |
|---|---|---|
| Lighthouse Performance (mobile) | ≥ 90 | Chrome DevTools > Lighthouse, Mobile preset, production build |
| LCP | < 2.5s | Lighthouse, Fast 3G + 4x CPU throttle |
| CLS | < 0.02 | Lighthouse + manual scroll-through with Performance panel Layout Shift regions on |
| INP | < 200ms | Lighthouse / web-vitals library in console |
| Total JS (gzipped) | < 150KB | `npx vite-bundle-visualizer` or build output sizes |
| Total font payload | < 300KB | Network panel, filter Font. Fraunces variable subsetted (latin only), DM Mono subsetted |
| Animation frame rate | 60fps sustained | Performance panel recording while scrolling full page, 4x CPU throttle. No long tasks > 50ms during scroll |

**Standing rule:** no Three.js / R3F on the landing page. Parity by omission.
If a future page needs WebGL, it gets its own budget line here first.

## Gate 2 — Accessibility

| Check | Threshold | How to measure |
|---|---|---|
| Lighthouse Accessibility | ≥ 95 | Lighthouse, mobile preset |
| Contrast | All text ≥ 4.5:1; UI/focus indicators ≥ 3:1 | DevTools contrast checker per color pair. Known-good: `#c8a96e` on `#080f0a` ≈ 7.9:1, `#f0ede6` on `#080f0a` ≈ 15:1 |
| Keyboard-only | Every interactive element reachable, operable, visible focus | Unplug the mouse. Tab through the whole page. No traps, logical order |
| Screen reader smoke test | Page makes sense headlines-first | NVDA (free, Windows): navigate by headings (H key), then by landmarks (D key) |
| Reduced motion | Zero animation when `prefers-reduced-motion: reduce` | Windows: Settings > Accessibility > Visual effects > Animation effects OFF, or DevTools Rendering panel emulation. Correction shows static struck-through state |
| Touch targets | ≥ 44×44px | Measure waitlist input, submit, sound toggle, nav links |

## Gate 3 — Semantics & meta

| Check | Threshold |
|---|---|
| Exactly one `<h1>` | The corrected headline (the real one, not the struck generic) |
| Landmarks | `header`, `main`, `footer`; sections labelled |
| Valid HTML | Zero errors on validator.w3.org |
| Heading order | No skipped levels (h1 → h2 → h3) |
| OG/meta | title, description, og:image (struck-through headline render), og:url, twitter:card. Test with a link-preview tool |
| Favicon | .ico + SVG + apple-touch-icon; dark-mode variant |

## Gate 4 — Cross-device parity

| Check | Protocol |
|---|---|
| 320px viewport | No horizontal scroll, headline legible, Correction plays |
| Mid-range Android | Real device or Moto G Power profile, 4x throttle: signature moment smooth, no jank |
| iOS Safari | Rubato axes animate (verify `@property` support fallback — Safari 16.4+; below that, static axes, no breakage) |
| Desktop 1440 + ultrawide | Monument type doesn't exceed comfortable measure; max-width capped |
| Margin annotations | Confirmed hidden < 768px |

## Gate 5 — Content

| Check | Protocol |
|---|---|
| Copy audit trail | Every headline/CTA traces to a copywriting-engine run with its self-check attached |
| Buzzword blocklist | Zero hits across all page copy |
| Zero lorem/placeholder | Grep the build for "lorem", "TODO", "placeholder" |
| Caps rule | Human voice lowercase, UI chrome uppercase — visual sweep |

---

## Failure protocol

A failing gate = HOLD verdict. Only exception: failure explicitly accepted in
the audit trail with (a) the measured value, (b) why it ships anyway, (c) the
issue filed to fix it. Silent failures are the one unforgivable state.

## Known gaps (v0)
- No CI wiring (Lighthouse CI, axe-core in Playwright) — manual protocol for now; automate when product code begins Week 8
- No real-device lab — Moto G-class emulation is the proxy; borrow a real mid-range Android before submission
