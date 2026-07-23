# Design System — Visual Language v2
*Canonical design document for Stencil+Frame brand and product surfaces. All visual decisions reference this system.*

---

## §0 — Decisions (July 2026 close-out)

### Closed decisions (re-derivation sessions A/B/D)
- **Coral restriction** → CLOSED: Coral (#e8673a) = mascot + session error states only. Banned from landing page. Rationale: color-as-meaning requires discipline; emotional arc demands scarcity.
- **Surface material system** → CLOSED, all three candidates killed (glass / precision-instrument / dashboard-HUD). Decision: Material = **PRINTED MATTER** (substrate honesty, see §2 below). Flat-nothing register also killed.
- **Cinematic lighting** → CLOSED: killed. System runs on flat fields and structural light (glare, hazard signage, X-ray clarity), not volumetric depth.

### Open decisions (v0.3+)
*(None currently. System is sealed for v0.2.)*

---

## §1 — Color System v2 (Two-Ink Print Model)

### Inks + Field + Ground
Model color as a print system, not a pixel system. Every color must name its job or it doesn't enter the system.

**Ink 1: Near-Black** `#0a0a0a`
- Job: Typography, structure, fine detail.
- Usage: All typeset text, hairlines, rules, diagrams.
- Carries 100% of argument and hierarchy.

**Field: Glare Yellow** `#ffe600` (working value; tune in browser)
- Job: Revelation beats and emotional peaks.
- Usage: Landing hero, Gap Map, brand.md-birth moment, Swiss glare register only.
- Rules: Never carries text on light grounds. Flat field, black type only. Zero candy idiom.
- Dosage: Rationed by emotional arc — quiet phases near-colorless, field arrives at designated peaks.

**Ink 2: Blueprint Blue** 
- Light-ground value: `#2b50c8`
- Dark-ground value: `#7d9bff`
- Job: Annotation, technical detail, link affordance, D8 callouts + superscripts, dark-ground CTA.
- Usage: Secondary information layer, registration marks, dark-UI affordances.
- Registers: Industrial annotation, technical surfaces, dark-ground interactive.

**Ground 1: Paper** `#f4f1e8`
- Job: Light-mode ground (product/quiet register).
- Usage: Product surfaces, quiet editorial, onboarding.

**Ground 2: Dark** `#080f0a`
- Job: Dark-mode ground (retained for quiet-register where needed).
- Usage: Session UI, dark editorial surfaces.

**Coral** `#e8673a`
- RESTRICTION: Mascot and session error states only. No other use.
- Rationale: System discipline; color carries meaning only when rationed.

**Retired: Gold** `#c8a96e`
- Probation lost to Blueprint Blue (2026-07-24). No longer in active system.

### Contrast rules
- **Blue on yellow**: Allowed for graphic elements and annotations. Small-text contrast checked at build time.
- **Legibility floor**: WCAG AA minimum for all text. Body text always black on paper or light ground.

---

## §2 — Register Table (Movement Dials per Surface Class)

Five movement registers can coexist *only* under one governing concept. Dials are the only sanctioned way trends enter execution.

| Surface | Editorial-Print | Swiss Glare Field | Industrial Annotation | Punk (Hand/Marginalia) | Maximalism |
|---|---|---|---|---|---|
| **Landing / Brand Pages** | dominant | at beats only | accents | marginalia only | proof section density only |
| **Stencil Session UI** | whisper (paper+ink) | revelation beats only | annotations | none | none |
| **YouTube / Maker Surfaces** | base | free | light | elevated (allowed) | occasional |

**Governing principle**: One concept holds all registers. Turn one dial; all respond coherently.

---

## §3 — Typography v2

### Display & Signature
- **Hand-made typography by Sumit** (Scher lineage: condensed caps, scale collision, type-as-architecture).
- **Digital stand-in (until hand assets exist)**: Anton (condensed, geometric, architectural).
- Usage: Signature moments, headlines, brand marks.

### Workhorse
- **Mona Sans** (incl. wdth 75 / wght 900 uppercase for condensed display duty) — variable body and secondary hierarchy.
- **DM Mono** — data, code, metadata, system labels.

### Accent Serif
- **Fraunces** — leashed to reveal-line moments only.
- Constraint: SOFT 0 in glare register (no italic quirks during peak emotional beats).
- Usage: Reveal moments, punctuation (very rare).

### Marginalia Layer
- **Sumit's real handwriting** — one-off SVGs per session.
- Format: Hand-drawn annotations, asides, corrections.
- See `skills/copy-engine/register-marginalia.md` for execution rules.

### Type hierarchy
| Use | Font | Weight | Size | Line-height |
|---|---|---|---|---|
| Hero / signature | Hand-Sumit or Anton | 900 cond. | clamp(2rem, 8vw, 4rem) | 0.9 |
| Display / headline | Anton or Mona Sans | 700–900 | 1.2–2rem | 1.1 |
| Body / editorial | Mona Sans | 400–500 | 1rem | 1.6 |
| Data / mono | DM Mono | 400 | 0.875rem | 1.4 |
| Marginalia | Handwriting SVG | — | context | — |

---

## §4 — Surface & Texture Rules (Substrate Honesty)

### Principle: Evidence of making, or costume?
Every screen pretends to be made of something. Choose the material consciously. Texture on surfaces; never on controls. No simulated depth, bevel, or gloss.

### Brand Surfaces (loud)
- **Texture source**: Real scanned textures (gelli plate, brayer ink, woodblock grain).
- **Color palette**: Riso-grade colors, paper tone, printerly registration marks.
- **Usage**: Landing, brand pages, editorial.
- **Test**: Hold against real print samples. Does it look printed or CSS-faked?

### Product Surfaces (quiet)
- **Texture source**: Whisper version — faint paper ground, ink text, hairlines.
- **Color palette**: Near-black text, paper grounds, restraint.
- **Usage**: Stencil session UI, dashboard, functional screens.
- **Test**: Could this pass as a precision document?

### Control guard
- Never apply texture to buttons, inputs, interactive elements.
- Function stays digital; only surfaces get substrate.
- Texture breaks affordance — users must read interaction clearly.

### Texture authenticity
- **Real**: Scanned photographs, prints, hand-made originals.
- **Honestly hand-made**: SVG brushstrokes, visible gesture (if disclosed as hand).
- **Not allowed**: CSS imitations (noise filters, subtle gradients pretending to be grain).

---

## §5 — Motion & Transition (Kept from Frame system)

### Governing principle
**Suspension to resolution**. Elements in-progress feel unresolved. Completion feels like release.

| Moment | Duration | Easing |
|---|---|---|---|
| State entry | 240–320ms | ease-out cubic |
| State exit | 140–180ms | ease-in cubic |
| Micro-interaction | 80–120ms | ease-out |
| Loading hold | 1400–2000ms loop | ease-in-out sine |
| Success resolution | 280–360ms + 80ms pause | ease-out cubic |
| Step transition | 200ms | ease-in-out |

All animations wrapped in `@media (prefers-reduced-motion: no-preference)`.

---

## §6 — Design Process Rules (Earned July 2026)

1. **Locked decisions reopen ONLY** when evidence changes. Moodboard browsing is not evidence. Reopened decisions get one line of rationale: re-confirmed / revised / killed.

2. **Same-day rule**: Never finalize color/style choice on the same day as capture session. Primed taste is not taste. Minimum 24h gap.

3. **One governing concept** holds multiple registers. Per-surface movement dials respond coherently to one underlying system.

4. **Idiom carries meaning**, not hue. Identical colors read kiddish in one register (candy, bouncy) and severe in another (hard type, monochrome, flat field). Judge executions, not swatches.

5. **Partner discipline** (for Claude/agent work): Design intent comes from Sumit; Claude structures, interrogates, pattern-reads. No designing ahead of the art director.

6. **Control tests on real content**: Fresh eyes, 24h gap, five-second gut pick. Final values tune at build time.

7. **Validation riders** when decider ≠ audience. Persona-adjacent testing or ship with evidence clause tied to real usage.

---

## §7 — Reference

- **Art Direction methodology**: See `skills/art-directing-web/SKILL.md` for full process.
- **Marginalia execution**: See `skills/copy-engine/register-marginalia.md`.
- **Disposition protocol**: See `design/DISPOSITIONS-LOG-v2.md` (re-derivation sessions A/B/D).
- **Landing page direction**: See landing-page-art-direction-plan.md (in development).
