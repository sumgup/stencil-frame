# form-casting.md
> Overture · reference file 03
> Loaded at Step 5. Form is a casting decision made AFTER the spine and hook
> exist. The question: which body makes this story's tension visible at the
> least production cost? Choosing form first is a violation — restart Step 3.

---

## F-01 · Stop-motion frame sequence (filmed stills)
- **Body:** real paper, real pencil, real cuts, photographed as keyframes;
  individual stills become SVG keyframe data or an image sequence.
- **Casts well for:** S-01, S-02, S-03 — any spine where evidence accumulates.
- **Cost:** one capture session; false-start takes, macro inserts, and
  handheld coverage captured in the same session at minimal added cost.
- **Web delivery:** image sequence or short WebM loop; poster = final frame.
- **Provenance note:** this is the truest form for the territory — the human
  touch is literal, not styled.

## F-02 · Kinetic typography (live type, Rubato-performed)
- **Body:** Register D type animated in-browser — sequential reveal,
  enter/exit, strike-through as drawn SVG path over live text.
- **Casts well for:** S-01 (the Correction is natively typographic), H-05.
- **Cost:** code only; motion verbs and timings already exist (P-05, P-06,
  motion-tokens.md).
- **Guard:** Midjourney never touches letterforms; C-marks composited as
  overlays. Animation demonstrates meaning or it is cut — no type moving
  for movement's sake.

## F-03 · Scroll-driven sequence
- **Body:** the story unfolds under reader control — self-drawing SVG lines,
  construction appearing beat by beat as the page scrolls.
- **Casts well for:** S-02 across a full section (How It Works).
- **Cost:** GSAP/Lenis work; budget against Coda's perf gates — P-06 owns the
  page's only per-frame job, so scroll sequences must be scrub-based, not a
  second rAF loop.
- **Guard:** one motion event per viewport still applies; a scroll story is
  a sequence of single events, not continuous spectacle.

## F-04 · Screen recording (real artifact)
- **Body:** actual product footage — the Act 0 session, the brand.md being
  generated. Never staged, never mocked.
- **Casts well for:** demo placement; S-02, S-03 told through the real thing.
- **Cost:** requires the product state to be stable (the filmed question needs
  stable push-back copy — standing constraint).
- **Guard:** real artifacts only. A fabricated recording breaks the proof
  claim the entire page rests on.

## F-05 · Static + one motion verb (the minimal cast)
- **Body:** a still (Art-Direction produces it) with a single device motion —
  the line draws itself once, the handwriting appears at writing speed.
- **Casts well for:** section-motion everywhere; the default answer.
- **Cost:** near-zero above the still itself.
- **Note:** when in doubt, cast down to F-05. Restraint is the house style;
  R0 (no motion) remains a valid casting result.

---

## Casting rules
1. Prefer the cheapest form that makes the tension visible. Production value
   is not an argument; evidence is.
2. Filmed forms (F-01, F-04) outrank generated imagery whenever the beat's
   claim is proof ("this is real") — real artifacts over fabricated mockups.
3. Every cast declares its poster frame and reduced-motion behavior at
   casting time, not at build time.
4. Sound is never load-bearing. The only approved sound moment is P-11's
   opt-in stroke.
5. Duration ceilings by placement (Step 2) are hard: hero-loop ≤ 15s loop,
   demo ≤ 60s, episode-open ≤ 20s, teaser 6–15s. A story that needs more
   time than its placement allows is cast to a different placement, not
   granted an extension.
