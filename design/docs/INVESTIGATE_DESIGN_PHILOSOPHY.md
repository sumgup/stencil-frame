# Stencil + Frame — Design Philosophy
*Captured: June 2026*

---

## Core Principle
**Every pixel that moves carries an emotional intention. Nothing animates without reason.**

Animation in Stencil is not decoration. It is communication. Every motion, glow, transition, and pause expresses the emotional state of the user at that moment in the session. The interface feels alive because the brand process is alive.

---

## The Blob as Metaphor

The central visual element of the Find Your Gap session is a morphing 3D form that begins as an organic blob and ends as an icosahedron. This is not decorative — it is the brand finding its form.

| State | Form | Meaning |
|---|---|---|
| Before the session | Nothing | The brand does not exist yet |
| Act 0 | Amorphous blob | Pure potential. No shape. Clay before the hands touch it. |
| Act 1 | Blob with hints of geometry | Opening up. Structure beginning to emerge. |
| Act 2b | Blob and wireframe coexisting | Revelation. The market landscape reveals the structure underneath. |
| Act 3 — before confirm | Near-geometric, barely moving | Held breath. Almost there. |
| Act 3 — confirm triggered | Full morph to icosahedron | Birth. The brand has found its form. |
| Act 3 — settled | Icosahedron, edges glowing then resting | Something came alive. Now it breathes. |

---

## Emotional State → Animation Behaviour

Every act has an emotional texture. The animation expresses it.

| Act | Emotional state | Blob behaviour | Speed |
|---|---|---|---|
| Act 0 | Searching, uncertain | Fast, irregular, restless morphing | Fast |
| Act 1 | Opening up, expanding | Slower, larger, more expansive | Medium |
| Act 2a | Focused, purposeful | Nearly still — user has left the emotional space | Minimal |
| Act 2b | Revelation, sharp | Geometry pulls through the blob | Medium-fast |
| Act 3 pre-confirm | Held breath | Very slow rotation, barely moving | Very slow |
| Act 3 confirm | Birth, arrival | Full morph + edge glow | Dramatic then settling |
| Act 3 settled | Quiet authority | Steady slow rotation, edges at rest | Very slow |

---

## The Edge Glow — Birth Animation

When the user confirms in Act 3 and the morph completes, the icosahedron edges pulse with a slow glow for 3–4 seconds. Not a flash. A breath. Like something waking up. Then it settles into steady slow rotation.

**Technical:** Each edge brightness oscillates on a sine wave after morph completion. Peak glow at ~1.5 seconds. Settles to resting state by 4 seconds.

**Emotional intention:** You just gave birth to something. It is alive. It is breathing. Then it rests.

---

## Philosophy Applied Everywhere

Not just the blob. Every interactive element carries emotional state through micro-animation.

| Element | Emotional state | Animation |
|---|---|---|
| Input cursor in Act 0 | Unhurried, patient | Blinks slower than normal |
| Competitor cards in Act 2b | Weight, significance | Each lands with a small settle — weight being placed |
| brand.md lines in Act 3 | Considered, deliberate | Appears at breath pace, not typing pace |
| Gap zone appearing | Released tension | Expands outward from nothing — held breath released |
| Continue button | Respect for the process | Held for 5 seconds before it activates |
| Example panel | Offered, not imposed | Slides in only when user hesitates |

---

## What This Is Not

- Not animation for visual interest
- Not motion to signal modernity
- Not transitions to fill time

Every motion is earned by the emotional moment it serves.

---

## Reference
This philosophy emerged from the observation that brand creation is an emotional process, not a mechanical one. The software's visual language should reflect that — the interface should feel like it understands what the user is going through, not just what they are doing.

Inspired by: Nils Frahm, Ólafur Arnalds (restraint and space in music as design principle), and the clay metaphor — form emerging from formlessness through honest work.


---

## Relationship to project-level design philosophy

This document covers the animation system specific to the Investigate session.

The project-level design philosophy (committed to git as `DESIGN_PHILOSOPHY.md`) covers:
- Cross-domain fusion (UI, sound, visual designed together)
- Music theory structures (fugue, counterpoint, sonata form)
- Visual arts structures (chiaroscuro, surrealist juxtaposition)
- Naming conventions
- Dopamine and work structure

The blob metaphor and animation emotional states described here are a direct application of that philosophy. Specifically:

- The blob→icosahedron morph follows **sonata form** — exposition (blob, Act 0), development (gradual geometry, Acts 1–2), recapitulation (confirmed form, Act 3)
- The edge glow is **resolution** — the tension of the formless blob resolves into the consonance of geometric form
- Animation speed as emotional state maps directly to **dynamics (ff→pp)** — Act 0 is fortissimo (restless, searching), Act 3 is pianissimo (settled, complete)

Both documents must be read together for the full picture.
