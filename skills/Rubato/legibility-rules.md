# Rubato — Legibility & Accessibility Rules

This file is what Step 3 (Recommendation pass) scores against. Every rule
below must produce a **named reason string** when it fires — "not
recommended" alone is not an acceptable output.

## 0. Script branch (evaluate first, before anything else)

Script determines which rule set applies. This must run before length/case
rules, not after — CJK vertical is native and legible; Latin vertical is not.

| Script | Vertical treatment | Rule set |
|---|---|---|
| CJK (Chinese/Japanese/Korean) | `writing-mode: vertical-rl` + `text-orientation: mixed` | Always **allow**, skip Latin-specific vertical penalties below |
| Latin | any vertical | Full scoring below applies — vertical is a legibility risk, not a default |
| RTL (Arabic/Hebrew) | — | Route through troika/bidi-aware rendering for any 3D/split treatment; flag if bidi support unconfirmed |

## 1. Role gate

| Role | Eligible for extreme treatments? |
|---|---|
| `display` / `heading` | Yes — full catalog eligible |
| `body` | No — only `oversized-balanced-headline` and static/no-motion treatments allow; everything else vetoes with reason `"body role — extreme treatments reserved for display/heading"` |
| `UI-chrome` | No — same as body, plus: no split-stagger (screen reader cost too high for repeated UI elements) |

## 2. String length + word length

| Treatment | Length ceiling | Reason string if violated |
|---|---|---|
| `radial` | ≤ ~12 characters, ≤ 2 short words | `"string exceeds radial's ~12-char ceiling — rotated glyphs compound legibility cost with length"` |
| `vertical` (Latin) | ≤ 1 short word or acronym | `"Latin vertical restricted to single short words — longer strings measurably slower to read (Yu et al. 2010)"` |
| `axis-choreo` (extreme axis ranges) | headline-length only | `"axis-choreo at full range reserved for headline-length strings"` |
| `marquee-ticker` | no hard ceiling, but role-gated to non-informational/decorative only | `"marquee is the slowest-to-read treatment in the catalog — reserve for decorative, non-critical strings"` |
| `oversized-overlap`, `collage-grid` | display-length (short phrases, not sentences) | `"overlap/collage treatments assume short phrase-length content; long strings break the packing"` |
| body-measure treatments (`oversized-balanced-headline` as body-adjacent, any body text) | 45–75 characters per line ideal | `"line length outside 45–75 char measure — veto below 35 or above 90"` (Bringhurst) |

## 3. Case

- Radial, vertical: **prefer UPPERCASE**. Mixed/lowercase case downgrades verdict from `recommend` to `allow` with reason `"lowercase reduces legibility at small angular sizes — uppercase preferred for radial/vertical"`.
- Not a veto on its own — a downgrade signal.

## 4. Reading level / audience / accessibility context

- If context flags a lower reading level or high-accessibility audience: down-rank all extreme treatments one tier (`recommend` → `allow`, `allow` → `veto`), reason: `"audience/accessibility context — down-ranking expressive treatments per context signal"`.

## 5. Motion — reduced-motion (hard gate, not a downgrade)

- If `prefers-reduced-motion` is signaled: every treatment with a motion component **must** swap to its cataloged fallback. This is a substitution, not a veto of the underlying static treatment — e.g. `axis-choreo` with reduced-motion still renders the static axis values, just without the animated transition.
- No treatment may autoplay for more than 5 seconds without a pause control (WCAG 2.2.2). Missing pause control = veto, reason: `"autoplay >5s without pause control — WCAG 2.2.2"`.
- No treatment may exceed 3 flashes/sec (WCAG 2.3.1) — hard veto, no exceptions, reason: `"exceeds flash threshold — WCAG 2.3.1"`.

## 6. Contrast

- `background-clip-text` and any image/video-in-text treatment: if contrast against the background media cannot be guaranteed, veto outright regardless of other signals, reason: `"cannot guarantee WCAG contrast against background media — requires solid-color fallback"`.

## 7. Split-text accessibility (structural requirement, not a scoring signal)

- Any `split-stagger` treatment must ship `aria-label` (full string) on the parent and `aria-hidden="true"` on every shard. Missing this pairing is a veto, reason: `"split text without aria-label/aria-hidden pairing — screen readers would announce letter-by-letter"`.

## 8. Reflow / zoom

- Any treatment using fixed units (e.g. `offset-path`'s `path()`) that breaks at 400% zoom or reflow: veto with reason `"fixed-unit path breaks reflow at 400% zoom"`, fallback to the static equivalent.

---

## Verdict assembly

For a given treatment, apply gates in this order:
1. Script branch (§0) — may short-circuit straight to allow (CJK vertical)
2. Hard vetoes (§5 flash/pause, §6 contrast, §7 ARIA, §8 reflow) — any one firing = `veto`, stop
3. Role gate (§1) — fail = `veto`
4. Length/word rules (§2) — fail = `veto`
5. Case (§3), reading-level (§4) — downgrade only, don't veto alone
6. If nothing fired: `recommend` if no downgrades applied, else `allow`

Every treatment always resolves to *some* verdict — there is no "unscored" state. If every treatment in the catalog vetoes for a given input, `oversized-balanced-headline` is the guaranteed floor (per its catalog entry, it can only be vetoed by the reflow/contrast/flash gates, which don't apply to it).
