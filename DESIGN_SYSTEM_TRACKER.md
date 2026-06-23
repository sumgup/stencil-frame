# Stencil + Frame — Design System Tracker
*Living document — updated as decisions are made*
*Last updated: June 2026*

---

## Status legend
- ✅ Decided and locked
- 🔄 In progress
- ⬜ Not started
- 🅿️ Parked for later

---

## Colour
✅ Background: `#080f0a` — British Racing Green dark
✅ Accent: `#c8a96e` — Gold
✅ Accent dim: `#5a4520`
✅ Text primary: `#f0ede6` — Warm white
✅ Text secondary: `#6a7a6a`
✅ Text dim: `#1a2a1a`
✅ Text ghost: `#0e1a0f`

⬜ Semantic colours — success, error, warning states
⬜ Brand identity card colours — one per brand (already in brands-dataset.json, needs design token formalisation)

---

## Typography
✅ Vertical hero — Fraunces 900, uppercase
✅ Questions — DM Serif Display, mixed upright + italic
✅ Labels — DM Mono, high letter-spacing (0.2–0.35em)
✅ Body / input — DM Sans 300/400
✅ All fonts free — Google Fonts

⬜ Type scale — formal sizing scale (h1, h2, body, label, whisper) in CSS variables
⬜ Font loading strategy — preload in HTML head, fallback stack

---

## Icons
✅ UI icons — Phosphor Icons (thin line, no fill, open source)
⬜ Conceptual icons — custom hand-drawn SVGs for:
   - Values
   - Gap
   - Identity
   - Purpose
   - Market
   - Confirm
   (6 icons total — draw in Figma or Illustrator, ink-soul aesthetic)

---

## Illustration system
✅ Style direction — Dark Surrealism + Ink Soul hybrid
   - Surrealism governs composition and concept
   - Ink texture governs surface and materiality
   - Reference: Magritte (concept) + Frida Kahlo / Basquiat (texture)

✅ SD prompt formula:
   `[subject], dark surrealist oil painting, ink wash texture,
   expressive mark-making, deep shadows, cinematic,
   single focal point, painterly, grain, no text, no watermark,
   dark background`

⬜ Act illustrations — one per act, Sumit generating in Stable Diffusion locally:
   - Act 0 (Origin) — "Two hands emerging from darkness, one holding formless clay"
   - Act 1 (Noise) — "Multiple overlapping voices as physical waves colliding in dark space"
   - Act 2b (Gap) — "A vast dark landscape with single beam of light falling on empty ground"
   - Act 3 (Born) — "A geometric form emerging from a cocoon of organic matter, first light"

⬜ Brand identity cards — typographic interpretation per brand (not logos):
   - Muji — thin grey, minimal, absence of decoration IS the brand
   - Oatly — chunky type, oat yellow, irreverent
   - ColorFlix — bold, hot pink, slightly offset
   - Paper Boat — warm orange, nostalgic, hand-lettered feel
   - Zepto — electric purple, sharp, modern
   - Frida Kahlo — deep magenta, large, original floral element
   - Basquiat — raw gold, imperfect, original crown motif (ink-soul direction)

---

## Motion and animation
✅ Blob → hexagram morph system (see INVESTIGATE_DESIGN_PHILOSOPHY.md)
✅ Emotional words per act drive animation speed (Origin/Noise/Gap/Born)
✅ Edge glow birth animation on Act 3 confirm
✅ Focus Mode — Pattern A (auto-recede on typing, return on 2s pause)
✅ Vertical hero — 3-phase animation (arrive bold → hold → recede)
✅ Masked text reveal — DM Serif Display slides up per line
✅ Typewriter hint — appears after 4s pause, types brand example

⬜ Page transitions between acts — currently fade, consider more cinematic options
⬜ Scaffold draft card — entrance animation finalised in prototype but not in code
⬜ Brand pill overlay — grand entry animation (name large, colour wash, typographic)

---

## Brand dataset

### The eight reference brands

| # | Brand | Type | Origin | Colour | Status |
|---|---|---|---|---|---|
| 1 | Muji | Product / everyday goods | Japan | `#8a8a82` warm grey | ✅ in dataset |
| 2 | Oatly | Food and drink | Sweden | `#c8b820` oat yellow | ✅ in dataset |
| 3 | ColorFlix | Cosmetics | India | `#e8205a` bold pink | ✅ in dataset |
| 4 | Paper Boat | Beverages | India | `#d4521a` warm orange | ✅ in dataset |
| 5 | Zepto | Quick commerce | India | `#6c3ce1` electric purple | ✅ in dataset |
| 6 | Frida Kahlo | Artist / individual brand | Mexico | `#c8254a` Frida magenta | ✅ in dataset |
| 7 | Basquiat | Artist / individual brand | USA | `#e8c830` crown gold | ✅ in dataset |
| 8 | Niharika NM | Instagrammer / creative identity | India | `#ff6b35` electric coral | ⬜ add to dataset |

### Why Niharika NM
Built a sharp comedy and lifestyle identity that stood against the polished
influencer template explicitly. South Indian, female, distinctly herself.
Her gap: relatable, self-aware Indian woman humour at a time when Instagram
India was dominated by Bollywood glamour or aspirational wealth. Her brand
is her voice, not her aesthetics. Makes her the ideal individual creative
identity to deconstruct alongside the corporate and artist brands.

### Niharika NM — answers to add to dataset
**Q1:** "I make comedy that sounds exactly like the voice in every South Indian girl's head that she was told to keep quiet."
**Q2:** "Influencer culture rewards polish and aspiration. I built an audience by being the opposite of both."
**Q3:** "She is 22, from Chennai or Bangalore, consumes English content but lives a very Indian life. What's missing is someone who gets both without explaining either."
**Gap:** "The only Indian creator who made being unapologetically herself a full creative identity — not a personality quirk."
**Colour:** `#ff6b35` — electric coral, energetic, warm, distinctly her
**Gap axes:**
- X: polished → raw
- Y: aspirational → relatable

✅ brands-dataset.json created with 7 brands
⬜ Add Niharika NM to brands-dataset.json (8th brand)
✅ Q1, Q2, Q3 answers per brand
✅ Gap axes, gap statement, values, purpose per brand
✅ Brand colours defined

⬜ Brand identity card visual per brand (depends on illustration decisions above)
⬜ Gap map data per brand — for home page showcase and pre-branded examples

---

## AI / Intelligence layer
✅ Act 2a — prompt export, no embedded AI (Option B)
✅ Act 0/1 co-thinking — server-side LLM via .env API key
✅ Cheap-tier model routing — Gemini Flash / DeepSeek for cost efficiency

🔄 WebLLM — under investigation (see notes below)

---

## WebLLM — investigation notes

WebLLM runs LLMs entirely in the browser using WebGPU. No server needed, no API key, fully private.

Potential fit for Stencil:
- Zero server cost for AI features
- Works offline after model download
- Privacy — user answers never leave their device
- Open source ethos — no dependency on any provider

Constraints to investigate:
- Model size — smallest useful models are 1–4GB download on first use
- WebGPU support — Chrome 113+, Edge 113+, not Safari (yet)
- Performance — depends on user GPU, may be slow on low-end devices
- Which models — Phi-3 Mini, Gemma 2B, Llama 3.2 1B are the smallest viable options

Verdict (provisional): WebLLM is worth a spike — build a small test that runs
the weak-answer detection prompt locally via WebLLM and measure latency and
quality. If acceptable, it eliminates the API key requirement entirely and
makes Stencil truly self-contained for the co-thinking layer.

Action: Build WebLLM spike before committing Act 0/1 AI architecture.

---

## Open decisions — needs resolution

| # | Decision | Context |
|---|---|---|
| 1 | WebLLM spike | Test before committing API key architecture |
| 2 | Act illustrations | Sumit generating in SD locally — needs to be done before Act builds |
| 3 | Brand identity cards | Visual treatment per brand for overlay grand entry |
| 4 | Conceptual icon set | 6 custom SVGs — draw before build phase |
| 5 | Type scale in CSS variables | Formalise before Claude Code session |
| 6 | Focus Mode in Act 0 prototype | Pattern A decided, needs to be built into act0-v2.html |
| 7 | Brand pill overlay grand entry | Wait for brand identity cards decision first |
| 8 | Home page design | Depends on brand identity cards and illustration system |

---

## What is ready to hand to Claude Code right now

- ✅ Act 0 questions (finalised)
- ✅ brands-dataset.json
- ✅ Typewriter hint behaviour
- ✅ Scaffold draft behaviour (Q2/Q3 only)
- ✅ Focus Mode pattern decided (Pattern A)
- ✅ Blob warmth reaction per question answered
- ✅ Phosphor Icons for UI
- ⬜ Focus Mode built into prototype (do this before handing to Claude Code)
- ⬜ Act illustrations from SD
- ⬜ Brand identity cards


---

## WebLLM — Final Decision
*Validated: June 2026*

**Model: Gemma 2B (`gemma-2-2b-it-q4f16_1-MLC`)**
**Loaded via: `@mlc-ai/web-llm` CDN**
**Size: 1.6 GB — downloaded once, cached in IndexedDB forever**

### Validation results

| Input | Expected | Got | Correct |
|---|---|---|---|
| "we make good stuff" | WEAK | WEAK | ✅ |
| "we help businesses" | WEAK | WEAK | ✅ |
| "bold colour cosmetics for Gen Z Indian women..." | STRONG | STRONG | ✅ |
| "DIY branding for solo founders" | borderline | WEAK | ✅ |
| "we provide value" | WEAK | WEAK | ✅ |

### Latency
- First call (cold start): ~14s (expected, model warming up)
- Subsequent calls: 3–5s consistently

### Architecture decision
Everything runs in the browser. Zero server cost. Zero API key required.

| Feature | Powered by |
|---|---|
| Weak answer detection | Gemma 2B via WebLLM |
| Scaffold draft generation | Gemma 2B via WebLLM |
| Research prompt (Act 2a) | String substitution — no AI |
| Act 1 reflection synthesis | Gemma 2B via WebLLM |

### Models tested and rejected
- Llama 3.2 1B — failed format instructions, returned wrong verdicts
- Phi-3 Mini 4K — 37–51s latency, unacceptable, prompt leaked in output

### Prompt strategy
Few-shot examples in system prompt — small models follow examples
better than abstract instructions. Format: STRONG or WEAK: [question]

### UX for first load
Show honest loading message:
"Downloading Gemma 2B — 1.6 GB — happens once, then cached forever.
Go offline after first load and refresh — model still runs."

### Open source story
"Stencil runs entirely on your device. Your brand answers never
leave your browser. No API key required."

