# /design — Feature Design Pipeline

The agent prompt library for Stencil + Frame. Every feature goes through this pipeline before a line of production code is written.

---

## The pipeline

```
01-research-agent.md        → brief.md
02-ux-flow-agent.md         → ux-flow.md
03-visual-direction-agent.md → visual-direction.md   ← human taste decisions here
04-wireframe-agent.md       → wireframe.html + wireframe.md
                                      ↓
                              [FIGMA APPROVAL GATE]
                                      ↓
05-styling-agent.md         → React components (styled)
06-motion-agent.md          → Motion layer added
07-testing-agent.md         → test-spec.md + .test.ts + .spec.ts
```

## Memory files (every agent reads these)

`MEMORY.md` contains three sections:
- `SYSTEM.md` — locked architecture + design rules
- `FEATURES.md` — shipped feature registry + component map
- `DESIGN.md` — visual system, tokens, motion principles

Update `FEATURES.md` every time a feature ships.

## Where feature files live

```
/design/
  prompts/           ← agent prompt templates (this folder)
  MEMORY.md          ← system + feature + design memory
  features/
    <feature-slug>/
      brief.md
      ux-flow.md
      visual-direction.md
      wireframe.html
      wireframe.md
      test-spec.md
      journey-map.md  ← Stencil session features only (see note below)
```

**`journey-map.md` scope note:** Required only for Stencil session features (the guided
brand-discovery flow — Act 0 through Act N). Not required for landing page features or
Frame features. `ux-flow.md` already specifies emotional arc and five states for all
features; `journey-map.md` supplements it with the act-by-act current-state arc
(what the user feels before the session, act by act, and what shifts) that
`EMOTIONAL_DESIGN_LANGUAGE.md` uses as its source material. Do not create it for
non-session features — that would add overhead without benefit.

## Execution modes

**Chat (no API key):**  
Open Claude.ai. Paste the system prompt from the relevant agent file into custom instructions. Paste your input into the chat. Copy the output into the corresponding file.

**Claude Code (with API key, automated):**  
Tell Claude Code to run a specific agent with specific input/output paths. It reads the agent prompt, reads the input files, writes the output files.

**The pipeline works identically in both modes.** Only the execution changes.

## Starting a new feature

1. Create `/design/features/<feature-slug>/` folder
2. Run Research Agent → save `brief.md`
3. Run UX Flow Agent → save `ux-flow.md`
4. Run Visual Direction Agent → resolve all `[YOUR CALL]` items → save `visual-direction.md`
5. Run Wireframe Agent → review artifact → export to Figma → get approval → save `wireframe.html` + `wireframe.md`
6. Run Styling Agent (Claude Code) → review components
7. Run Motion Agent (Claude Code) → review motion in browser
8. Run Testing Agent (Claude Code) → commit tests → they define "done"
9. Build the feature until all tests pass
10. Update `FEATURES.md` with new components and patterns

## Reusing this system for other projects

The agent prompts are generic. The only Stencil + Frame-specific content is in:
- The Visual Direction Agent's "aesthetic universe" section → replace with your project's references
- MEMORY.md → replace with your project's architecture and design system

Everything else — the pipeline structure, the five-state discipline, the test-from-UX-flow approach — works for any software project.
