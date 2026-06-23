# Stencil + Frame — UI Design Language
*Living document — update as decisions are made*
*Created: June 2026*

---

## The Core Symbol — Vesica Piscis

### What it is
Two overlapping circles. The intersection — the Vesica Piscis — is
the central logo and recurring motif of Stencil + Frame.

### Why it's structurally earned (not decorative)
- Left circle = **Stencil** — identity, inward, who you are
- Right circle = **Frame** — execution, outward, what you make
- The intersection = **the brand itself** — the sweet spot where
  identity meets execution

In sacred geometry the Vesica Piscis is the space created when two
realities intersect. For Stencil + Frame it is literally the product:
the gap between who you are and what you build, made visible.

### How it appears across the product
The Vesica intersection is the **one colourful element** in the
entire product. Everything else is dark and restrained. When the
Vesica appears, something is happening. It is a theatre reveal device.

Appears at:
- The logo (wordmark + Vesica symbol)
- Act transitions (Vesica pulses as you move between acts)
- The moment brand.md is written (Act 3 — the Vesica completes)
- Loading states (Vesica breathes)
- The gap reveal in Act 2b (the gap IS the Vesica intersection)
- Navigation indicator (like DD's logomark guides the platform)

### The colour
Warm coral-orange — luminous, singular. Inspired by Devouring Details'
orange. Not our gold (which stays for text accents and labels).
The Vesica colour is the only warm saturated colour in the product.

Suggested value: `#e8673a` (to be finalised in design sprint)

---

## Typography

### Scale and authority
Questions must be **tall and commanding**. High contrast against the
dark background. The question IS the hero of each screen.

**Principles stolen from Craft.do:**
- Generous line height: 1.7–1.8 for body, tighter (1.0–1.1) for
  display questions
- Comfortable measure: 65–75 characters per line for reading text
- Large question text creates focus — the screen has almost nothing
  else at full size

**Question typography spec:**
- Font: DM Serif Display (questions) — mixed upright + italic
- Size: `clamp(2.8rem, 5.5vw, 5rem)` — large enough to command
- Colour: `#f0ede6` (warm white) for the statement part
- Colour: `#c8a96e` (gold) for the italic/invitation part
- Contrast ratio: must pass WCAG AA against `#080f0a` background

**Blur reveal entrance for questions:**
Questions arrive blurred (`blur(12px)`, opacity 0) and sharpen
into focus over 0.8s. Creates theatricality — the question
materialises rather than appearing. Feels like something coming
into focus, which maps to the Act 0 emotional word: Origin
(clarity emerging from formlessness).

CSS approach:
```css
.question-enter {
  filter: blur(12px);
  opacity: 0;
  animation: blurReveal 0.8s cubic-bezier(0.16,1,0.3,1) forwards;
}
@keyframes blurReveal {
  to { filter: blur(0); opacity: 1; }
}
```

---

## Interaction Patterns (from Devouring Details)

### Scroll Strip — Five Steps on Landing Page
The five Johnson steps (Investigate → Strategy → Narrative →
Design → Launch) are laid out in a horizontal scroll strip.

**Behaviour:**
- Steps sit in a strip, slightly compressed
- On mouse hover, the hovered step **magnifies** — grows to full
  readable size, others compress further
- The active step (currently Investigate) stays at a slightly
  larger resting size
- Each step card has its illustration as background

**Why this over horizontal cards:**
Scroll strip communicates sequence more naturally than a grid.
The magnify-on-hover rewards curiosity without overwhelming.
Mobile: horizontal scroll, touch-friendly.

**Implementation approach:**
CSS `transform: scaleY()` or width transition on hover,
with `transition: all 0.4s cubic-bezier(0.16,1,0.3,1)`.
Neighbour cards slightly compress to give the hovered card space.

### Blur Reveal — Illustration entrance
Act 0 illustration arrives blurred, sharpens as it settles.
Metaphor: something coming into focus. Formlessness → form.
Applied to: illustration on full-screen Phase 1 arrival.

### Morph Surface
Connected to the blob → hexagram system already designed.
The blob IS a morph surface — organic form that gradually
resolves into geometry across the five acts.
Study DD's Morph Surface implementation for animation techniques
at act transition moments.

### Motion Choreography
Principle: elements enter in a deliberate sequence, not all at once.
Each element's entrance is earned by what came before.

Order in Act 0:
1. Illustration arrives (blurred → sharp)
2. Session title fades in
3. "Click to begin" breathes in
4. (Click) Illustration slides to panel
5. Vertical hero text reveals bottom→top
6. Hero recedes to atmospheric
7. Question blur-reveals
8. Whisper text fades last

No two significant elements should animate simultaneously.

---

## Colour

### Full palette
```
--bg:         #080f0a    Background — British Racing Green deep dark
--accent:     #c8a96e    Gold — text accents, labels, structural gold
--accent-dim: #5a4520    Gold dim — borders, subtle elements
--text:       #f0ede6    Warm white — primary text
--text-sub:   #6a7a6a    Muted green-grey — secondary text
--text-dim:   #1a2a1a    Very dim — tertiary, structural
--text-ghost: #0e1a0f    Ghost — barely visible structural lines
--vesica:     #e8673a    Coral orange — THE Vesica colour, singular
                          Only warm saturated colour in the product
```

### Colour rules
1. The Vesica colour (`--vesica`) appears ONLY on the Vesica symbol
   and its associated reveal moments. Never on text, never on borders.
2. Gold (`--accent`) is for text accents and the one warm element
   per screen rule. Used sparingly.
3. Everything else is dark and restrained.
4. The contrast between dark everything and the Vesica orange is
   the visual drama of the product. Protect it.

---

## Microcopy Principles

### Voice: warm, grounded, calm authority
Stolen from: Every.to editorial voice, Duolingo encouragement
principles, Stripe error message clarity.

**The register per act:**
- Act 0 (Origin) — calm and curious. Patient. Excavating.
- Act 1 (Noise) — opening up, slightly warmer, more space
- Act 2b (Gap) — detective work. Sharp. Spatial. Precise.
- Act 3 (Born) — ceremony. Quiet. Significant. Unhurried.

### Duolingo principles applied to Stencil
1. **Name the person, not the feature** — "You made something real
   today" not "Session complete"
2. **Celebrate the small win first** — before asking for the next
   thing, acknowledge what just happened
3. **Never say Error** — describe what happened and what to do next
4. **Questions feel like a person asking** — not a form demanding

### Copy audit checklist (run against every screen)
- [ ] Generic labels: Submit / Continue / Next → rewrite every one
- [ ] Silent loading states: spinner with no copy → always add copy
- [ ] Fear-inducing errors: Error 422 → rewrite in plain language
- [ ] Disappearing placeholders → placeholder must be a real example
- [ ] Confirmation dialogs → must say exactly what is happening
- [ ] CTA copy → must say what happens next, not what user does now

### Banned words in Stencil copy
- Submit, Continue, Next, Done, Complete (too generic/corporate)
- Error, Failed, Invalid (fear-inducing)
- Just, Simply, Easy (condescending)
- Innovative, Cutting-edge, Revolutionary (meaningless)
- Amazing, Great, Awesome (hollow praise)

### Preferred patterns
| Moment | Instead of | Use |
|---|---|---|
| Moving forward | "Continue →" | "this feels right →" |
| Session done | "Complete" | "written. something real." |
| Loading | spinner | "thinking about what you mean..." |
| Error | "Error: invalid input" | "that didn't quite land — try again" |
| Success | "Saved!" | "locked in." |
| Empty state | "No data yet" | "nothing here yet — that changes now" |

---

## UI Patterns Reference

### Sources
- **Typeform.com** — one-question-at-a-time flow, transitions,
  progress that doesn't count down
- **Obys.agency** — cinematic web, images as emotional anchors,
  transitions as theatre
- **Craft.do** — typography scale and reading rhythm, focus mode
- **Devouring Details** (devouringdetails.com) — scroll strip,
  morph surface, blur reveal, motion choreography, simulating physics
- **Linear.app** — authority + warmth, dark minimal, each step earns next
- **Every.to** — editorial voice reference, warm grounded authority
- **Duolingo** — microcopy principles, encouragement without hollow praise
- **Stripe** — error messages and confirmation copy

### Key patterns to implement (priority order)
1. **Blur reveal** — questions and illustration entrance (Act 0 now)
2. **Scroll strip** — five steps on landing page (next landing build)
3. **Vesica as motion device** — act transitions (after Act 0 built)
4. **Morph surface** — blob animation refinement (already in progress)
5. **Focus mode** — already designed (Pattern A, already in prototype)

---

## Logo and Symbol

### The Vesica Piscis wordmark
- Symbol: two overlapping circles, intersection filled with
  `--vesica` coral orange
- Wordmark: "Stencil + Frame" — "+" is the Vesica symbol
  or the intersection highlighted
- The "+" is not a plus sign — it IS the intersection,
  the brand itself

### Logomark behaviour
Like Devouring Details' logomark — the Vesica symbol becomes
a **guiding indicator** throughout the product:
- Appears at act transitions
- Pulses when something is loading
- Completes (fills fully) when Act 3 confirm happens
- Used as a bullet/marker for structural navigation

---

## Open decisions

| # | Decision | Status |
|---|---|---|
| 1 | Exact Vesica orange value | `#e8673a` proposed — needs test |
| 2 | Vesica logomark design | ⬜ design sprint needed |
| 3 | Scroll strip implementation | ⬜ next landing page build |
| 4 | Blur reveal timing curve | 0.8s proposed — test in prototype |
| 5 | Question font size final values | clamp proposed — validate on mobile |
| 6 | Vesica at act transitions | ⬜ after Act 0 built |
| 7 | Every.to voice study | ongoing reading reference |

