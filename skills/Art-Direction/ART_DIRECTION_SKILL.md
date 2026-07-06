# ART_DIRECTION_SKILL.md
## Stencil + Frame — Art Direction Engine

> **Status:** Territory + Style DNA LOCKED (anchor set confirmed).
> **Device Library:** COMPLETE — 8 devices, all mapped and scaffolded, see §9.
> **Companion skills:** copywriting engine (SKILL.md), interface engine, Rubato (typography & motion).

---

## 1. Territory (locked)

**Name:** Process-as-Provenance (archival evidence aesthetic).

**Purpose statement:** *Make thinking look like it left physical evidence.*

A glossy render says "this was easy." A pencil construction with the mistakes
left in says "someone sat with this." The style's psychological jobs:

1. **Trust** — nothing is hidden; the working is on the surface.
2. **Perceived value** — visible effort (the mechanism behind luxury craft
   storytelling: Bottega "Craft is Our Language", atelier campaigns).
3. **Slowed viewing** — annotations are read like text; the eye decelerates.
   Attention through evidence, not spectacle.

**The twist that makes it ours:** designers apply evidence-aesthetics
(construction grids, guide lines) to *logos*. Stencil applies it to
*positioning* — construction lines on the "why," crossed-out answers,
annotated belief shifts. The audit trail is the art.

**Lineage (old, therefore durable):** Renaissance construction geometry,
mid-century paste-up / production art, 1960s–70s conceptual-art
documentation, architecture working drawings, museum/exhibition catalogs.
**Current relevance:** the sharp end of the 2026 anti-AI provenance wave
(human mark as differentiator against machine-smooth sameness). We join a
lineage at the moment culture turned toward it — not a fad.

**Anti-thesis check (must always pass):** an AI brand tool whose visuals
look AI-generated is self-refuting. Every asset must survive the question
"would you believe a human touched this?"

---

## 2. The three registers (one system, not three styles)

| Register | Role | Medium | Where |
|---|---|---|---|
| **D — Typographic Monument** | Skeleton | Live type in browser (never Midjourney) | Page structure, heroes, headlines. Slows reading. |
| **C — Craft-as-Evidence** | Ink | Graphite/ink drawings, proof sheets, construction geometry | Section illustrations, in-product marks, overlays on D |
| **B — Perverse Banality** | Lens | Still-life photography, ordinary objects elevated | Proof/dogfooding sections, hero objects, texture |

**Fusion is the signature move:** monumental type (D) carrying evidence
marks (C) — baseline grid faintly visible, a kerning note left in, one word
struck through in pencil. All three arguments in one image.

**Placement map (initial):**
- Hero → D+C fusion (+ optionally one B object)
- Section illustrations → C (proof-sheet drawings)
- Proof/dogfooding → B photography (the actual desk, treated like leather)
- In-product → quiet C marks only (e.g. a pencil underline when an answer
  is accepted — softest possible reward). The founder's answer is the hero;
  art recedes during the session.

---

## 3. Style DNA — master prompt block (prepend to every Midjourney prompt)

```
[subject], graphite pencil and ink on warm ivory paper, analog print
media, scanned paper texture with visible tooth and grain, subtle
smudges and eraser ghosts, letterpress registration marks, flat even
daylight, deadpan composition, generous negative space, near-monochrome
--style raw --s 0 --no glossy, 3d render, octane, cinematic lighting,
bokeh, vibrant gradients, digital art, airbrush, neon
```

The `--no` list is the anti-slop filter in negative form. Never remove terms
from it.

### Register C scaffold (evidence drawings)
```
[subject drawn as a working proof, e.g. "a stencil of a face, half-cut,
with the knife's guide lines still visible"], graphite on ivory paper,
handwritten margin annotations, crop marks, one correction struck through
in pencil, proof sheet aesthetic, scanned original
+ master DNA block
```

### Register B scaffold (elevated ordinary)
```
[ordinary object, e.g. "a single crumpled sticky note, uncrumpled and
flattened"], still life photograph, medium format film, single soft
window light, deep shadow field, object centered small in large empty
frame, museum-catalog gravity, muted tones, fine film grain
--style raw --no studio gloss, product photography, HDR, saturation
```

### Register D (type)
Built live in the browser (Mona Sans Variable — display role, wght 800 wdth 125 at hero scale;
see `design/tokens.json` typography.display). Midjourney is never used for letterforms.
C-marks that sit on type
(strikethroughs, annotations, guide lines) are generated or scanned as
transparent overlays and composited.

---

## 4. Anchor set (confirmed) — permanent --sref block

Generated 2026-07, subtle-upscaled. Selected frames:

| Anchor | Subject | Register | Selected frames |
|---|---|---|---|
| 1 | Face as half-cut stencil | C (figure) | Frames 2, 3 |
| 2 | Vesica piscis compass construction | C (object) | Frame 4 (warm paper) |
| 3 | Working proof book page | C (document) | REROLLED — modern-annotation version (see §5 fix) |
| 4 | Crumpled sticky note on dark linen | B | Frame 3 (amber note — carries accent-color hint) |
| 5 | Pencil, scalpel, cut stencil | B/C bridge | Frame 3 or 4 (honest, not flat-lay pretty) |

**Usage:** every production prompt carries `--sref [anchor URLs]` with
`--sw 200–400`. Prompt describes CONTENT; sref carries STYLE. Composition
and style remain separate passes (standing Midjourney lesson).

**Grid 3 anti-drift fix (locked wording):** replace dense handwriting with
"sparse modern handwriting, ballpoint and pencil, dates and short notes";
add to --no: `medieval manuscript, calligraphy, antique`.

---

## 5. Production pipeline (mandatory steps)

1. **Prompt** = content description + register scaffold + master DNA + sref.
2. **Reroll, don't reword** when a grid misses vibe — wording changes
   contaminate the style sample.
3. **Judge on vibe only**, ignore subject accuracy. Kill-questions:
   - Does it look like it exists on paper?
   - Would you believe a human touched it?
   - Is it quiet?
4. **Subtle upscale only** (never Creative — preserves composition).
5. **Human pass in Krita (NOT optional polish):**
   - Overlay one real scanned texture (actually crumple/scan paper).
   - Where it matters, add one real pencil mark by hand (AI Diffusion
     plugin canvas). Every image genuinely contains a human mark —
     provenance made true, not styled. Mention in YouTube episodes.
6. **Color:** generate near-monochrome; apply single spot accent BY HAND in
   Krita afterward. Accent color re-auditions from scratch (note: anchor 4
   frame 3's warm amber note is a live candidate — one warm object in a
   dark field). Never ask Midjourney to color-manage.
7. **Export:** Squoosh → WebP quality 80.

---

## 6. Known drift directions (watch for these)

- **"Tasteful sketchbook Pinterest"** — too pretty, too composed,
  influencer flat-lay. Target is "found on a real desk mid-job."
- **Antique/manuscript drift** (grid 3 failure mode) — reads museum-old
  instead of in-progress. Fix via --no antique terms + modern annotation
  wording.
- **Charming vs. working** — if a grid feels charming, reroll.

---

## 7. Motion layer (deferred, architecture noted)

Two output modes: static illustration and motion. Motion inherits the
territory: evidence appearing in time — a line being drawn, a strikethrough
happening, a construction unfolding. Motion voice rules (from brand
personality): long durations, restrained easing, weight; one motion event
per viewport; must communicate as a still frame. Implementation via the
typography/motion engine stack (CSS animation-timeline, GSAP, variable
fonts) — deferred until landing page proves the promise.

---

## 8. Self-check (audit gate — run before shipping any asset)

1. Which positioning concept does this image derive from? (Name it.)
2. Does the evidence (marks, construction, correction) do argumentative
   work, or is it decoration?
3. Register appropriate to placement? (Session screens stay quiet.)
4. Passes the human-touch question?
5. Palette: near-monochrome + at most one hand-applied accent?
6. Would it still work in greyscale? (Composition test.)
7. Audit trail recorded (prompt + sref + human-pass note) alongside asset?

---

## 9. Device Library (approved — 8 devices)

Every device is named, mapped to a `brand.md` concept, and carries a prompt
scaffold. Prompts get: scaffold + master DNA block (§3) + `--sref` anchors
(§4). Coverage: devices 1 & 7 carry the critique; 2, 4, 5 the method;
3 & 6 the identity/soul; 8 the product's personality. Killing a device
removes its argument from the visual system.

### D1 — The Strike-Through
- **Maps to:** Rejects / "willing to reject a weak answer and ask again."
- **What:** word or sketch crossed out in pencil, correction beside it,
  the rejected thing still legible.
- **Motion:** the line draws itself, slow, once.
- **Use:** hero D+C fusion (e.g. "logo" struck through), in-product
  push-back moments.
- **Scaffold:** `a handwritten word crossed out with a single decisive
  pencil line, a shorter correction written beside it in the same hand,
  both still legible, graphite on warm ivory paper`

### D2 — The Construction
- **Maps to:** derivation over decoration / auditability.
- **What:** compass geometry, center points, radius measurements, guide
  lines visible (vesica anchor 2 is the canonical instance).
- **Motion:** unfolds line by line in drawing order.
- **Use:** brand.md-generation moment, How It Works.
- **Scaffold:** `[form] constructed with compass and straightedge,
  construction lines and center points left visible, radius measurements
  handwritten in pencil, one earlier attempt struck through`

### D3 — The Half-Cut Stencil
- **Maps to:** Identity / "who are you" — and the product's name.
- **What:** face or mark partially cut from paper, knife guide lines
  visible, uncut half still outline. Identity mid-emergence.
- **Motion:** the cut progressing one segment.
- **Use:** hero candidate, Act 0 opener.
- **Scaffold:** `a [face/mark] as a paper stencil, half cut out, scalpel
  guide lines still visible, the uncut half remaining as faint pencil
  outline, cut edges casting a hairline shadow`

### D4 — The Proof Sheet
- **Maps to:** belief shift — "slow enough to find the true answer."
- **What:** grid of small attempts, most crossed out, one circled. The
  cost of the true answer as inventory.
- **Motion:** sequential cross-outs, then the circle. The ONLY device
  allowed an extended sequence — duration is its meaning.
- **Use:** process sections, What You Get.
- **Scaffold:** `a working proof sheet, grid of small thumbnail
  [sketches/words], most crossed out in pencil, one circled, sparse modern
  handwriting in margins, short notes and dates in pencil and ballpoint,
  crop marks` + `--no medieval manuscript, calligraphy, antique`

### D5 — The Registration Cross
- **Maps to:** "every asset traces back to positioning."
- **What:** two translucent sheets (positioning layer + output layer)
  brought into register, crosses aligning. Print-shop language for the
  architecture.
- **Motion:** layers slide into alignment with a weighted settle.
- **Use:** Stencil→Frame explanation, section transitions.
- **Scaffold:** `two translucent tracing paper sheets overlaid slightly
  out of register, printers registration crosses on each nearly aligned,
  the lower sheet carrying faint pencil writing showing through`

### D6 — The Elevated Ordinary (Register B)
- **Maps to:** Audience — "a real reason to exist, never forced to
  articulate it."
- **What:** one mundane founder object (flattened sticky note,
  coffee-ringed page) small and centered on a vast dark field.
- **Motion:** none, or barely perceptible light shift.
- **Use:** proof/dogfooding, testimonial frames.
- **Scaffold:** Register B scaffold (§3) with founder-desk objects as
  subjects. Anchor 4 frame 3 is canonical.

### D7 — The Blank Templates ⚠ PROBATION
- **Maps to:** Rejects — "one Canva template away from a brand that
  means nothing."
- **What:** neat stack of identical blank logo templates, deadpan, evenly
  lit; optionally one pushed slightly out of the stack. The enemy, without
  commentary.
- **Use:** Problem/Tension section ONLY. Max once per page, ever. Pure
  critique — highest smugness risk; must pass vibe test in pixels before
  page use. Deadpan or dead.
- **Scaffold:** `a neat tall stack of identical blank logo template
  sheets, evenly lit, deadpan frontal composition, one sheet pushed
  slightly out of the stack, no people`

### D8 — The Margin Annotation
- **Maps to:** "the experience of being asked is itself the
  differentiator."
- **What:** clean central element, handwritten question in the margin,
  small arrow pointing in. The interrogator without a mascot.
- **Motion:** handwriting appears at writing speed.
- **Use:** in-product push-backs (Act 0 push-back copy can render this
  way), pull quotes.
- **Scaffold:** `a clean [element] centered on the page, a short
  handwritten question in pencil in the margin with a small arrow pointing
  toward it, plenty of empty paper`

### Device selection rule (the "what goes here" query)
Given a placement: (1) identify the section's argument (critique / method /
soul / personality); (2) shortlist devices carrying that argument;
(3) check register fits the placement map (§2); (4) check the page's device
budget — max 3 distinct devices per page, D7 max once; (5) run the §8 audit
gate. If no device fits, the section may not need an image (R0 is a valid
answer).
