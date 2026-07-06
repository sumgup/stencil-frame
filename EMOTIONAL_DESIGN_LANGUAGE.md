# Stencil + Frame — Emotional Design Language
*Captured: June 2026*
*Born from a single conversation about what software can feel like.*

---

## The Core Idea

Every screen in Stencil is a stage. Every stage has an emotion. Every emotion is conveyed through a combination of motion, typography, sound, visual art, and space — working together as a language with grammar and vocabulary.

This is not a design system. It is a design language. The difference:
- A design system tells you what components to use
- A design language tells you what things mean

---

## The Emotional Arc — Four Acts

The session follows the emotional shape of a musical composition.

| Act | Session name | Emotional word | What the user feels |
|---|---|---|---|
| Act 0 | Who Are You | **Origin** | Uncertain, searching, introspective |
| Act 1 | Warm Up | **Noise** | Expansive, opening up, relief |
| Act 2b | The Gap Map | **Gap** | Sharp, revelatory, lights coming on |
| Act 3 | Confirm | **Born** | Quiet, solid, something real happened |

The emotional words are internal. They guide every design decision but never appear in the UI.

---

## The Vocabulary — Things That Carry Emotion

### Form
The blob-to-icosahedron morph is the central metaphor. Chaos to structure. Searching to found. The brand finding its shape.

- Act 0 — Pure amorphous blob. Maximum organic chaos.
- Act 1 — Blob with hints of geometry. Structure beginning to emerge.
- Act 2b — Blob and wireframe coexisting. Revelation.
- Act 3 — Full icosahedron. Edge glow birth animation. Something came alive.

### Motion
Speed, direction, and easing carry emotional meaning. Never animate without reason.

- Fast, irregular = restless, searching (Act 0 blob)
- Slow, expansive = opening up (Act 1)
- Sharp snap = decisive, revelatory (Act 2b gap reveal)
- Near stillness = settled, complete (Act 3)
- Held pause = respect, intention (the 5-second continue button)

### Typography
Four layers. Each layer has one job, one axis, one scale, one opacity.

**Layer 1 — Vertical hero (Mona Sans Variable — display role, wght 800, wdth 125, uppercase)**
The session name runs full height, bottom to top. Arrives bold. Holds. Recedes to atmospheric. Sets the stage before anything else appears. Authority through scale and restraint.

**Layer 2 — The question (DM Serif Display)**
Horizontal. Masked slide-up reveal. Line by line. The actor entering after the curtain has risen. Mixed upright and italic — upright is statement, italic is invitation.

**Layer 3 — Labels (DM Mono, tiny, high letter-spacing)**
Structural. Never decorative. Encodes position in the journey.

**Layer 4 — Whisper (DM Mono, even tinier)**
The quietest voice. Almost not there. Carries the honest instruction.

**The grammar of typographic arrival:**
Vertical hero arrives first (authority) → recedes → question slides up (human scale) → whisper appears last (intimacy). Two movements simultaneously — one stepping back, one stepping forward. Counterpoint.

### Colour
- `#080f0a` — British Racing Green deep dark. Not black. Not forest. Heritage authority.
- `#c8a96e` — Gold accent. Warmth within authority. Used sparingly — one element per screen maximum.
- `#f0ede6` — Warm white for primary text. Never pure white.
- `#6a7a6a` — Muted green-grey for secondary text.
- Everything else approaches darkness.

### Sound
One composed motif. Never fully resolves until Act 3. Each act gets a variation:

- Act 0 — Single sustained note. The motif not yet stated. (Triangle wave, D4, very quiet)
- Act 1 — Motif introduced, incomplete. Second voice enters.
- Act 2b — Motif develops. Tension builds.
- Act 3 — Motif resolves. The suspension lifts. Edge glow and sonic resolution happen together.

The user never hears a different song per screen. They hear the same idea growing. Structural, not decorative.

### Space
Emptiness is meaningful. What is not on screen is a design decision.

- Act 0 — Almost nothing. One question. Lots of darkness. The user is alone with themselves.
- Act 2b — The gap on the map IS the gap in the market. The empty space is the content.
- Act 3 — Returns to spaciousness after the density of Act 2. Resolution through openness.

### Timing
- The continue button is held for 5 seconds before activating. You cannot rush Act 0.
- The example button only appears after 25 seconds of inactivity. Offered, never imposed.
- Text arrives at breath pace, not typing pace. The software is unhurried.

---

## The Grammar — How Vocabulary Combines

Every screen follows the same structure:

**Set the stage → Create tension → Offer → Resolve**

This grammar is repeatable. Every future feature Stencil builds follows it. New vocabulary, same grammar.

Example — Act 0:
1. FIND YOUR GAP arrives vertical (set the stage)
2. Recedes to atmospheric — what comes next? (tension)
3. Question slides up (offer)
4. Cursor blinks, waiting (resolve into action)

---

## Visual Art Direction

### The Gap Obys fills that we identified

Typography and motion alone are structural. They create authority and emotional shape but they do not create the felt sense of a world. Images — the right kind — pull attention before the brain engages. That is what Obys has that we identified as missing.

### What we are NOT doing

- No stock photography
- No AI-generated images that feel generic or textured in the recognisable AI way
- No illustration that explains the content (that is decoration, not emotion)

### What we ARE doing — Two tracks

**Track 1 — p5.js generative backgrounds (build first)**

Each act has a generative visual canvas running behind everything. Not the blob — something separate. A visual that embodies the emotional word of that act.

| Act | Emotional word | Generative visual |
|---|---|---|
| Act 0 | Origin | Particles slowly coalescing from chaos into a loose form. Something being gathered from nothing. |
| Act 1 | Noise | Overlapping signals, interference patterns. Information competing for space, gradually sorting. |
| Act 2b | Gap | A vast field. Small clustered objects at the edges. The centre is empty and open. |
| Act 3 | Born | A single clear form emerging from darkness. Stillness after movement. |

These are not decorative. The visual IS the emotion made visible. Structural correspondence.

**Track 2 — One hero image per act (add after Track 1)**

Sourced from public domain art or generated with precise aesthetic direction. Dark, textural, surrealist leaning. Emotionally true, not literally true — in the tradition of Magritte.

Conceptual direction per act:
- Act 0 — A hand holding clay that has not yet taken shape
- Act 1 — Multiple voices speaking simultaneously, overlapping
- Act 2b — A wide landscape with a clearing in the centre
- Act 3 — The same hand, clay now formed, releasing it

Start with Track 1. See if generative art alone is enough. Add Track 2 only if something still feels missing.

### The surrealism principle

Magritte works because the image is impossible but emotionally true. We want images that make no logical sense and perfect emotional sense. Not realistic. Not explanatory. Emotionally true.

---

## How to Think — The Framework

This is the meta-level. The thinking process that generates everything above.

**1. Start with the emotion, not the feature.**
Before designing any screen: what is the user feeling when they arrive? What do they need to feel when they leave? Design the transition between those two states.

**2. Find the structural correspondence.**
What in music, visual art, or nature has the same emotional shape as this screen? Use that structure literally, not decoratively. The blob morph follows sonata form. The typographic arrival follows counterpoint. These are not metaphors — they are the actual structure.

**3. Design the contrast.**
Emotion only exists in relation to something else. Act 3 feels settled only because Act 0 felt searching. Design the arc, not the individual moment. Every screen needs to know what came before and what comes after.

**4. Trust restraint.**
One thing carries the emotion per screen. Everything else gets quiet so that one thing lands. The vertical text in Act 0. The gap on the map in Act 2b. The writing animation in Act 3. Chanel's rule: before leaving the house, remove one accessory.

**5. The medium is the message.**
In Stencil the brand process IS the emotional experience. Finding your gap should feel like finding your gap — uncertain at first, revelatory in the middle, quiet and true at the end. The software does not describe the journey. It enacts it.

**6. Nothing animates without reason.**
Every pixel that moves carries an emotional intention. If you cannot state why something moves, remove the movement.

---

## This Is Reusable

This thinking framework — the emotional vocabulary, the grammar, the principle of structural correspondence — is not specific to Stencil. It is a design practice.

Every product built after this can use the same framework:
- What is the emotional arc?
- What structural correspondence governs the visual language?
- What is the grammar of each screen?
- What is the one thing per screen that carries the emotion?

This is Sumit's design language. It emerged from building Stencil. It will outlast it.

---

## References and Influences

- **Michael Johnson** — Branding in Five and a Half Steps (methodology)
- **Jacqueline Novogratz** — Manifesto for a Moral Revolution (values layer)
- **Obys Agency** — cinematic web design, images as emotional anchors
- **Nils Frahm / Ólafur Arnalds** — restraint and space as design principle
- **Magritte** — emotionally true over literally true
- **Bach** — structural correspondence, counterpoint, fugue as design grammar
- **p5.js / Three.js** — generative visuals as original, alive, structurally honest art

