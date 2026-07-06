# Design Philosophy — Stencil + Frame

## The one rule
Every design decision — interface, sound, visual — must have a structural 
justification, not just an aesthetic one. Beauty is a result, not a reason.

---

## Cross-domain fusion

UI, sound, and visual work are designed together, not in isolation.
The three domains borrow structure from each other:

- A UI can be organized by **counterpoint** (two independent streams 
  that resolve together)
- An emotional arc can follow **fugue structure** (subject → imitation 
  → development → resolution)
- Visual hierarchy can mirror **musical dynamics** (ff → p, loud to quiet, 
  primary to secondary)
- Loading states are **tension**. Output is **resolution**. 
  Design both, not just the success state.

When designing anything, ask: which music theory structure or visual arts 
principle maps to what this feature *does*? Then use that structure literally.

---

## Music structures to draw from

| Structure | What it does | UI/design equivalent |
|---|---|---|
| Fugue | Subject stated, then imitated by other voices | One core interaction repeated in transformed ways across screens |
| Counterpoint | Two independent lines, richer together | Two parallel data streams (brand + brief) resolving at output |
| Sonata form | Exposition → development → recapitulation | Onboarding → exploration → confirmation |
| Call and response | Statement demands reply | Every agent output is a call. Human edit is the response. |
| Tension / resolution | Dissonance pulls toward consonance | Empty state = dissonance. Generated output = resolution. |
| Theme and variation | Same idea, transformed each time | Same component, different context, building familiarity |
| Dynamics (ff → pp) | Loudness as meaning | Visual weight = importance. Primary action is fortissimo. |

---

## Visual arts structures to draw from

| Structure | What it does | Design equivalent |
|---|---|---|
| Chiaroscuro (Baroque) | Extreme light/dark contrast | Dark backgrounds, single illuminated focal point |
| Surrealist juxtaposition | Unexpected collision creates meaning | Cross-domain collisions in naming, layout, copy |
| Cubist multiple perspectives | Same subject from many angles simultaneously | Show brand from positioning + visual + voice at once |
| Negative space (Magritte) | Absence is as meaningful as presence | What the UI doesn't show is a design decision |

---

## Dopamine and work structure

> *Personal workflow context — describes how Sumit structures his own creative sessions.
> Not a rule for Claude to apply when designing interfaces or evaluating design decisions.
> For system design rules, see §Cross-domain fusion and §Instructions for Claude.*

Productive dopamine comes from **surprise at your own output**.
Structure every session to hit this:

- Use constraints (arbitrary rules that force unexpected paths)
- Use tools that resist you, not just obey you
- Cross domains deliberately — apply music logic to code, visual logic to copy
- Author systems and rules, not outcomes directly

**Spontaneity tools in active use:**
- Kontakt 8: Chords, Phrases, Patterns, Leap, Humanizer
- Ableton: Arpeggiator, Random, Scale MIDI effects
- Code: p5.js, Three.js with noise functions, generative CSS animations

---

## Naming conventions

Names for subproducts, modules, and components are drawn from:
- Classical music: Bach, Beethoven, Mozart (Baroque through Romantic)
- Visual arts: Picasso, Magritte, Frida Kahlo, Surrealism
- Musical terms: Fugue, Sonata, Coda, Cadence, Opus, Motif
- Art movement names

Rules:
- Female artists must be represented — this is not a male-dominated palette
- Names are only used when there is a **logical/structural correspondence** 
  to the component's role
- Never use a name just because it sounds good

---

## Instructions for Claude

When Sumit is designing any interface, sonic asset, or visual:

1. **Propose music/art structures** that could govern the design — don't 
   wait to be asked. Sumit may not know which applies.
2. **Explain the structural correspondence** — not just the name. 
   "This follows fugue structure because..." not just "think of it like a fugue."
3. **Surface the cross-domain collision** — what does borrowing this 
   structure from music actually change about the interface?
4. **Default to constraints** when starting a new design. 
   Constraints create the surprise.
5. **Never decorate with these references** — only use them when they 
   change a decision.
