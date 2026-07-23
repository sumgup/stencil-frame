# OVERVIEW — Where Everything Lives
Purpose: navigation for the repo's decisions, skills, and knowledge. Update when a canonical home moves.
Golden rule: every decision has ONE home. If you can't find it here, it isn't decided.

## Where decisions live (by question)

| "What did we decide about…" | Canonical home |
|---|---|
| Brand positioning, values, voice | `brand.md` |
| Visual system: colors/inks, type, surfaces, devices, registers | `DESIGN.md` (incl. §0 = open decisions; after Stage 3 merge) |
| Why decisions were made (audit trail, July 2026 run) | `design/DISPOSITIONS-LOG-v2.md` |
| Design philosophy (stable principles) | `DESIGN_PHILOSOPHY.md` |
| Session emotional arc | `DESIGN.md` (arc: uncertainty → confident → revelation → awe). `EMOTIONAL_DESIGN_LANGUAGE.md` = ARCHIVED, superseded — do not build from it |
| Landing page: sections, copy, art direction | landing brief (Project docs) + Stage 3 amendments (S+, interview-WIP) |
| Who we're designing for | `personas/` (`_active.md` points to current; creative-entrepreneur = landing persona) |
| Product structure (5 acts), architecture | `ARCHITECTURE.md`, `stencil/` |
| Strategy: Frame gated, brand.md = standard, name/logo meanings | `design/DISPOSITIONS-LOG-v2.md` §STRATEGY (mirror into `ROADMAP.md`) |
| What to build next | `ROADMAP.md`, `BUILD_PLAN.md`, Project_Management queue files |

## Quick answers (examples)
- **Fonts?** → DESIGN.md Typography v2: hand-made display (Sumit; Anton as digital stand-in),
  Mona Sans + DM Mono workhorse, Fraunces leashed to reveal lines, real-hand marginalia.
- **Colors?** → DESIGN.md Color v2: ink black #0a0a0a, glare-yellow field #ffe600 (rationed by arc),
  second ink blueprint blue #2b50c8, paper #f4f1e8 / dark #080f0a grounds, coral = mascot + session
  errors, gold RETIRED.
- **Can I add an animation?** → Rubato tokens only; one entrance pattern; signatures rationed
  (Correction = landing, construction-resolve = revelation beats).

## Skills (`skills/`) — what each does
| Skill | Layer | Job |
|---|---|---|
| `art-directing-web/` | Process (brand-agnostic) | HOW to art direct any surface: 5-move loop, emotion moodboarding, control tests, dispositions |
| `Art-Direction/` | System (S+F-specific) | WHAT our direction is: Process-as-Provenance devices D1–D8, registers |
| `copy-engine/` | System | Copy pipeline, registers (confrontational home, self-implicating, poetic-protected, marginalia) |
| `Rubato/` | System | Typography performance + motion tokens (SOLE motion source) |
| `Overture/` | System | Hero video/motion narrative (story spines, hooks) |
| `Coda-Engine/` | Process | Finish gates, judged surfaces, micro-interaction patterns |
| `interface-engine/` | System | UX macro-patterns, brand.md-conditioned pattern selection |
| `Typography-Research/` | Reference | 2025–26 expressive type/motion research |

## Decision flow (how a design decision travels)
```
brand.md ──► direction card (art-directing-web, Move 1)
                 │
                 ▼
   capture sessions / evidence (Move 2)
                 │
                 ▼
   disposition: re-confirm / revise / kill  ──►  design/DISPOSITIONS-LOG (the WHY)
                 │
                 ▼
        DESIGN.md (the WHAT — canonical)
                 │
                 ├──► skills/* encode it as reusable capability
                 └──► build (Claude Code / Claude Design) consumes DESIGN.md + skills
```

## Known drift to fix when touched
- `EMOTIONAL_DESIGN_LANGUAGE.md` → add ARCHIVED banner (superseded).
- Frame-app UI kit palette (red/pink/gold placeholder) → superseded by Color v2; rebuild at gate.
- `ROADMAP.md` → reflect Frame-gated strategy.
- Operational cockpit palette (DAILY.html) predates type/color v2 — reconcile on next render.
