# Stencil + Frame: Building a State-of-the-Art Expressive Typography + Motion Engine (2025–2026)
 
## TL;DR
- **Build on a lean, mostly-free stack:** Vite + React + TS with **GSAP (100% free as of April 30, 2025, including the rewritten SplitText)** + **Motion (motion.dev, MIT)** for React-declarative motion + **React Three Fiber/drei + troika-three-text** for WebGL/3D type + **Lenis (MIT)** for scroll. Use native CSS (variable-font animation via `@property`, scroll-driven `animation-timeline`, `writing-mode`, `offset-path`, `text-wrap: balance`) as the default layer and reserve WebGL for genuinely theatrical moments.
- **Architect the engine in three layers:** (1) DTCG-format design tokens (type scale via Utopia `clamp()`, motion tokens for duration/easing/stagger) consumed from `brand.md`; (2) composable React primitives (`<KineticText treatment="radial|vertical|kinetic|3d" />`) that compile treatments to CSS/GSAP/R3F; (3) a **recommendation layer** that scores each treatment against content (word/line length, language, text role, reading level) and accessibility rules, then either recommends or vetoes it with a legible fallback.
- **Ground the recommendation engine in reading science:** rotation and vertical stacking costs are severe and quantified (Tinker 1972: +45° ≈ 52% slower, ±90° ≈ 205% slower; Yu et al. 2010: horizontal reading ~139% faster than marquee and ~81% faster than rotated), so extreme treatments must be gated to short, display-only, ideally uppercase strings, honoring `prefers-reduced-motion` and WCAG 2.3.3 — always with a legible default fallback.
## Key Findings
 
1. **GSAP is now free and is the single biggest 2025 change.** Following Webflow's October 2024 acquisition of GreenSock, GSAP 3.13 made the entire library — including formerly paid Club plugins SplitText, MorphSVG, DrawSVG, ScrollTrigger, ScrollSmoother — 100% free including commercial use. Per Webflow's official "Webflow makes GSAP 100% free" announcement, "as of April 30, 2025 Webflow made the entire GSAP package 100% FREE!" SplitText, per the same announcement, "has been completely rewritten from the ground up with exciting improvements that include a 50% reduction in file size, baked-in accessibility for screen readers, easy masking for advanced 'reveal' effects." Caveat: GSAP is *free-to-use but not open-source* (no decompiling, no building competing visual-animation tools).
2. **Native CSS now covers a large slice of "kinetic type" with zero JS.** Variable-font axes animate via `font-variation-settings` (register axes as `@property` custom properties for smooth transitions); scroll-driven animation (`animation-timeline: scroll()/view()`) is in Chrome/Edge/Safari with Firefox arriving; `text-wrap: balance/pretty`, `offset-path` (text on path), `writing-mode`/`text-orientation` (vertical type), and `background-clip: text` are production-ready. Some marquee features (`text-box-trim`, anchor positioning) are new-but-not-yet-Baseline.
3. **For WebGL/3D type, troika-three-text is the de-facto standard**, wrapped by drei's `<Text>`. It renders SDF text directly from .ttf/.woff at runtime (no offline atlas baking), handling kerning, ligatures, RTL/bidi in a web worker. This has largely superseded manual three-bmfont-text/MSDF workflows.
4. **The recommendation layer is the genuinely novel part** and has real research to draw on: rotated/vertical/circular text is measurably slower to read, optimal line "measure" is well-quantified, and WCAG gives hard accessibility constraints. Prior art in *auto-selecting* typographic treatments is thin — generative identity systems (MIT Media Lab, Munken Creator) are rule-based, not content-aware — so a content-driven recommendation engine is a defensible differentiator.
## Details
 
### 1. Latest & Greatest CSS Typography (2025–2026)
 
**Variable font animation (production-ready, and central to your Fraunces goal).** `font-variation-settings` is animatable across a continuous range, so CSS transitions/keyframes can choreograph weight/width/optical-size/slant. The modern pattern registers each axis as a typed custom property so it interpolates cleanly:
 
```css
@property --wght { syntax: "<number>"; inherits: false; initial-value: 400; }
h1 { font-variation-settings: "wght" var(--wght), "opsz" var(--opsz), "SOFT" var(--SOFT), "WONK" var(--WONK);
     transition: --wght .4s ease, --SOFT .4s ease; }
h1:hover { --wght: 800; --SOFT: 100; }
```
 
**Fraunces specifics.** Fraunces (Undercase Type; Phaedra Charles & Flavia Zimbardi; Google Fonts, 2020) has four axes: **wght** (Thin→Black), **opsz** (9→144), **SOFT** (0→100, "Sharp/Soft/SuperSoft" — controls rounded, "inky" forms), and **WONK** (0/1 binary — swaps in "wonky" leaning h/n/m and flagged ball terminals). Critically, **WONK auto-substitutes off at opsz ≤ 18** and non-linear axis mapping lives in the AVAR table. Design implication for your engine: **SOFT and WONK are display-only expressive levers** — safe to animate on oversized headlines, but the engine should disable WONK (and cap SOFT) at body sizes because Fraunces itself does.
 
**Scroll-driven animations.** `animation-timeline: scroll()` and `view()` link keyframes to scroll position with no JS, running off the main thread (performant, no scroll listeners). Available by default in Chrome/Edge (from ~Dec 2024) and Safari; Firefox behind a flag / in Nightly (a flackr/scroll-timeline polyfill exists). Convention: set `animation-duration: 1ms` for cross-browser/Firefox correctness. A newer `animation-trigger` property (scroll-*triggered* rather than scroll-*driven*) is Chrome/Edge-only as of mid-2026 (~85% caniuse). Use `overflow: clip` not `hidden` to avoid breaking scroll timelines.
 
**text-box-trim / text-box-edge (new, NOT Baseline).** Trims the half-leading above cap height and below baseline for precise vertical alignment — invaluable for Paula-Scher-style tight-packed oversized type. Supported Chrome/Edge 133+ (Feb 2025) and Safari 18.2+ (Dec 2024); **Firefox does not support it**. Use `text-box: trim-both cap alphabetic` as the 90% case, with progressive enhancement.
 
**text-wrap: balance / pretty (Baseline 2024).** `balance` equalizes line lengths on short blocks (≤6 lines Chromium, ≤10 Firefox) — ideal for headlines; `pretty` prevents orphans on body copy (Chrome/Edge/Safari; **not Firefox** as of early 2026). Both degrade gracefully. Recommended base styles: `h1–h6 { text-wrap: balance }`, `p,li,blockquote { text-wrap: pretty }`. Note `balance` doesn't shrink the box, only the wrapping — can look odd inside bordered cards.
 
**Text on paths — two routes.** (a) **SVG `<textPath href="#path">`** is the mature, well-supported route for radial/circular type, but the path must be a real `<path>` (not `<circle>`); center with `startOffset="50%"` + `text-anchor: middle`; use `getTotalLength()` + `textLength` to fit; cross-browser circular text has known quirks (Firefox/Chrome `textLength` inheritance, `side` attribute support). (b) **CSS `offset-path`/`offset-distance`** can place split characters along a `path()` but doesn't scale responsively (`path()` is fixed units) — better for motion than static radial layout.
 
**Vertical typography.** `writing-mode: vertical-rl/vertical-lr` + `text-orientation: upright/mixed` is the correct, semantic route (preserves selection, handles CJK properly) versus `transform: rotate(90deg)` (breaks flow/layout). Multilingual note: `mixed` keeps CJK upright and rotates Latin runs; `upright` forces all upright (Latin becomes hard to read). The engine should prefer writing-mode and flag Latin vertical runs as low-legibility.
 
**Other production-ready levers:** `background-clip: text` (image/video/gradient-in-text masks); `initial-letter` (drop caps); `font-palette` + COLRv1 color fonts (Chrome/Edge/Firefox; **Safari reluctant/limited**, degrades to solid color); fluid type via `clamp()`; `lh`/`cap`/`ch` units; container query typography. **CSS anchor positioning** reached all-browser availability with Firefox 145 (turned on by default ~Dec 2025) but is not yet "Baseline Newly available" — useful for tethering annotation/collage fragments.
 
### 2. React + JS Libraries (best-in-class, 2026)
 
**GSAP (free, not OSS).** The powerhouse for timeline choreography, SplitText (per-char/word/line splitting + stagger), ScrollTrigger, MorphSVG, DrawSVG, MotionPath. Best choice for complex, millisecond-precise theatrical sequences. Works everywhere (React, Vite). Since the rewrite, SplitText handles emoji/foreign characters and has native accessibility.
 
**Motion (motion.dev, MIT).** Formerly Framer Motion, now independent and framework-agnostic (vanilla + React + Vue). Declarative `<motion.div animate whileInView layout>`, springs, `AnimatePresence`, and (v12) built-in `splitText`, `ScrambleText`, `Ticker`, `AnimateNumber`. Bundle: full React feature set ~32KB; the vanilla `animate()` ~17KB vs Motion One's ~3.8KB. Best for declarative React UI motion and layout animations; pairs cleanly with GSAP (use Motion for component/UI state, GSAP for scripted timelines).
 
**React Three Fiber + drei + troika-three-text (MIT).** For WebGL/3D kinetic type. `<Text>` (drei) wraps troika (SDF from font files, no atlas baking, worker-based, kerning/ligatures/RTL). `<Text3D>` uses three's TextGeometry and needs a JSON (typeface.json) font — good for extruded 3D letterforms. Add custom GLSL/TSL shaders for distortion/displacement.
 
**Supporting libraries:**
- **Lenis (MIT, darkroom.engineering)** — smooth scroll, actively maintained (updated mid-2026), ~4KB, zero deps, first-class `lenis/react` adapter + `lenis/snap`. The current standard; pairs with GSAP ScrollTrigger.
- **SplitType (ISC, lukePeavey)** — lightweight text splitter, low recent maintenance; **largely superseded** now that GSAP SplitText is free (SplitText also handles nested HTML, which SplitType strips). Keep only if avoiding GSAP entirely.
- **opentype.js (MIT)** — parse/write TTF/OTF, extract glyph bézier paths, build/manipulate outlines; v2.0 adds variable-font + COLR/CPAL support. Use for glyph-level custom effects and generating paths for radial/stroke animation.
- **Theatre.js (core Apache-2.0; studio AGPL-3.0)** — visual timeline editor ("After Effects for the web"), integrates with R3F via `@theatre/r3f`. Note the **studio is AGPL** (dev-only, so typically fine) and 1.0 dev moved to a private repo — treat as powerful-but-lower-velocity; optional authoring tool, not a runtime dependency.
- **three-bmfont-text / MSDF** — older, dormant; maintained fork `three-msdf-text-utils` (adds WebGPU). Only needed for bespoke atlas-level shader control; otherwise troika wins.
**Recommended stack for Vite+React+TS:** CSS-first (variable fonts + scroll-driven + writing-mode + offset-path) → **Motion** for declarative React UI/layout motion → **GSAP + SplitText + ScrollTrigger + Lenis** for scripted theatrical timelines and split-text choreography → **R3F + drei/troika** for WebGL/3D showpieces → **opentype.js** for glyph-level generative effects → optional **Theatre.js** for visual authoring.
 
**Library comparison table**
 
| Library | Role | License | Bundle (approx) | Maintenance 2026 |
|---|---|---|---|---|
| GSAP 3.13+ (+SplitText/ScrollTrigger) | Scripted timelines, split-text, scroll | Free-to-use, **not OSS** | Core ~23KB + plugins | Active (Webflow-backed) |
| Motion (motion.dev) | Declarative React/UI + layout motion | MIT | ~32KB React / ~17KB vanilla `animate()` | Very active (Framer-sponsored) |
| React Three Fiber | WebGL renderer for React | MIT | Peer w/ three.js | Very active (pmndrs) |
| @react-three/drei (`Text`,`Text3D`) | R3F helpers/text | MIT | Tree-shakeable | Very active |
| troika-three-text | SDF text from font files | MIT | Moderate + worker | Active |
| Lenis | Smooth scroll | MIT | ~4KB | Active (darkroom.engineering) |
| SplitType | Text splitting | ISC | Small (~115KB unpacked pkg) | Low / superseded |
| opentype.js | Glyph parsing/outlines | MIT | Moderate | Active (v2.0) |
| Theatre.js | Visual motion editor | Core Apache-2.0 / studio AGPL-3.0 | Studio dev-only | Slower / private 1.0 dev |
| three-bmfont-text | Manual MSDF text | MIT | Small | Dormant (use fork/troika) |
 
### 3. Techniques Catalog → Implementation Approaches
 
| Technique | Recommended approach | Fallback / notes |
|---|---|---|
| Radial/circular type | SVG `<textPath>` on a real `<path>`, `startOffset:50%`, `textLength` fit | Short strings only; rotated glyphs hurt legibility |
| Text on arbitrary path | SVG `<textPath>` (static) / CSS `offset-path` (motion) | offset-path not responsive (fixed units) |
| Vertical type | `writing-mode` + `text-orientation` | Avoid `rotate()`; flag Latin vertical as low-legibility |
| Image/video-in-text | `background-clip: text` + `color: transparent` | Ensure contrast fallback; provide solid-color fallback |
| Variable-axis choreography | `@property` axes + CSS transitions; GSAP for sequencing | Fraunces: SOFT/WONK display-only; WONK off ≤18px |
| Per-char/word/line stagger | GSAP SplitText (free) or Motion `splitText` | **Add `aria-label` on parent, `aria-hidden` on shards** |
| Scroll-driven kinetic type | CSS `animation-timeline` (view/scroll) | JS (GSAP ScrollTrigger + Lenis) where CSS unsupported |
| 3D extruded/shader text | R3F `<Text3D>` (JSON font) / `<Text>` (troika) + GLSL/TSL | Heavy; gate behind reduced-motion + perf budget |
| Distortion/displacement | Shader on troika/`<Text>` material, render-to-texture | Codrops patterns (kinetic typo, text destruction TSL) |
| Marquee/ticker | Motion `Ticker` / CSS scroll / GSAP | Respect `prefers-reduced-motion`; provide pause |
| Oversized overlap/layering (Scher) | CSS grid + `text-box-trim` + negative margins + `mix-blend-mode` | text-box-trim not in Firefox |
| Collage/brutalist grid | CSS Grid + anchor positioning (progressive) | Anchor positioning not yet Baseline |
 
**Accessibility for split text (mandatory in the engine):** wrap the readable string with `aria-label="…"` and mark the per-character/word spans `aria-hidden="true"`, so screen readers announce the word once, not letter-by-letter. GSAP's rewritten SplitText includes screen-reader support. Gate all non-essential motion behind `@media (prefers-reduced-motion: reduce)` and JS `matchMedia`.
 
### 4. Typography Design System Architecture
 
**Tokens (DTCG format, `.tokens.json`).** Per the W3C Design Tokens Community Group announcement (Oct 28, 2025), "The Design Tokens Community Group today announced the first stable version of the Design Tokens Specification (2025.10)," with recommended file extensions `.tokens`/`.tokens.json` and media type `application/design-tokens+json`. It includes a **composite `typography` type** (bundles fontFamily/fontSize/fontWeight/lineHeight) and composite `transition` (duration + cubic-bezier). Store type, motion, and treatment tokens here so one `brand.md`/tokens file fans out to CSS/Style Dictionary/Figma. Use the typography composite (not flat primitives) so tools recognize related values.
 
```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "font": { "family": { "$type":"fontFamily",
    "display": {"$value":["Fraunces","Big Shoulders Display","serif"]},
    "sans": {"$value":["DM Sans","system-ui","sans-serif"]},
    "mono": {"$value":["DM Mono","monospace"]} } },
  "typography": { "$type":"typography",
    "heading-xl": { "$value": {"fontFamily":"{font.family.display}","fontSize":"{scale.step-5}","fontWeight":700,"lineHeight":1.05} } },
  "motion": {
    "duration": {"$type":"duration","fast":{"$value":"200ms"},"slow":{"$value":"800ms"}},
    "easing": {"$type":"cubicBezier","expressive":{"$value":[0.2,0.8,0.2,1]}},
    "stagger": {"$type":"number","tight":{"$value":0.02},"loose":{"$value":0.08}} }
}
```
 
**Fluid type scale (Utopia approach).** Generate `clamp()` steps interpolating between two viewport poles (e.g., 360→1240px) — one set of `--step-*` custom properties, referenced semantically. Mix `rem` + `vi` (not raw `vw`) so browser zoom still scales text (accessibility). This replaces breakpoint-driven sizing entirely.
 
**React primitives (composable treatments).** Expose semantic components whose "treatment" prop selects an expressive preset that the engine compiles to the right backend:
 
```tsx
<KineticText treatment="radial"   as="h2">Public</KineticText>
<KineticText treatment="vertical" reducedMotionFallback="stack">NOISE</KineticText>
<KineticText treatment="axis-choreo" axes={{wght:[100,800],SOFT:[0,100]}} />
<KineticText treatment="3d" shader="displace" />
```
 
Under the hood a `resolveTreatment()` function maps `treatment` → renderer (CSS class / GSAP timeline / R3F scene) and reads motion tokens for duration/easing/stagger. Motion presets are themselves tokenized so brands share a motion language.
 
**Multi-brand theming.** Each brand supplies a `brand.md` + tokens file; the engine loads tokens as CSS custom properties at a theme root (`[data-brand="…"]`), and the same primitives re-skin automatically. Because tokens are DTCG, they also round-trip to Figma/Style Dictionary.
 
### 5. Recommendation Engine / Legibility Rule Set
 
This is the defensible core. Encode reading science as scoring rules that gate treatments by content signals.
 
**Reading-science evidence (citable):**
- **Rotation is expensive.** Per Tinker (1972), "Effect of angular alignment upon readability of print," as summarized in the University of Toronto study (Wu & Balakrishnan, ECSCW 2005): "text rotated at 45° in either direction was, on average, 52% slower than reading normally oriented text, and text rotated at 90° in either direction was 205% slower on average." No significant CW vs CCW difference (so book-spine text direction is a wash).
- **Vertical/marquee worse than rotated.** Quantified by Yu et al. (2010), "Comparing reading speed for horizontal and vertical English text": "On average, reading speed for horizontal text was 139% faster than marquee text and 81% faster than the rotated texts." Byrne similarly found the ordering marquee (stacked letters) < rotated < horizontal, and that rotated is preferable to marquee when vertical is required.
- **Circular arrays are worst.** Ktori & Grainger: horizontal arrays beat vertical and circular for visual short-term memory; a Nature *Scientific Reports* 2023 study confirms horizontal > vertical for speed, comprehension, and lower cognitive load, especially for long text.
- **Line length ("measure").** Robert Bringhurst, *The Elements of Typographic Style* (p. 26): "Anything from 45 to 75 characters is widely regarded as a satisfactory length of line… The 66-character line (counting both letters and spaces) is widely regarded as ideal. For multiple column work, a better average is 40 to 50 characters." Butterick's *Practical Typography* gives a wider 45–90; Ruder/Baymard tighten to a practical 50–75; WCAG AAA caps at 80 (40 for CJK).
**Encodable rules (content signals → verdict):**
 
| Signal | Rule |
|---|---|
| Text role | Only `display`/`heading` roles eligible for extreme treatments; `body` always legible-default |
| String length | Radial/circular: ≤ ~1–2 short words (≤ ~12 chars). Vertical: ≤ ~1 short word or acronym. Extreme axis-choreo: headline only |
| Word length | Prefer short words for radial (per-glyph rotation compounds with length) |
| Case | Radial/vertical favor UPPERCASE (larger, uniform height; better at small angular sizes) |
| Language/script | Latin vertical `upright` = veto (illegible); CJK vertical = allowed (native). RTL → ensure troika/bidi path |
| Reading level / audience | Lower reading level or high-accessibility context → down-rank expressive treatments |
| Line length | Body measure must land 45–75 chars; veto layouts forcing <35 or >90 |
| Motion | If `prefers-reduced-motion`, auto-swap kinetic → static composition; never autoplay >5s without pause |
| Contrast/context | Enforce WCAG contrast on image/video-in-text; require solid fallback |
 
**Output contract.** For each candidate treatment the engine returns `{verdict: recommend|allow|veto, score, reasons[], fallback}`. Example: content `"The Public Theater 2025/26 Season Subscriptions Now Available"` → radial = **veto** (too long, sentence case, body-ish) with fallback to oversized balanced headline; content `"NOISE"` → radial/vertical = **recommend** (short, uppercase, display).
 
**WCAG constraints baked in:** 2.3.3 (Animation from Interactions — disable non-essential motion, honor `prefers-reduced-motion`), 2.2.2 (Pause/Stop/Hide for >5s autoplay), 2.3.1 (≤3 flashes/sec), reflow, and contrast. Reduced-motion should degrade gracefully (swap motion for a strong static composition), not strip meaning.
 
**Prior art (and the gap).** Generative identity systems exist — the **2011 MIT Media Lab 25th-anniversary identity** by Richard The and E. Roon Kang, which (per *Fast Company*) "had a custom algorithm that coughed out over 40,000 permutations of the logo," and the 2014 Pentagram rebrand (Michael Bierut & Aron Fay) that reused the same 7×7 grid across 23 research-group glyphs; plus **Munken Creator**, Patrik Hübner's data-driven identities, and dynamic logos via Lottie/Rive/variable fonts — but they are **rule/data-based, not content-legibility-aware**. Font-pairing tools (Fontjoy) and IBM's motion guidelines address adjacent problems. **No widely-known system auto-selects expressive typographic treatments by scoring content against readability trade-offs**, which is exactly the whitespace Stencil + Frame can own.
 
### 6. Inspiration / Prior Art
 
- **Paula Scher / The Public Theater (1994–present, Pentagram).** The canonical reference: wood-type revival, "extremely loud, visible, urban" street-typography energy, unorthodox spacing, mixed weights/colors, dense information made dynamic, emphasis on the word "PUBLIC." Design principles to translate: *typography is alive / has cultural weight*; *make it bigger*; layered, overlapping, skewed bands of type on flat bold color (Knockout font; 1995 "Bring in 'da Noise" campaign). Her map paintings = word-dense collage. These map directly to oversized overlap, `text-box-trim` tight packing, `mix-blend-mode`, and grid collage.
- **Codrops tutorials (technical write-ups):** "Kinetic Typography with Three.js," "How to Create Responsive & SEO-friendly WebGL Text" (2025), "Interactive Text Destruction with Three.js, WebGPU & TSL" (2025), "3D Typing Effects," "Coding a Kinetic SVG Typography Animation," plus open-source repos (codrops/KineticTypePageTransition, marioecg/codrops-kinetic-typo).
- **Variable-font-driven brand systems:** Google Fonts knowledge base; Dinamo's "Using Variable Fonts on the Web" (perf tip: pause animation off-screen via IntersectionObserver); v-fonts.com, wakamaifondue.com, fontgauntlet.com for axis inspection.
- **Dynamic identity references:** MIT Media Lab, MTV, Munken Creator, Patrik Hübner.
## Recommendations
 
**Stage 1 — Foundations (weeks 1–3).** Ship the token layer + fluid scale + semantic components. Define `brand.md` → DTCG `.tokens.json` (2025.10) → CSS custom properties via Style Dictionary. Build Utopia `clamp()` scale (rem+vi). Base styles: `text-wrap: balance` on headings, `pretty` on body, `prefers-reduced-motion` reset. No motion yet — prove the multi-brand theming pipeline first. *Threshold to proceed:* two brands render correctly from tokens alone.
 
**Stage 2 — CSS-native expressive layer (weeks 3–6).** Implement `<KineticText>` with CSS-only treatments: variable-axis choreography (`@property` + Fraunces wght/opsz/SOFT/WONK), vertical (`writing-mode`), radial (SVG `<textPath>`), scroll-driven (`animation-timeline`), background-clip masks. This is high-impact, low-bundle, and accessible by default. *Threshold:* Lighthouse/perf unaffected; all treatments have reduced-motion fallbacks. *(Note 2026-07-06: Fraunces migrated to Mona Sans Variable; axis choreography now uses wght/wdth on Mona Sans. SOFT/WONK axes no longer in the S+F stack. Principle — and the implementation approach via `@property` — is unchanged.)*
 
**Stage 3 — Scripted + WebGL motion (weeks 6–10).** Add GSAP (SplitText + ScrollTrigger) + Lenis for theatrical timelines; add R3F + drei/troika for 3D/shader showpieces behind lazy-loading + perf/reduced-motion gates. Use Motion for declarative UI transitions. *Threshold:* WebGL scenes lazy-load and never block; bundle stays reasonable via code-splitting.
 
**Stage 4 — Recommendation engine (weeks 8–14, overlap).** Implement `resolveTreatment()` scoring: content signals (length, word length, case, language, role, reading level) × treatment constraints × WCAG gates → `{verdict, score, reasons, fallback}`. Start rule-based with the thresholds in §5; expose reasons in the UI so designers learn the trade-offs. *Threshold:* engine correctly vetoes long/body strings from extreme treatments and always yields a legible fallback.
 
**Cross-cutting:**
- Treat **GSAP as free-but-not-OSS** — fine for a product, but if Stencil + Frame ever exposes a *visual* animation builder, review the license clause prohibiting competing visual-animation tools.
- Keep **Theatre.js studio (AGPL) dev-only**; ship only `@theatre/core` (Apache-2.0) at runtime if used.
- **Progressive enhancement everywhere:** `@supports` for text-box-trim, scroll-driven, anchor positioning; polyfill scroll-timeline where needed.
- Pause off-screen variable-font/WebGL animation (IntersectionObserver) to avoid device heat/jank.
**Benchmarks that would change the plan:** if Firefox ships `text-box-trim` and `text-wrap: pretty`, promote them from progressive-enhancement to default; if scroll-driven animations reach full Baseline, drop the GSAP ScrollTrigger fallback for simple cases; if a content-aware treatment-recommendation competitor emerges, accelerate Stage 4 as the differentiator.
 
## Caveats
- **Not-yet-Baseline features:** `text-box-trim`/`text-box-edge` (no Firefox), `text-wrap: pretty` (no Firefox as of early 2026), CSS anchor positioning (all-browser but not "Baseline Newly available" until Firefox 145 settles), `animation-trigger` (Chrome/Edge only), COLRv1/`font-palette` (Safari limited). Gate all with `@supports`.
- **GSAP licensing nuance:** free and commercial-use-permitted, but proprietary (not open-source); the license forbids using GSAP to build competing visual animation builders — relevant if Frame productizes a no-code motion editor.
- **Vendor/marketing claims flagged:** GSAP's "20× faster than jQuery / 8× more performant than CSS / 11M sites" figures come from GreenSock/agency marketing, not independent benchmarks. Motion One vs Framer Motion bundle sizes are from the library author's own posts.
- **Reading-science limits:** Tinker (1972), Byrne, and Yu et al. (2010) studies are Latin-script, lab reading-speed tasks; they justify *gating* extreme treatments for display use but shouldn't be over-generalized to all scripts/contexts. CJK vertical text is native and legible — the engine must branch on script.
- **Bringhurst 66-cpl / 45–75 figure** is quoted from *The Elements of Typographic Style* (p. 26); other sources (Butterick 45–90; Ruder/Baymard 50–75) differ slightly. SplitType's "~115 kB" is npm unpacked package size, not a gzipped runtime bundle.
- **Theatre.js velocity risk:** 1.0 development moved to a private repo and community/docs are still maturing; treat as an optional authoring tool, not core infrastructure.
- **Prior-art claim** ("no widely-known content-aware treatment recommender") reflects available search evidence; absence of a competitor isn't proof one doesn't exist — validate before marketing it as a first.