# 01 Foundations — Build Spec for Penpot

> ⚠ **Scope disambiguation (added 2026-08-08):** Despite the filename and
> Sprint 1 framing below, this spec is built from `design/tokens.json`,
> which belongs to the **Stencil+Frame brand/landing** design system
> (Print/Ink model: Near-Black / Glare Yellow / Blueprint Blue / Paper —
> see root `DESIGN.md`). It is **not** the Sprint 1 Foundations output for
> the **Stencil methodology** system (near-monochrome Graphite / Blueprint
> / Coral / Ghost / Paper, derived from `book/*.md`, originally built in
> Figma). That system's Sprint 1–3 output now lives in
> `stencil-methodology/01-foundations.md`, `02-tokens.md`, and
> `03-primitives.md`.
>
> Both systems independently use the terms "Blueprint" and "Coral" with
> different meanings — see `stencil-methodology/README.md` for the full
> three-way disambiguation table before reusing any value from this file.

Sprint 1, Page 01. Built directly in Penpot's native token editor + a
Foundations page — no Figma/MCP dependency. Every item below is either
sourced from `design/tokens.json` (marked **Initial Value: set**) or from
`book/*.md` principle text (marked **Initial Value: TBD** where the book
states a principle but no number — per Stencil's own law, undefined values
are not invented).

Format matches your original prompt's schema: Name / Purpose / Grammar
Source / Initial Value / Status.

---

## Color

### bg
- **Purpose:** Base background. Near-black substrate the whole system sits on.
- **Grammar Source:** Visual Grammar — "Near-monochrome remains the substrate."
- **Initial Value:** `#080f0a` (from `tokens.json`)
- **Status:** Locked

### gold
- **Purpose:** Primary accent. Marks human judgment/intervention — labels, CTAs, hairlines, interactive affordance only.
- **Grammar Source:** Visual Grammar — "Colour communicates intervention... Colour is rationed. Meaning increases through scarcity."
- **Initial Value:** `#c8a96e` (from `tokens.json`)
- **Status:** Locked

### warm-white
- **Purpose:** Primary text color. Never pure white — keeps the surface from reading as sterile/digital-default.
- **Grammar Source:** Visual Grammar — near-monochrome substrate principle.
- **Initial Value:** `#f0ede6` (from `tokens.json`)
- **Status:** Locked

### coral
- **Purpose:** Reserved exclusively for the Vesica Piscis mark. Not a general error/accent color despite common convention.
- **Grammar Source:** Visual Grammar — "Coral remains reserved for error" (book states error; `tokens.json` narrows this further to "Vesica Piscis mark only — never used elsewhere in the system." Treating `tokens.json` as the more current/specific ruling since it postdates and refines the book's general statement.)
- **Initial Value:** `#e8673a` (from `tokens.json`)
- **Status:** Locked — **flag for Decision Log** (see 99 Decision Log below: book says "error," tokens.json says "Vesica Piscis mark only." These aren't identical claims and should be reconciled explicitly, not silently.)

### Blueprint blue
- **Purpose:** Indicates construction/working state (per Material Grammar's "Conditional Materials" — Blueprint is a "construction register, never decoration").
- **Grammar Source:** Visual Grammar — "Blueprint blue may indicate construction." Material Grammar — Blueprint as conditional material.
- **Initial Value:** TBD — no hex value exists in either the book or `tokens.json`.
- **Status:** TBD → logged to 99 Decision Log

---

## Typography

### font.family.display
- **Purpose:** Display/headline role — the system's authored, high-authority voice.
- **Grammar Source:** Visual Grammar (typographic choices fall under appearance/testimony); no book chapter specifies typeface names directly — this is `tokens.json`'s operational decision.
- **Initial Value:** Fraunces, Georgia, serif — variable font (opsz 9–144, wght 100–900, SOFT 0–100, WONK 0–1, italic)
- **Status:** Locked

### font.family.sans
- **Purpose:** Body copy and UI text role.
- **Grammar Source:** Same as above — operational, not book-derived.
- **Initial Value:** Mona Sans Variable, Mona Sans, system-ui, sans-serif
- **Status:** Locked

### font.family.mono
- **Purpose:** Code, technical accents, brand.md editor UI, margin annotations.
- **Grammar Source:** Material Grammar — "Digital Materials... Native: ...Monospace." Monospace is explicitly named as a native (trustworthy) digital material.
- **Initial Value:** DM Mono, monospace
- **Status:** Locked

### typography.display
- **Purpose:** Display/headline treatment.
- **Grammar Source:** Visual Grammar — appearance as testimony; operational values from `tokens.json`.
- **Initial Value:** Fraunces, weight 900, opsz 144, letter-spacing -0.01em, no text-transform. Lowercase by default (uppercase reserved for UI chrome).
- **Status:** Locked

### typography.subhead
- **Purpose:** Subhead/eyebrow — UI chrome register (labels, nav, badges).
- **Grammar Source:** Visual Grammar — contrast principle (chrome vs. voice registers made legible through typographic distinction).
- **Initial Value:** Sans family, weight 600, wdth 100, letter-spacing 0.1em, uppercase.
- **Status:** Locked

### typography.body
- **Purpose:** Body copy.
- **Grammar Source:** Visual Grammar — near-monochrome substrate; secondary reads via opacity, not a second color (explicit rule in `tokens.json` description).
- **Initial Value:** Sans family, weight 400, wdth 100, letter-spacing 0, no transform. Secondary text: same color at opacity 0.7 — never a different color.
- **Status:** Locked

### typography.cta
- **Purpose:** CTA/link — voice register, not chrome (lowercase, unlike subhead's uppercase).
- **Grammar Source:** Visual Grammar — chrome/voice distinction encoded directly in casing.
- **Initial Value:** Sans family, weight 500, wdth 100, letter-spacing 0, lowercase.
- **Status:** Locked

### typography.session-hero / typography.session-question
- **Purpose:** Stencil session-specific type treatments (vertical hero name; question/reveal text).
- **Grammar Source:** Scene Grammar likely governs this (not read tonight — flag for follow-up). Visual Grammar's authority-restraint principle is referenced directly in the token's own description ("authority restrained relative to landing page display... to suit the session's introspective register").
- **Initial Value:** session-hero: Fraunces, weight 700, opsz 72, letter-spacing 0.05em, uppercase. session-question: Sans, weight 350, wdth 100, letter-spacing 0, no transform.
- **Status:** Locked

---

## Spacing

- **Purpose:** N/A — no spacing scale exists yet.
- **Grammar Source:** No book chapter defines numeric spatial values. Spatial Grammar explicitly states it "does not describe layouts, grids, or navigation" — it governs *editorial meaning of location* (Hand/Desk/Wall/Archive), not pixel spacing. This is a deliberate gap, not an oversight: the book's Spatial Grammar and a conventional 4px/8px spacing scale are answering different questions.
- **Initial Value:** TBD entirely. No spacing tokens exist in `tokens.json` either.
- **Status:** TBD → logged to 99 Decision Log. Needs a founder decision: does Stencil want a numeric spacing scale at all, or does spacing get derived case-by-case from Spatial/Composition Grammar's editorial logic? This is itself a foundational question, not a value to fill in casually.

---

## Motion

### motion.stagger.reveal
- **Purpose:** Per-character stagger timing for kinetic text reveals (e.g. "The Correction" on the landing page).
- **Grammar Source:** `tokens.json` explicitly scopes this as "design-specific — not a general character-stagger value," meaning it should NOT be treated as a general Foundation-level motion token despite living in the palette. Flagging this discrepancy for the Decision Log too.
- **Initial Value:** 42ms (from `tokens.json`)
- **Status:** Locked, but scope-flagged — **may not belong in 01 Foundations at all** per its own description. Consider moving to a page-specific/component-level token instead once 05 Playground or a Motion-specific page exists.

---

## 99 Decision Log — entries generated by this pass

1. **Coral's purpose — book vs. tokens.json mismatch.** Visual Grammar (book) says coral is "reserved for error." `tokens.json` says coral is "Vesica Piscis mark only — never used elsewhere in the system." These are different claims (error-state color vs. one specific brand mark). Needs founder resolution: is coral allowed for error states elsewhere, or is `tokens.json`'s narrower rule the current standing decision superseding the book's more general one?

2. **Blueprint blue has no value.** Named and justified in both Visual and Material Grammar as a legitimate conditional material/color, but no hex exists anywhere in the repo. TBD until a founder session assigns one.

3. **No spacing scale exists.** Spatial Grammar deliberately does not specify layout/spacing values — it's a theory of editorial standing (Hand/Desk/Wall/Archive), not a grid system. Open founder question: should Foundations include a conventional numeric spacing scale at all, or is spacing meant to be derived per-composition from Spatial/Composition Grammar instead? This is a structural decision, not a missing value — treat accordingly.

4. **motion.stagger.reveal may be misscoped as a Foundation.** Its own description in `tokens.json` says it's design-specific (landing page kinetic reveal only), not a general system value. Recommend it move out of 01 Foundations into a component- or page-specific token set once one exists, rather than staying in the shared foundation.

---

## What's still unread (flag for next session, not invented tonight)

Grammar Source citations above lean heavily on Visual, Material, Gesture,
and Interaction Grammar (all read tonight). Motion Grammar, Composition
Grammar, Scene Grammar, and Diagnostic Patterns were **not** read this
session — if any Foundation item above turns out to be better sourced from
one of those chapters, that citation should be corrected once they're
read, not guessed now.
