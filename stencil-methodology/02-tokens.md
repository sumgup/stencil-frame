# 02 — Token Library

> **Scope note:** Stencil *methodology* system (see `01-foundations.md` for full disambiguation). Not the same token set as `design/tokens.json` (root brand/landing system — bg/gold/warm-white/coral) or `penpot/foundation-library/01-foundations-spec.md` (built from that same, unrelated `tokens.json`).
>
> Transcribed verbatim from Figma (Sprint 2 output, "Token Library" page, "Stencil + Frame · Design System · Sprint 2 · Derived from Stencil Book v1.0"). Source: pasted screenshot, 2026-08-08. Not independently re-verified against live Figma. 31 tokens across 9 foundations. Values marked TBD require implementation testing; decided values are specified by the book.

---

## Typography — 4 tokens

### Heading
- **Purpose:** Primary display type. The worked-at surface. Largest, most assertive typographic moment.
- **Derived From:** Visual Grammar
- **Status:** TBD
- **Suggested Value:** TBD

### Body
- **Purpose:** Reading text. The information substrate. Clarity above expression.
- **Derived From:** Visual Grammar · Composition Grammar
- **Status:** TBD
- **Suggested Value:** TBD

### Annotation
- **Purpose:** Editorial voice. Margin notes, labels, diagnostic text. Stencil speaks only here.
- **Derived From:** Interaction Grammar · Composition Grammar
- **Status:** TBD
- **Suggested Value:** TBD

### Disposition
- **Purpose:** The founding character. Brand-specific expressive typographic moment.
- **Derived From:** Visual Grammar · brand.md
- **Status:** TBD
- **Suggested Value:** TBD

---

## Spacing — 4 tokens

### EvidenceGap
- **Purpose:** Tightest interval. Between marks belonging to the same claim.
- **Derived From:** Composition Grammar
- **Status:** TBD
- **Suggested Value:** TBD

### MarginGap
- **Purpose:** Editorial interval. Separates Stencil's voice from the founder's work.
- **Derived From:** Spatial Grammar · Composition Grammar
- **Status:** TBD
- **Suggested Value:** TBD

### WorkspaceGap
- **Purpose:** Standard rhythm of the working surface. Between discrete objects.
- **Derived From:** Spatial Grammar (Desk)
- **Status:** TBD
- **Suggested Value:** TBD

### WallGap
- **Purpose:** Maximum interval. Distance for comparison and the second look.
- **Derived From:** Spatial Grammar (Wall) · Composition Grammar
- **Status:** TBD
- **Suggested Value:** TBD

---

## Grid — 3 tokens

### MarginWidth
- **Purpose:** Width of the editorial column. Stencil speaks only here; centre belongs to the founder.
- **Derived From:** Composition Grammar · Interaction Grammar
- **Status:** TBD
- **Suggested Value:** TBD

### CentreWidth
- **Purpose:** Maximum width of the founder's working area.
- **Derived From:** Composition Grammar · Spatial Grammar
- **Status:** TBD
- **Suggested Value:** TBD

### GutterWidth
- **Purpose:** Separation between columns when multiple evidence sets must coexist.
- **Derived From:** Composition Grammar
- **Status:** TBD
- **Suggested Value:** TBD

---

## Stroke — 3 tokens

### Hair
- **Purpose:** Hairline weight. Construction lines, guide lines, registration marks. Not yet committed.
- **Derived From:** Visual Grammar (Trace — guide lines, registration marks)
- **Status:** TBD
- **Suggested Value:** TBD

### Trace
- **Purpose:** Working weight. The visible path of a mark in progress.
- **Derived From:** Visual Grammar (Trace — the visible path of making)
- **Status:** TBD
- **Suggested Value:** TBD

### Mark
- **Purpose:** Committed weight. The sealed line. Part of the record.
- **Derived From:** Visual Grammar (Evidence — retained decision)
- **Status:** TBD
- **Suggested Value:** TBD

---

## Corner Radius — 1 token

### Surface
- **Purpose:** Radius of all working surfaces, sheets, and containers. Rounded corners simulate comfort — Stencil surfaces hold marks and commit to a boundary.
- **Derived From:** Visual Grammar — rounded cards are an explicit counterexample
- **Status:** Decided
- **Suggested Value:** 0

---

## Elevation — 1 token

### Sheet
- **Purpose:** Elevation of all working surfaces. Flat, on the substrate. Floating surfaces claim authority through appearance rather than evidence.
- **Derived From:** Visual Grammar — drop shadows, glassmorphism are explicit counterexamples
- **Status:** Decided
- **Suggested Value:** 0

---

## Color — 6 tokens

### Paper
- **Purpose:** The substrate. Background of all working surfaces.
- **Derived From:** Visual Grammar (near-monochrome substrate) · Material Grammar
- **Status:** Principle decided; value TBD
- **Suggested Value:** TBD — near white

### Graphite
- **Purpose:** Primary mark. Text, committed lines, sealed work.
- **Derived From:** Visual Grammar (contrast, intervention)
- **Status:** Principle decided; value TBD
- **Suggested Value:** TBD — near black

### Pencil
- **Purpose:** Secondary mark. Subdued annotation, guide text, unverified content.
- **Derived From:** Visual Grammar (imperfection) · Material Grammar (pencil — reversible)
- **Status:** Principle decided; value TBD
- **Suggested Value:** TBD — mid gray

### Ghost
- **Purpose:** Erased residue. Struck-through content, withdrawn proposals. Must remain legible.
- **Derived From:** Visual Grammar (rejected alternatives remain visible) · Material Grammar
- **Status:** Principle decided; value TBD
- **Suggested Value:** TBD — very light gray

### Blueprint
- **Purpose:** Construction state. Marks that indicate something is being built, unverified. Resolution rests. The record has changed.
- **Derived From:** Visual Grammar ("Blueprint blue may indicate construction") · Material Grammar
- **Status:** Principle decided; value TBD
- **Suggested Value:** TBD — blue family

### Coral
- **Purpose:** Error only. Contradiction, inconsistency, failed validation. Reserved — never decorative.
- **Derived From:** Visual Grammar ("Coral remains reserved for error")
- **Status:** Principle decided; value TBD
- **Suggested Value:** TBD — coral family

---

## Motion — 6 tokens

### Observe
- **Purpose:** Duration of the observation phase. Quick scan before judgment. Fastest beat in the system.
- **Derived From:** Motion Grammar — Law 1 (Observation is quick)
- **Status:** TBD
- **Suggested Value:** TBD

### Pause
- **Purpose:** Duration of withheld judgment. The moment where nothing moves. Silence is not absence.
- **Derived From:** Motion Grammar — Law 3 (Continuity) / Law ~ (judgment receives time)
- **Status:** TBD
- **Suggested Value:** TBD

### Correction
- **Purpose:** Duration of the decisive act. Single edit/act. Snappy — authority comes from decisiveness.
- **Derived From:** Motion Grammar — Law 2 (Correction is decisive)
- **Status:** TBD
- **Suggested Value:** TBD

### Commit
- **Purpose:** Duration of the surface settling after commitment. Resolution rests. The record has changed.
- **Derived From:** Motion Grammar — Law 5 (Completion)
- **Status:** TBD
- **Suggested Value:** TBD

### Withdraw
- **Purpose:** Duration of a proposal's retraction. Only Stencil's uncommitted work may withdraw; founder proposals may withdraw too.
- **Derived From:** Motion Grammar — Law 4 (Persistence: only uncommitted work may withdraw)
- **Status:** TBD
- **Suggested Value:** TBD

### Easing
- **Purpose:** The single decisive easing curve. No bounce, no overshoot. Authority comes from precision, not force.
- **Derived From:** Motion Grammar — Law ~ (Weight: consequence, not force/bounce)
- **Status:** TBD
- **Suggested Value:** TBD

---

## Material — 3 tokens

### Carrier
- **Purpose:** Working surface. Receives marks, retains history, may be annotated. Analogous to paper.
- **Derived From:** Material Grammar (Carrier Materials: paper, pencil, tracing paper)
- **Status:** TBD
- **Suggested Value:** TBD

### Apparatus
- **Purpose:** Organizing surface. Frames and holds evidence — does not itself receive primary marks. Analogous to desk or folder.
- **Derived From:** Material Grammar (Apparatus Materials: desk, folder, clip)
- **Status:** TBD
- **Suggested Value:** TBD

### Overlay
- **Purpose:** Transparent supersession layer. Prior version remains visible beneath. Analogous to tracing paper laid over the original.
- **Derived From:** Material Grammar ("tracing paper is the material of supersession")
- **Status:** TBD
- **Suggested Value:** TBD

---

## Transcription notes

- 31 tokens total, matching the source page's own count: Typography (4), Spacing (4), Grid (3), Stroke (3), Corner Radius (1), Elevation (1), Color (6), Motion (6), Material (3).
- Only 2 tokens have **Decided** numeric values: `CornerRadius.Surface` (0) and `Elevation.Sheet` (0) — consistent with `01-foundations.md`.
- Color tokens are "principle decided" (the *role* of each color is settled — e.g. Coral = error only) but no token has an actual hex value locked yet. This matches the Foundations page's Color status ("Principle decided; values TBD").
- Motion token "Derived From" law numbers in the source screenshot were partially obscured by overlapping text in a few cells (Pause, Withdraw, Easing) — the law citations above are the best reading of what's visible; flagged as `[verify against Figma]` for those three specifically, since the exact law number matters for traceability and I don't want to assert a number I can't fully confirm from the image.
