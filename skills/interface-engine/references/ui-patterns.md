# UI Patterns — Macro Flow Patterns + Sourcing

Reference for Interface Engine Step 4 (Select macro patterns). Written July 2026
from a research pass on open-source pattern libraries, datasets, and AI-driven
pattern recommendation. Two parts: (§1) the working pattern selection rules,
(§2) the sourcing layer — where pattern knowledge lives, licensing, and the
recipe for a future `suggest_pattern` capability inside Stencil + Frame.

---

## §1 Macro patterns — when they earn their place

Selection rule (inherited from SKILL.md): a pattern is chosen only when its
"earns its place" condition is met by the flow spec. Cite the condition in the
audit trail, not the pattern name alone.

| Pattern | Earns its place when | Fails / anti-pattern when |
|---|---|---|
| **Wizard (linear multi-step)** | Steps have a required order; each step's answer shapes the next; user is first-time or infrequent | Expert users need random access; steps are independent (use hub) |
| **Hub-and-spoke** | Sections are independent, completable in any order, revisited often | There is a real dependency chain — hub hides the required sequence |
| **Progressive disclosure** | Full option set would overwhelm; 80% of users need 20% of controls | Hidden options are ones most users actually need (disclosure becomes burial) |
| **Inline validation** | Field correctness is checkable locally, immediately (format, availability) | Validation needs whole-form context — premature red states punish mid-typing |
| **Summary/review step** | Action is consequential or irreversible; inputs span multiple screens | Low-stakes flows — an extra step is pure friction |
| **Optimistic UI** | Action almost always succeeds and is cheap to roll back | Failure is common or rollback is confusing/destructive |
| **Live artifact preview** (Stencil default) | The output document IS the progress indicator — brand.md assembling visibly | Output is abstract/non-document — preview becomes decoration |
| **Empty states as onboarding** | First-run screen would otherwise be blank; one clear next action exists | Used to hide missing functionality |

Stencil session bias: **wizard with visible artifact assembly** — the session
is a dependency chain (positioning before voice before visuals) and the
brand.md-as-live-preview is the overview mechanism (see ui-overview.md).

## §2 Sourcing layer — pattern knowledge bases, datasets, licensing

### Seed taxonomies (license-clean, machine-readable)
- **RavenMCP** (ravenmcp.ai, MIT) — 129 design principles, 22 UI patterns,
  12 design-system token sets in W3C DTCG format. Cleanest MIT seed.
- **ui-ux-pro-max-skill** (github.com/nextlevelbuilder/ui-ux-pro-max-skill, MIT) —
  CSV corpus (UI styles, palettes, font pairings, UX guidelines, reasoning rules)
  + Python BM25 search emitting markdown. Blueprint for retrieval-then-rerank.
- **UX Patterns for Devs** (uxpatterns.dev) — ~46+ patterns as MDX, 17-section
  structure, ships an MCP `suggest_pattern` tool. **License landmine:** README
  says dual MIT-noncommercial/commercial; site FAQ says plain MIT. Resolve
  before any commercial reuse. Reference its architecture, not its content.
- **Human-readable taxonomy sources** to encode by hand: UI-Patterns.com
  (goal/task-organized — maps cleanly to journey-map stages), Welie.com (120+
  patterns), PatternFly (Red Hat, open source, usage guidance + code).

### Datasets (visual/data-driven layer — later, optional)
- **Enrico** (MIT) — 1,460 labeled screens, 20 design topics. Coarse: topics,
  not interaction patterns.
- **Rico** — 66k+ screens with JSON view hierarchies. **Research-use license,
  NOT open source. Never redistribute or ship derived content.**
- **Screen2Vec** — GUI screen embeddings for similar-screen retrieval.
- **UICrit** (UIST '24) — 3,059 designer critiques of 983 UIs; few-shot
  examples reportedly give ~55% gain in LLM-generated UI feedback quality.

### The `suggest_pattern` recipe (future capability — Frame/Stencil roadmap)
Proven architecture (Duan et al. CHI '24 Figma-JSON heuristic feedback; Flowy
multi-screen flow annotation; uxpatterns.dev MCP):
1. Pattern taxonomy as structured markdown files (this file is v0 of that) —
   each entry: name, earns-its-place condition, anti-pattern condition,
   journey-stage tags, accessibility notes.
2. Input = journey map / flow spec in markdown or JSON (no vision model needed —
   AI-agnostic sweet spot).
3. Retrieve (BM25 or embeddings) → any-LLM re-rank with rationale.
4. Expose as one model-agnostic function: `suggest_pattern(context) → ranked
   patterns + rationale`.
5. Differentiator no one ships: condition recommendations on **brand.md** —
   positioning-aware pattern selection. Every suggestion traces to a brand.md
   field. Same auditability rule as everything else.
Visual input (screenshot captioning / Figma condensed JSON) is a bolt-on,
not a prerequisite.

### Reliability rule
LLM pattern recommendations are a first pass, never ground truth: automated
feedback underperforms experts and degrades over design iterations (Duan et
al.). Every machine suggestion passes through the Step 6 audit trail like any
human choice.

## Self-check (visible, per use)
- [ ] Pattern cited with its earns-its-place condition, not name alone
- [ ] Anti-pattern condition checked against the flow spec
- [ ] Any external pattern content verified license-clean (no Rico, no
      unresolved uxpatterns.dev content)
- [ ] Machine suggestions marked as such in the audit trail
