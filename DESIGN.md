# Stencil + Frame — Design System Brief

*Positioning is the hero. Every visual decision below traces back to the
positioning in `brand.md` — this file is the visual layer of that same
document, not a separate creative brief.*

---

## 1. Brand context

**What it is** — Stencil + Frame is an open-source, AI-agnostic brand engine.
Stencil runs a guided, interrogative brand-discovery session and produces a
machine-readable `brand.md`. Frame consumes that file to generate on-voice
content. The differentiator is auditability: every asset traces back to
positioning.

**The belief shift** — from "a brand tool should be fast and give me an
answer" to "a brand tool should be slow enough to make me find the true
answer myself."

**Audience** — solo and early-stage founders who have a real reason to exist
but haven't been forced to articulate it, and are one Canva template away
from a brand that looks fine and means nothing.

**This page dogfoods the product.** The copywriting engine that generates
Stencil + Frame's own landing page copy is aimed at Stencil + Frame itself —
the site is proof-of-work, not just marketing.

---

## 2. Voice (governs every word on the page)

- State the claim plainly. No hedging, no "we believe," no "sort of."
- Undercut decoration by naming it specifically — "boxes in nice fonts," not
  "superficial branding."
- Admit uncertainty inside a confident sentence (the self-implicating move) —
  used sparingly.
- One image/metaphor, once, when it does more work than an argument. Rare,
  protected — not a habit.
- Never explain a joke. If it needs a follow-up, cut it.
- Never assign a personality archetype-style — derive it, don't decorate it.
- If a sentence needs an exclamation mark to feel exciting, it isn't doing
  its job. If it reads like a pitch deck, rewrite it.

Full do's/don'ts/anti-examples/reference-moves live in `brand.md` §Voice and
the copywriting engine's `SKILL.md` — this page's copy runs through that
engine section by section, not written freehand.

---

## 3. Color (locked — unchanged this cycle)

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#080f0a` | Base background, near-black |
| `--gold` | `#c8a96e` | Primary accent — labels, CTAs, hairlines |
| `--warm-white` | `#f0ede6` | Primary text |
| `--coral` | `#e8673a` | Vesica Piscis mark only — never used elsewhere |

No gradients, no drop shadows, no glow. Flat surfaces. Contrast and
whitespace carry the hierarchy, not decoration.

---

## 4. Typography — Mona Sans, unified

**Decision this cycle:** Mona Sans replaces Fraunces, Big Shoulders Display,
and DM Sans across both display and body roles. One variable superfamily,
hierarchy driven entirely by axis values rather than separate typefaces.
DM Mono is unchanged (separate role — code/technical accents, `brand.md`
editor UI) and isn't part of this decision.

**Font:** Mona Sans Variable (GitHub, OFL, free) — axes `wght` 200–900,
`wdth` 75–125, `opsz`, plus italic.

| Role | wght | wdth | Notes |
|---|---|---|---|
| Display / headline | 800 | 125 | Expanded + black. Tight letter-spacing (-0.01em). |
| Subhead / eyebrow | 600 | 100 | Uppercase, letter-spacing 0.1em — UI chrome register. |
| Body | 400 | 100 | Normal width and weight. `opacity: 0.7` on `--warm-white` for secondary reads. |
| CTA / link | 500 | 100 | Lowercase — voice register, not chrome. |

**Token update required:** `font.family.display` and `font.family.sans` in
the DTCG tokens file both point to Mona Sans; only axis presets differ.
Load via `@fontsource-variable/mona-sans` or self-hosted variable woff2 —
register axes as typed `@property` custom properties for smooth
interpolation if any scroll-driven or hover-driven axis animation is added
later (Rubato engine, not required for v1 of this page).

**Caps rule (unchanged):** human-voice copy is lowercase; UI chrome
(eyebrow labels, nav, badges) is uppercase.

---

## 5. Visual language — "Process-as-Provenance"

Editorial dark aesthetic. Three art-direction registers (D / C / B), fused
rather than kept separate — see `ART_DIRECTION_SKILL.md` §2 for the full
placement map, fusion rules, and device library. *This section is a
compressed pointer, not the authority.*

- **D — Typographic Monument** — oversized type that slows reading down,
  built natively in-browser (no baked images).
- **C — Craft-as-Evidence** — visible proof marks, corrections left visible,
  graphite/hand-tool texture. Signals "a human thought here."
- **B — Perverse Banality** — ordinary objects elevated with museum-catalog
  gravity. Used sparingly, for surprise.

Purpose of the system: *make thinking look like it left physical evidence.*
This is also the anti-AI-design positioning — engineered imperfection
(a struck-through line, a visible correction) as a deliberate signal against
generic AI-default polish.

Approved visual devices for this page (from the 8-device library):
**The Correction / Strike-Through** (D1 — struck-through line revealing the
real one), **the Margin Annotation** (D8 — small marginal notes near proof
points), **the Half-Cut Stencil** (D3 — used sparingly, likely in the
Manifesto or Proof section, not the hero). Max 3 distinct devices per page;
D7 (Blank Templates) max once ever.

---

## 6. Signature moments (hero)

**The Vesica Piscis mark** — brand mascot. Sits left of question/eyebrow
text at cap-height. Pulses once on arrival, settles to 22% opacity
permanently after. Coral only.

**The Correction (hero device)** — opening beat of the page. A struck-through
line states the wrong, expected claim; the real line reveals underneath it
in full color/weight. This is the single signature moment the page should be
remembered for — everything else on the page is quiet execution around it.

**Kinetic reveal (secondary, body copy)** — `stagger.reveal` token (42ms) per character;
line 2 of any multi-line reveal starts when line 1 is 40% through. Built with GSAP
SplitText (free as of 3.13) + `aria-label`/`aria-hidden` split for accessibility.
Must satisfy Surface 02 pass condition (`skills/Coda-Engine/References/Judged-Surfaces.md §02`).

**Rubato (page-wide, not v1-blocking)** — variable font axes shift with
scroll velocity. Sustained page behavior, not hero-specific. Can be layered
in after the static skeleton is approved — don't block the first prototype
on it.

---

## 7. Judged surfaces (floor gates — Coda engine)

Every state on this page is a judged surface, not just the "designed" ones.
Full surface list, pass conditions, floor gates, and audit-trail requirement:
see `skills/Coda-Engine/References/Judged-Surfaces.md` — *this section is a
compressed pointer, not the authority.*

P0 tier (scored by every visitor and every jury — six surfaces, not four):

- **Preloader / first paint** — no spinner; the Correction types while assets
  load behind it; strike-through fires when ready. Loading is dramaturgy,
  not a wait state.
- **Hero / signature moment** — The Correction + Rubato. Completes ≤5s;
  degrades to static struck-through state with `prefers-reduced-motion`.
- **CTA / waitlist form** (submit, success, and error states — all three,
  not just the happy path)
- **Scroll-triggered reveals** (must degrade gracefully with
  `prefers-reduced-motion` — no motion-only content)
- **Links & buttons** — every interactive element has distinct :hover,
  :active, :focus-visible states; gold as affordance only.
- **Typography floor** — CLS <0.02, headline legible at 320px, no orphan on
  the thesis line.

404 is a P1 surface (scored on inspection, not out of scope): brand.md parse
error in DM Mono + graphite correction pointing home. The audit-trail thesis,
played as a joke.

Award-winning formula this page is aiming for: one signature moment (the
Correction) + a hundred quiet details + excellent copy + narrative structure
+ a clean technical floor. No state is "good enough for now."

---

## 8. Page skeleton (confirmed order)

1. Hero — The Correction + Vesica Piscis + eyebrow wordmark
2. Problem / Tension
3. Manifesto
4. What You Get
5. How It Works
6. Who It's For
7. Proof / Dogfooding
8. Final CTA

Build and review skeleton-first, one section per decision point. Don't
move to section *n+1* until section *n*'s copy (via the copywriting engine)
and layout are both approved.

---

## 9. Technical stack

Vite + React + TypeScript. GSAP 3.13 (SplitText, ScrollTrigger — now fully
free). React Three Fiber for any WebGL moments (gate behind
`prefers-reduced-motion` and lazy-load). Lenis for smooth scroll. CSS
variable-font animation via `@property`; scroll-driven `animation-timeline`
where supported, GSAP ScrollTrigger fallback elsewhere.

---

## 10. What this page must not do

- Must not look like a generic AI-default template — no neutral corporate
  grotesque type, no default Tailwind card shadows, no stock-photo hero.
- Must not soften the voice with hedged copy, exclamation marks, or
  "innovative AI-powered solutions"-style language.
- Must not treat the waitlist form as a happy-path-only surface.
- Must not ship a section whose copy didn't run through the copywriting
  engine's six-step sequence, including the anti-slop pass.
