\# judged-surfaces.md

> Coda engine · reference file 01

> Every surface an award jury scores — including the ones nobody designs.

> Each surface: what it is, what winners do, the Stencil + Frame treatment, and a checkable pass condition.

> Rule format follows the copywriting engine: rules must be checkable, not adjectives.



\---



\## How to use this file



Work one surface at a time. A surface is DONE when its pass condition is met and the

treatment traces to `brand.md` (positioning line or voice rule cited in the commit message).

No surface may ship in default browser/framework state.



Priority tiers:

\- \*\*P0\*\* — scored directly by juries or seen by every visitor

\- \*\*P1\*\* — scored on inspection, seen by many

\- \*\*P2\*\* — differentiators; do after P0/P1 are sealed



\---



\## P0 — Every visitor, every jury



\### 01 · Preloader / first paint

\- \*\*What winners do:\*\* Loading is a designed beat, not a spinner. Often the first

&#x20; brand impression. Awwwards ranks loading pages as a category.

\- \*\*S+F treatment:\*\* No spinner. The Correction moment IS the loader — the generic

&#x20; headline types while assets load behind it; the strike-through fires when ready.

&#x20; Loading becomes dramaturgy.

\- \*\*Pass:\*\* Zero default spinners. Perceived wait < 1.5s on Fast 3G throttle.

&#x20; If assets load instantly, the beat still plays (minimum duration floor, \~2s).



\### 02 · Hero / signature moment

\- \*\*What winners do:\*\* One unforgettable interaction, not twenty effects.

\- \*\*S+F treatment:\*\* The Correction (Register C × D) + Rubato scroll-velocity

&#x20; variable-font behavior. Already specced.

\- \*\*Pass:\*\* The moment completes in ≤ 5s without user input. Plays correctly with

&#x20; `prefers-reduced-motion` (static crossed-out version shown, no animation).

\- \*\*Implementation spec:\*\* `DESIGN.md §6` (kinetic reveal timing, stagger.reveal token, GSAP setup).



\### 03 · Scroll narrative

\- \*\*What winners do:\*\* Page reads as an arc, content reveals as progression, not a feature list.

\- \*\*S+F treatment:\*\* Problem (AI slop) → Thesis (positioning precedes everything)

&#x20; → Proof (live audit trail fragment) → Invitation (waitlist).

\- \*\*Pass:\*\* Each scroll section answers exactly one question. Reading the section

&#x20; headlines alone, in order, tells the complete story.



\### 04 · Links \& buttons

\- \*\*What winners do:\*\* No default underline-on-hover. Acknowledgment on press.

&#x20; Nothing accidental.

\- \*\*S+F treatment:\*\* Underline draws in like a graphite stroke (left→right,

&#x20; `background-size` or SVG). Buttons compress 1–2px on press with instant release.

&#x20; Gold `#c8a96e` only on interactive elements — color as affordance.

\- \*\*Pass:\*\* Every interactive element has distinct :hover, :active, :focus-visible

&#x20; states. Zero browser-default focus rings; custom ring meets 3:1 contrast.



\### 05 · Cursor

\- \*\*What winners do:\*\* Custom cursor when it has a reason; default when it doesn't.

&#x20; Gratuitous cursors lose points.

\- \*\*S+F treatment:\*\* Default cursor everywhere EXCEPT over the Rubato headline,

&#x20; where it becomes a small crosshair/registration mark (construction-line language).

&#x20; Reason: the cursor becomes a drafting tool over the drafted object.

\- \*\*Pass:\*\* Custom cursor appears on ≤ 2 element types. Touch devices unaffected.

&#x20; No cursor lag (transform, not top/left).



\### 06 · Typography floor

\- \*\*What winners do:\*\* Oversized type with flawless fallback behavior.

\- \*\*S+F treatment:\*\* Mona Sans Variable with size-adjusted system fallback

&#x20; (`font-display: swap` + metric overrides so the Correction doesn't reflow).

&#x20; Axis presets from `design/tokens.json` — typography.display (wght 800, wdth 125) for

&#x20; the hero; typography.body (wght 400, wdth 100) elsewhere. Fluid scale (Utopia-style)

&#x20; already in Rubato research.

\- \*\*Pass:\*\* Zero layout shift on font load (CLS < 0.02). Headline legible at 320px

&#x20; viewport. No orphan on the thesis line (`text-wrap: balance`).



\---



\## P1 — Scored on inspection



\### 07 · 404 page

\- \*\*What winners do:\*\* Awwwards ranks 404s. Winners make it a brand moment.

\- \*\*S+F treatment:\*\* A brand.md parse error, rendered in DM Mono:

&#x20; `ERROR: positioning not found at this route` + a graphite correction pointing home.

&#x20; The audit-trail thesis, played as a joke.

\- \*\*Pass:\*\* Custom 404 exists, loads < 1s, links back to home and waitlist.



\### 08 · Empty \& error states (forms)

\- \*\*What winners do:\*\* Errors written in brand voice, inline, never alert boxes.

\- \*\*S+F treatment:\*\* Waitlist form errors as proof-mark annotations beside the field

&#x20; (Register C). Copy passes the copywriting engine's Voice Do's.

\- \*\*Pass:\*\* Every input has designed error + success + disabled states. Error copy

&#x20; contains zero words from the buzzword blocklist. No browser-default validation popups.



\### 09 · Section transitions

\- \*\*What winners do:\*\* Content enters with intention; restraint over spectacle.

&#x20; Full complexity is never rendered all at once.

\- \*\*S+F treatment:\*\* One entrance pattern site-wide (e.g., 12px rise + fade, 0.6s,

&#x20; single ease token from motion-tokens.md). Repetition = coherence. The ONLY

&#x20; exception is the signature moment.

\- \*\*Pass:\*\* Exactly one entrance animation token used across all sections.

&#x20; All animations ≤ 60fps on a mid-range Android (test: Moto G-class, CPU 4x throttle).



\### 10 · Reduced motion

\- \*\*What winners do:\*\* Honor it. For S+F this is also a values statement.

\- \*\*S+F treatment:\*\* `prefers-reduced-motion` swaps every animation for its final

&#x20; frame; the Correction shows its static struck-through state (the proof mark

&#x20; remains — the meaning survives without the motion).

\- \*\*Pass:\*\* With reduced-motion enabled, zero elements animate; all content and

&#x20; meaning fully present.



\### 11 · Meta layer

\- \*\*What winners do:\*\* Considered title, OG image, favicon — juries share links.

\- \*\*S+F treatment:\*\* OG image = the struck-through headline (static Correction).

&#x20; Favicon = coral `#e8673a` mark. Title in brand voice, not SEO soup.

\- \*\*Pass:\*\* OG image renders correctly in a link-preview test. Favicon present at

&#x20; all sizes incl. dark-mode variant.



\---



\## P2 — Differentiators



\### 12 · Sound (opt-in)

\- \*\*What winners do:\*\* Rare, and almost never with a reason — which is the opening.

\- \*\*S+F treatment:\*\* One sound, on the Correction strike-through: a single graphite

&#x20; stroke sample from the sonic identity system. Muted by default, small designed

&#x20; toggle. Never autoplay.

\- \*\*Pass:\*\* Sound plays only after explicit opt-in. Toggle state persists in-session.



\### 13 · Margin annotations (The Trace, reduced)

\- \*\*What winners do:\*\* Reward curiosity without demanding attention.

\- \*\*S+F treatment:\*\* 2–3 brand.md fragments max, DM Mono, appearing beside the

&#x20; claims they source. Seasoning, not system.

\- \*\*Pass:\*\* ≤ 3 annotations total. Hidden below 768px (mobile shows none — parity

&#x20; by subtraction, not cramming).



\### 14 · Selection \& scrollbar

\- \*\*What winners do:\*\* Style `::selection`; consider the scrollbar.

\- \*\*S+F treatment:\*\* Selection = gold on near-black inverted. Scrollbar: leave

&#x20; native (an honesty choice — document it as intentional in the audit trail).

\- \*\*Pass:\*\* `::selection` styled. Decision on scrollbar recorded, not defaulted.



\---



\## Floor gates (hard pass/fail — no surface ships if these fail)



| Gate | Threshold |

|---|---|

| Lighthouse Performance (mobile) | ≥ 90 |

| Lighthouse Accessibility | ≥ 95 |

| CLS | < 0.02 |

| LCP (Fast 3G, mid-range device) | < 2.5s |

| Total JS on landing page | < 150KB gzipped (no Three.js — parity by omission) |

| Keyboard-only pass | Every interactive element reachable and operable |

| Contrast | All text ≥ 4.5:1 (gold-on-dark: verify `#c8a96e` on `#080f0a` — it passes at \~7.9:1) |

| Semantics | One `<h1>`, landmark regions, valid HTML |



\---



\## Audit trail requirement (un-silenceable)



Every surface's commit/PR must state:

1\. Which brand.md line the treatment traces to

2\. Which pass condition was verified, and how

3\. Any gate that failed and why it shipped anyway (visible, never silent)



\---



\## Known gaps (v0)

\- `detail-patterns.md` not yet written — surfaces 04/09 reference tokens that

&#x20; don't exist yet; treatments above are provisional until motion-tokens.md lands

\- Submission-craft surfaces (presentation shots, category choice) deferred to

&#x20; `submission-craft.md`

\- No dark/light mode surface — S+F is single-scheme by design; record as decision

