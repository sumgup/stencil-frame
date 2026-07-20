# Stencil + Frame — Design System Brief

*Positioning is the hero. Every visual decision below traces back to the
positioning in `brand.md` — this file is the visual layer of that same
document, not a separate creative brief.*

---

## 0. Open Decisions (not yet locked — do not treat as rules)

These are live questions currently being explored in Claude Design.
Anything below may override a rule stated later in this document. When one
gets resolved, move it out of this section and update the relevant §
directly — don't leave both versions sitting in the file.

- **General UI surface material** — currently flat/matte (archival ledger,
  no glow/blur/gradient, per §5). Exploring alternatives: frosted glass,
  precision-instrument (flat, corner-bracket/calibration readout feel),
  dashboard/HUD (glowing thin lines). Whichever wins may require revisiting
  the no-blur/no-gradient rule in §5 — that rule is NOT settled until this is.
- **Lighting treatment** — not yet addressed anywhere in this document.
  Exploring directional/cinematic lighting (single implied light source,
  hard shadow, high-contrast pooling, per-section color temperature tied to
  the emotional arc) as a layer independent of surface material. Should end
  up as its own subsection once resolved, not folded silently into §5 or §6.
- **Whiteboard / sticky-note material for brainstorming surfaces**
  (positioning map, gap map, brainstorm capture) — proposed as photographed-
  artifact content within the existing archival frame (ties to the Perverse
  Banality register, §5), not yet confirmed. Does not apply to general UI.
- **Color palette (§3)** — locked as-is for now, but flagged as reopenable
  if the winning UI material or lighting treatment needs it (e.g. a second
  accent color, coral used beyond the mascot). Don't reopen unilaterally —
  surface it as a question if a Claude Design direction seems to need it.
- **Frame product UI's own type/color system** — `design/MEMORY.md §DESIGN.md`
  currently specifies Instrument Serif + Syne + a three-accent palette (amber,
  blue, sage). These are an early placeholder, not a deliberate design decision.
  Frame's functional screens (carousel generator, brand picker, etc.) need their
  own dedicated design pass before any screen is built for real. Do not treat
  current MEMORY.md values as final; do not correct them silently — surface it
  here first when that pass is ready.
- **Coral (#e8673a) restriction** — currently locked to the Vesica Piscis mark
  only (§3). `skills/Coda-Engine/References/detail-patterns.md` P-07 proposes
  using coral as the error-state color for form feedback, which would break that
  restriction. Not decided — requires an explicit call on whether coral can be
  used beyond the mascot before P-07's implementation is built.
- **Provenance/audit-trail UI interaction model** — the product's core
  differentiator (every asset traces to brand.md) has no UI spec. Three candidate
  shapes: hover tooltip (low friction, for users who trust output), expandable
  footnote (higher trust signal, always-reachable trace), sidebar panel (highest
  transparency, for systematic auditing). The right choice depends on the user's
  emotional relationship to provenance — which should be answered in that
  feature's `brief.md` before any design starts. Flagship entry in
  `skills/interface-engine/references/ui-patterns.md` once the interaction model
  is chosen.

---

## 1. Creative Stance

**Primary tension: Opinionated ↔ Instrumental.**

The brand has a specific, earned point of view. It says the hard thing —
that most brands fail because they skip positioning, that AI-generated
copy without a reason-to-exist is noise, that the industry is solving
the wrong problem. It doesn't hedge. It doesn't use three adjectives
when zero will do. This is the *opinionated* pole.

But the product is a tool. It exists to make the founder's brand better,
not to admire itself. The session UI recedes so the founder's answer is
the hero. Product copy is labels, not speeches. When the tool works, the
founder forgets it's there. This is the *instrumental* pole.

Every touchpoint sits somewhere on this axis. The landing page is far
toward opinionated. The session UI is far toward instrumental. A 404
page has a voice (opinionated) but gets you back to work instantly
(instrumental). An error message tells you what broke honestly
(opinionated) and what to do next (instrumental).

### Supporting principle: Show your work, make them feel

Everything Stencil + Frame produces has a traceable origin. Copy traces
to brand.md. Visual devices trace to art direction. Motion traces to
named tokens. This is the audit trail — the product's own thesis, applied
to itself. But traceability without feeling is a spreadsheet. The
struck-through correction must feel like discovering a secret. The gold
accent must feel like warmth in a dark room. The delayed button must feel
like the software is unhurried on your behalf.

### Cascade — what this means for each discipline

| Discipline | Opinionated ↔ Instrumental | Show your work, make them feel |
|---|---|---|
| Copy | Landing page confronts. Product copy recedes. Voice is aphoristic-confrontational (brand) or quiet-label (product). Never the same register for both. | Every generation has a visible audit trail. Anti-slop gate runs and shows its work. |
| Visual | Process-as-Provenance devices (D1, D8) are the opinion made visible. Session UI has no hero imagery — the founder's text is the content. | Proof marks, construction lines, corrections left in. Warm palette (gold, warm white on dark) is the felt counterweight. |
| Motion | Animations communicate state or they don't exist. No decorative motion. The tool doesn't perform — it responds. | Held tension before resolution. Delayed continue button. Breath-paced text. The software feels unhurried on your behalf. |
| Interaction | 25-second wait before offering help. Never impose — offer. The founder drives. | Empty space carries meaning. What's not on screen is a design decision. |
| Error states | Tell what happened. No corporate apology. One link to fix it. Voice is present even in failure. | Use the brand's own devices. Match tone to user's emotional state. |
| Video / content | The viewer is the hero. The product is the pencil. Story decides form. | Real artifacts in demos. Never generated imagery. |

### Anti-slop commitment (moved from §5)

This is a stance-level decision, not a visual-language detail. By name,
we avoid:

- Inter, Roboto, Space Grotesk, or system sans-serif as display type
- Purple-on-white gradients
- Three rounded cards in a row with uniform shadows
- Italic-serif display hero (now itself an AI fingerprint)
- Oversized vague headlines with no specific claim
- Even-opacity shadows on every element
- Generated imagery where real artifacts should be

The governing logic: if an AI model would produce it by default with
no direction, we don't use it.

### How to use this section

When designing any new touchpoint, ask two questions:

1. **Where on the opinionated ↔ instrumental axis does this sit?**
   Brand surfaces lean opinionated. Product surfaces lean instrumental.
2. **Does it show its work AND land emotionally?** If it only shows work,
   it's a spreadsheet. If it only lands emotionally, it's decoration.
   Both must be present.

---

## 2. Brand context

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

## 3. Voice (governs every word on the page)

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

## 4. Color (locked — unchanged this cycle)

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#080f0a` | Base background, near-black |
| `--gold` | `#c8a96e` | Primary accent — labels, CTAs, hairlines |
| `--warm-white` | `#f0ede6` | Primary text |
| `--coral` | `#e8673a` | Vesica Piscis mark only — never used elsewhere |

No gradients, no drop shadows, no glow. Flat surfaces. Contrast and
whitespace carry the hierarchy, not decoration.

---

## 5. Typography — split stack (source of truth)

Every other file should point to this table, not restate it.

| Role | Font | Axes / notes |
|---|---|---|
| Display / headline | Fraunces | `opsz` 9–144, `wght` 100–900, `SOFT` 0–100, `WONK` 0–1, italic. Expressive register — serifs, SOFT/WONK for "engineered imperfection." |
| Body copy | Mona Sans Variable | `wght` 400, `wdth` 100. `opacity: 0.7` on `--warm-white` for secondary reads. Replaces DM Sans. |
| CTA / link | Mona Sans Variable | `wght` 500, `wdth` 100. Lowercase — voice register, not chrome. |
| Subhead / eyebrow | Mona Sans Variable | `wght` 600, `wdth` 100. Uppercase, `letter-spacing: 0.1em` — UI chrome register. |
| Code / technical | DM Mono | Unchanged. Code, `brand.md` editor UI, margin annotations. |

**Fraunces** (Google Fonts, OFL, free) — variable: `opsz` 9–144, `wght`
100–900, `SOFT` 0–100, `WONK` 0–1, italic. The expressive display face.
SOFT rounds serifs; WONK enables stylistic alternates. Both are display-only
axes — never animate or apply at body sizes.

**Mona Sans Variable** (GitHub/jsDelivr, OFL, free) — `wght` 200–900,
`wdth` 75–125, italic. Replaces DM Sans in the body/UI role. Does not serve
the display/headline role in this system.

**DM Mono** (Google Fonts, OFL, free) — unchanged.

**Big Shoulders Display** — retired. Fraunces covers all display duty.

**Caps rule (unchanged):** human-voice copy is lowercase; UI chrome
(eyebrow labels, nav, badges) is uppercase.

Full token spec: `design/tokens.json`.

---

## 6. Visual language — "Process-as-Provenance"

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

## 7