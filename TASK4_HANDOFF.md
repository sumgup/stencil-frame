# Task 4 handoff — assemble copywriting SKILL v0

## Context
Stencil + Frame. Session Zero is done: Voice layer + minimal brand.md are
complete (see brand.md in this repo — Identity, Positioning, Voice all
filled, including Personality). This task builds Frame's v0 copywriting
engine as a Claude Code Skill.

## Goal
One `SKILL.md` + one `copy-frameworks.md` (skills/copy-engine/), reading `brand.md` for context. Input:
{content_type + short brief}. Output: on-voice copy, self-checked against
brand.md's Voice do's/don'ts before returning.

**Resist making it good. v0 works once. It's not a product yet.**

## Files to produce
1. `SKILL.md` — the skill definition Claude Code loads. Should:
   - Read `brand.md` from the project root for Identity/Positioning/Voice
   - Accept a content_type (tagline, hero line, manifesto paragraph, CTA,
     boilerplate, social post, etc.) and a short brief
   - Generate copy in Stencil + Frame's voice
   - Self-check output against the 5 do's / 5 don'ts before returning —
     flag any violation rather than silently fixing it, so the check is
     visible and auditable (consistent with the "every chapter traces back
     to Chapter 1" principle — the self-check should be traceable too)
   - Do a light anti-slop pass (cut buzzwords, hedging language, exclamation
     points doing emotional work — see brand.md Guardrails section)

2. `copy-frameworks.md` — reference material the skill draws on:
   - Core four: Schwartz, Ogilvy, Halbert, Wiebe (canon, described not
     reproduced — paraphrase technique/approach, don't quote their copy)
   - CoppieGPT 232-formula taxonomy (from the saved competitive landscape
     report — pull the taxonomy structure, not verbatim text)
   - prompts.chat (CC0) and Corey Haines' marketingskills collection as
     structural references for prompt/instruction patterns
   - Anti-slop guidance (MIT-licensed skills referenced in project research)

## Do NOT
- Do not re-derive Voice or Positioning — brand.md is the source of truth,
  lift from it directly
- Do not build a coded API route yet — that's held until Week 10 per the
  plan. SKILL.md form factor only, invoked directly in Claude Code
- Do not over-engineer the self-check — a simple pass/flag against the 5
  do's/don'ts is enough for v0

## Test plan (Task 5 preview — don't do this yet, just know it's coming)
Once assembled, the very next step is running the skill against
Stencil + Frame's own Brand Book: tagline, hero line, manifesto paragraph,
waitlist CTA, boilerplate. That's the payoff step — "I built a copywriting
engine and aimed it at myself."

## Reference
- brand.md (this repo) — Identity, Positioning (9 fields), Voice (philosophy,
  5 do's, 5 don'ts, 3 reference moves, 3 anti-examples), Guardrails
- STENCIL_FRAME_PLAN.md — overall 22-week plan, Johnson's methodology context
- Competitive landscape report — CoppieGPT taxonomy source, positioning map
