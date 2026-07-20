---
name: copy-engine
description: 7-step co-thinking copywriting process. Reads brand.md for voice/positioning and personas/*.md for audience targeting. Two modes — co-thinking (interactive, for high-stakes copy) and generation (auto-populated, for microcopy and bulk). Every output traces to raw material gathered in the process — no invented claims, no filler.
---

# Copy Engine — Co-Thinking Copywriting Process
## Stencil + Frame

> **Why "co-thinking":** The old pipeline generated copy FROM brand.md.
> This skill generates copy WITH the writer, using brand.md and persona.md
> as inputs. The writer's involvement is not optional — it's the mechanism
> that produces copy worth reading.
>
> **Position in the stack:** brand.md provides identity/voice. persona.md
> provides audience/language. Art-Direction provides visual register.
> Rubato provides typographic performance. **Copy-engine provides the words
> and the process to find them.**

When this skill is invoked, determine the mode first, then execute steps
in order. Do not skip steps or merge them.

---

## Mode Selection

Ask on invocation (or infer from the request):

**CO-THINKING MODE** (default for new content types, high-stakes copy,
landing pages, manifestos, brand copy, any first-time piece):
- Steps 1–5 are interactive — the writer is interrogated
- Steps 6–7 are generation + check
- Best when: the strategic decisions haven't been made yet

**GENERATION MODE** (for microcopy, social posts, email subject lines,
bulk content, iteration on an established piece):
- Steps 1–4 auto-populate from brand.md + active persona.md
- Steps 5–7 execute with the writer choosing structure
- Best when: positioning, audience, and angle are already locked
- The skill NEVER silently defaults to generation mode for a new content type

---

## Step 0 — Load context

Read from the repo (clone if needed — project knowledge snapshots are not
authoritative):

- `brand.md` (root) — hold: Purpose, Difference, Personality tension,
  Voice do's/don'ts, Guardrails, Registers
- `personas/_active.md` — which persona is loaded
- `personas/[active-persona].md` — the full persona file
- `skills/copy-engine/references/frameworks.md` — PAS, AIDA, BAB, etc.
- `skills/copy-engine/references/structures.md` — MAR, GAV, SYM, etc.
- `brand.md` → `personality.creative_stance` — hold: `primary_tension`,
  `supporting`, `archetype_hint`. These govern tone, density, motion
  personality, and visual register for this output. If the field is
  absent, proceed without it (v0.x brands may not have it yet).

brand.md is the source of truth for voice. persona.md is the source of
truth for audience. If anything below conflicts, these files win.

If `_active.md` says `persona: all`, prepare to generate variants for
each persona file found in `personas/` (excluding `_active.md`).

---

## Step 1 — WHO (the interrogation)

**Co-thinking mode:**
Read the active persona.md as starting material. Then confirm with the
writer:
- "We're writing to [persona name]. Are they in [this situation]?"
- "What's their emotional state entering this piece?"
- "What did they just read/do before this?"

Challenge and deepen. The persona is a starting hypothesis, not a
finished answer. If the writer surfaces something new, offer to update
the persona file.

If NO persona exists: run the full interrogation:
- Who is one specific person you're writing to? (Not a segment — one person.)
- What did they just Google / what tab did they just close?
- What do they currently believe (even if wrong)?
- What's the private, embarrassing moment they'd recognize themselves in?

At the end, offer: "Save this as a new persona? [Y/N]"

**Generation mode:**
Auto-load persona.md. State the loaded persona and awareness stage.
Proceed to Step 2 without interrogation.

Output: Confirmed target person with emotional state and context.

---

## Step 2 — ONE THING (single desired reaction)

Force one sentence: "After reading this, they should think: ___"

Rules:
- ONE reaction. Not three. Not two. One.
- Push back if vague ("understand the product" is not a reaction)
- Push back if two goals are smuggled in
- Present 3-4 options if the writer is stuck

Output: One locked sentence.

---

## Step 3 — RAW MATERIAL (the Ogilvy/Schwartz phase)

This is the biggest step. The writer is interrogated, not asked to "provide
a brief." Techniques:

- "What would a skeptic say here?"
- "Don't your competitors say the same thing?"
- "What's the proof?"
- Mafia Offer challenge: "If I'm your best prospect, convince me — and I'll
  tell you when you sound like everyone else."
- "What are you ANGRY about?"
- "What's the specific, private, embarrassing moment?"

Present options (multi-select) when the writer needs help surfacing material.
Gather: facts, competitor claims, customer language (from persona.md VoC),
objections, proof, emotional moments, origin stories.

In generation mode: auto-compile from brand.md + persona.md pain points,
beliefs, objections, and VoC. Present the compiled material for writer
confirmation before proceeding.

Output: Compiled list of ammunition. Every item attributed to its source
(writer, persona.md VoC, brand.md).

---

## Step 4 — ANGLE (Schwartz diagnosis)

Answer two questions:

**(a) Awareness stage:** Where is the reader on the awareness ladder?
Read from persona.md's awareness-by-channel field if available.
- Unaware → lead with story/identity, not product
- Problem-Aware → lead with the problem (name it better than they can)
- Solution-Aware → lead with mechanism/approach
- Product-Aware → lead with proof/differentiation
- Most Aware → lead with offer/CTA

**(b) Market sophistication:** How many times has this reader heard a
similar claim? Read from persona.md. Higher sophistication = need for
new mechanisms, story leads, reframes. Direct claims fail in saturated
markets.

Output: One-sentence brief:
"This [piece] will convince [person] that [one idea] because [proof]."

Writer must approve the brief before proceeding.

---

## Step 5 — SCAFFOLDING (choose the structure)

Present 2-3 structural options with genuine differentiation. Each option
must have:
- A name (MAR, GAV, SYM, or new names as warranted)
- A one-line description of the emotional arc
- The risk / what could go wrong
- "Feels like: [metaphor]"

Explain each structure before asking the wri