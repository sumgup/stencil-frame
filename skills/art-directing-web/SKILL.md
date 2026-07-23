---
name: art-directing-web
description: Brand-agnostic process for art directing any web page (landing, product, editorial). Use when starting the design of a page or surface, when choosing visual direction, colors, type, or materials, when moodboarding for an emotion, when evaluating design trends, or when reviewing/re-deriving existing design decisions. Runs as a dialogue: the human is the art director; Claude interrogates, pattern-reads gut reactions, structures, and builds tests. Not for brand-specific specs (see Art-Direction skill for the Stencil+Frame system).
---

# Art Directing a Web Page (v0.2)
Status: hand-proven through one full re-derivation run (July 2026: direction, 3 capture sessions, control tests, dispositions). Graduates into ART_DIRECTION_SKILL.md when proven on a second surface.
Sources: Clarke, *Art Direction for the Web*; re-derivation research (July 2026); Sessions A/B run live.
Format: a dialogue between art director (Sumit) and partner (Claude). Sumit decides; Claude interrogates, pattern-reads, structures.

---

## The spine

Intent first. Reference second. Always.
A movement, trend, or reference is vocabulary quoted to serve a feeling — never the philosophy that generates it.

Five moves, run as a loop (production feeds back to direction):

```
1 DIRECTION → 2 REFERENCE → 3 VISUAL LANGUAGE → 4 COMPOSITION + NARRATIVE → 5 PRODUCTION
        ↑ ______________________________ feedback ______________________________ ↓
   [ continuous: ITERATION — prototype in browser from move 3 on ]
   [ continuous: CONSTRAINTS — brand, content, tech, accessibility ]
```

---

## Move 1 — Direction
Output: a direction card. Nothing visual may be decided before it exists.
- Surface class: brand surface (loud) / product surface (quiet) / editorial (between).
- One purpose line: "this page exists to make [persona] feel [feeling] so they [action]."
- 3–5 emotional keywords — feelings the person has, never adjectives about the design.
  Sharpen fuzzy words against an emotion wheel ("energetic" → anticipation? urgency? aggression?).
- If the page is a sequence (session, article, long-scroll), write the emotional arc as beats.
- Blind-derivation check when revisiting old work: write the card without opening existing
  docs, then diff. Convergence = ownership. Divergence = the work, located.

## Move 2 — Reference (moodboarding for an emotion)
1. TRANSLATE: emotion → 8–10 semiotic signifier terms before any searching.
   (e.g. "uncomfortable clarity" → glare, diagnosis, X-ray, hazard signage, correction marks.)
2. SOURCES: ≥3 non-design domains (photo, film, scientific imagery, packaging, architecture);
   ≤1 web-design source. Prefer offline / anti-algorithmic archives.
3. CAPTURE: 30 minutes, timer, gut-first, no filtering. Then top 5, one gut word each.
4. ANNOTATE each keeper: (a) which emotional keyword it serves, (b) the MECHANISM producing
   the feeling — scale, contrast, light flatness, crop, gaze. Only mechanisms transfer.
5. SORT by emotional beat (arc columns), not by medium.
6. KILL any image that can't name keyword + mechanism. EXTRACT one design rule per mechanism.
   Then retire the board. Boards are scaffolding, not shrines.
- Partner's job: pattern-read the top 5 — name what the gut consistently chose. The pattern
  usually lives in behavior (composition, color-as-material, texture), not in artifacts (fonts, hues).

## Move 3 — Visual language
- Register dials per surface class from the fixed movement palette (editorial / brutalist
  structure / industrial accent / punk energy / maximalist density). Blend ratios, not one trend.
- Type, color role, surface material, motion — each decision must cite the direction card
  keyword it serves. "Looks good" is not a rationale.
- Slop guard: distinctiveness lives at the display layer. Hand-made signature elements beat
  font-shopping. Test candidate hues/materials on REAL content, fresh eyes, 24–48h gap,
  five-second gut pick — never finalize while primed from a capture session.

## Move 4 — Composition + narrative
- Scenes, not sections. Every scene advances one beat of the arc; a scene that can't name
  its beat is cut or merged.
- Draw the emotional score by hand: x = scroll position/scenes, y = intensity, annotated
  with the governing keyword per beat. One page, before any layout.
- Dynamics rule: loud devices are rationed by the arc. A signature device (field color,
  display serif, hero animation) appears only at its designated beats; scarcity is what
  makes it legible as meaning.

## Move 5 — Production
- Prototype in the browser as soon as move 3 roughs in; the build is a design instrument.
- Vibe-check actual outputs before locking. What the build teaches is allowed to revise move 1.
- Finish gates: responsive floor, keyboard focus, reduced-motion, contrast.

---

## Standing rules (earned in practice, July 2026)
1. Locked decisions reopen ONLY when the evidence they rested on changes. Moodboard browsing
   is not evidence. Re-opened decisions get one of three fates, each with one line of
   rationale: re-confirmed / revised / killed. Nothing silently redone.
2. Same-day rule: never finalize a color/style choice on the same day as its capture
   session. Primed taste is not taste.
3. Multiple visual languages may coexist only under one governing concept; per-surface
   registers ride on one consistent underlying system.
4. The idiom carries the meaning, not the hue: identical colors read kiddish in one register
   (candy borders, bouncy shadows) and severe in another (hard type, monochrome photo,
   one flat field). Judge executions, not swatches.
5. Trend literacy: keep a living note of current aesthetics recording what each SIGNIFIES
   and what it's REACTING AGAINST — quote trends like idiom, deliberately, in context.
6. Partner discipline: Claude does not design ahead of the art director. Concept comes from
   Sumit; Claude structures, interrogates, pattern-reads, and builds tests on request.
7. One decision per exchange where possible. Sessions are timed and bounded. New ideas
   mid-process go to the inspiration queue, not into the current move.

---

## v0.2 additions (learned in the July 2026 full run)

### Materiality (Move 3 extension)
Every screen pretends to be made of something; choose the material consciously.
Substrate honesty, not skeuomorphism: texture on surfaces never on controls; no simulated
depth/bevel/gloss; textures real or honestly hand-made (scanned, not CSS imitation);
function stays digital. Test every texture: "evidence of making, or costume?"

### Two-ink discipline (Move 3 extension)
Model color as a print system: ink(s) + field + ground, each with a named job. A field color
is rationed by the emotional arc (arrives at revelation beats). A second ink does annotation
work. Adding a color = adding an ink: it must name its job or it doesn't enter.

### Two-voice structure (Move 4 extension)
Severity and warmth stop competing when given separate layers: typeset voice carries the
diagnosis; a real-hand marginalia voice carries humanity. The hand may puncture the typeset
voice's authority, never the argument. Asides are skippable by definition.

### Control tests (Move 3 rule, hardened)
- Style verdicts on real content only, fresh eyes, 24h gap, five-second gut pick.
- The 24h gap may be waived ONLY when the candidate was nominated by a prior day's evidence
  and the semantics are structural — and even then, final values tune at build time.
- When the decider is not the audience (founder taste vs persona response), the verdict goes
  to persona-adjacent humans, or ships with a validation rider tied to real usage.

### Disposition protocol (standing)
Re-derivations demote locked decisions to hypotheses; each ends re-confirmed / revised / killed
with one line of rationale, logged in a dispositions file, merged to the canonical design doc.
