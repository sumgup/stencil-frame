# Landing Page — Art Direction Plan
*S+ confirmed direction. Validation rider in place. Build specifications below.*

Date locked: 2026-07-24  
Reference: `design/hero-S-plus.html` (direction artifact)  
Process: Art-Derivation sessions A/B/D + control tests (see `design/DISPOSITIONS-LOG-v2.md`)

---

## Direction Card

**Surface class:** Brand surface (loud) — landing only, not product.

**Purpose:** Make a positioning-skeptical founder feel credible, empowered, and ready to see their brand differently. So they book a real session.

**Emotional arc:**
1. **Opening beat:** Confrontation ("most brands fail") + self-implication ("we tried this. twice.")
2. **Evidence beat:** Proof of method (D8 trace, data)
3. **Revelation beat:** What becomes possible (Gap Map discovery)
4. **Action beat:** Invitation to session (not a signup — a real interaction)

---

## Visual Language (S+ Register)

### Hero Section
- **Foundation:** Glare yellow field (`#ffe600`) — Swiss warning/clarity register.
- **Typography:** 
  - Signature: Anton condensed (digital stand-in for hand-made Sumit type)
  - Body: Mona Sans 400/500
- **Color discipline:** Black text on yellow field. Monochrome imagery. Zero candy idiom.
- **Marginalia layer:** 3 hand-drawn asides + positioning arrows.
  - Sumit's real handwriting (SVG originals), one-off per build.
  - Stance: self-implicating ("we tried this. twice.") — hand comments on severity.
  - Placement: physically attached to key phrases (margins, under claims).
  - Max 6 words per aside (absolute 10 max).
- **Material:** Flat fields only. Paper ground whisper (`#f4f1e8`) for quiet sections. No texture on interactive elements.

### Interior sections
- **Registers:** Editorial-print dominant. Swiss glare at revelation beats only. Industrial annotation for D8 references.
- **Color:** Near-black ink (#0a0a0a) on paper ground. Blueprint blue (#2b50c8) for annotation + links. Glare yellow rationed by arc.
- **Typography:** Mona Sans primary. DM Mono for data/code. Fraunces at reveal moments only.
- **Marginalia:** 
  - Elsewhere sections: max 3 total (rationed across screen). Skippable by definition.
  - Drop marginalia below 768px before shrinking it.

---

## Copy amendments (from root DESIGN.md §1 cascade)

### Action layer
- **Old:** Product-waitlist signup (email collection).
- **New:** INTERVIEW + WIP
  - CTA framing: "Book a positioning session" (not "try the tool" / "join waitlist")
  - Disclosure: "Work in progress. We're testing with five founder sessions first."
  - Session flow: Book → participate in 25-minute positioning interview → we build your brand live → you see the output.
  - How It Works: describes human-led session with Stencil as the instrument, not the hero.

### D8 fragments
- **Old reference:** "(Frame)" — specifies the tool.
- **New reference:** "any generator" — brand.md-as-standard strategy. The system works with any content engine.

### Proof/Dogfooding artifact
- Replace marketing claims with real interview-session evidence.
- Show actual founder Q&A, actual brand.md output, actual carousel from real session.
- No generated imagery — only real artifacts.

---

## Marginalia register specifications

See `skills/copy-engine/register-marginalia.md` for full rules. Key constraints for landing:

**Hard rules (enforce before build):**
1. ALWAYS Sumit's real hand — one-off originals (tablet/SVG), never a font.
2. Max 3 per screen (hero = 3 budget).
3. Skippable by definition — remove all asides, page must still work completely.
4. ≤6 words preferred, 10 absolute max.
5. Stance: self-implicating ("we tried this. twice."), never cheerleading.
6. Banned: unlock, journey, magic, seamless, supercharge, game-changer, haha, lol, emojis.
7. Placement: physically attached (margins, arrows, under CTAs).

**Examples (GOOD for this page):**
- "we tried this. twice."
- "the slow way. sorry."
- "no mood boards. promise."
- "this took us six months to admit."

---

## Validation rider

**First five concierge sessions** (post-launch) serve as passive field test of the marginalia register.

**Criteria for re-opening decision:**
- Do founders read the asides?
- Do they affect trust or tone perception?
- Does the register survive real usage, or does it feel like costume?

**Re-open protocol:** If usage shows disconnect (founders skip asides, or perceive as unprofessional), re-derivation runs with evidence of why. Disposition logged; decision re-confirmed/revised/killed.

Until evidence says otherwise: marginalia register confirmed for landing.

---

## Reference artifacts

- **hero-S-plus.html** — direction test of hero section (glare field, Anton, Fraunces reveal, 3 hand asides + arrows).
- **second-ink-test-G-vs-B.html** — control test of Blueprint blue (#2b50c8) light-ground vs earlier gold candidate.
- Both in `design/explorations/` — reference only, not production files.

---

## Build checklist

Before shipping landing page, verify:

- [ ] Hero: glare yellow field, black type, monochrome imagery
- [ ] Marginalia: 3 asides in hero (Sumit's real hand, SVG originals)
- [ ] All marginalia: self-implicating stance, ≤6 words, skippable
- [ ] Copy: action layer reframed as interview + WIP disclosure
- [ ] CTA: "Book a positioning session" (not waitlist)
- [ ] How It Works: describes human-led session
- [ ] D8 references: "any generator" not "(Frame)"
- [ ] Proof section: real interview evidence, no generated imagery
- [ ] Accessibility: asides are accessible text; arrows aria-hidden
- [ ] Responsive: marginalia drops below 768px
- [ ] Color contrast: blue on yellow tested for small text
- [ ] Motion: animation only in state communication, none decorative
- [ ] Reduced motion: all animations wrapped in `@media (prefers-reduced-motion: no-preference)`

---

## Sign-off

Art direction locked by Sumit, 2026-07-24.  
To re-open: evidence only (usage data, founder feedback tied to specific asides).  
Validation runs through five concierge sessions; marginalia register re-opens only if evidence warrants.
