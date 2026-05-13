---
brand:
  id: colorflix
  name: ColorFlix
  spec_version: "0.1"
  created_at: 2026-05-13
  updated_at: 2026-05-13
  tagline: Bold makeup for Tuesday, made for Indian skin.
  tags: [cosmetics, indian-d2c, gen-z, lipstick, myntra, amazon]
  visual:
    color:
      $type: color
      primary:
        $value: { colorSpace: srgb, components: [0.784, 0.063, 0.180], hex: "#C8102E" }
        $description: "Bollywood lipstick red. The brand's anchor color. Use for hero moments, headlines, primary CTAs."
      accent:
        $value: { colorSpace: srgb, components: [0.914, 0.118, 0.388], hex: "#E91E63" }
        $description: "Hot pink. Use sparingly for emphasis, secondary CTAs, and energy moments."
      gold:
        $value: { colorSpace: srgb, components: [1.0, 0.722, 0.110], hex: "#FFB81C" }
        $description: "Festive gold. Reserve for occasion-led campaigns — Navratri, Diwali, Independence Day."
      ink:
        $value: { colorSpace: srgb, components: [0.102, 0.102, 0.102], hex: "#1A1A1A" }
        $description: "Near-black for body text and strong headlines on light backgrounds."
      paper:
        $value: { colorSpace: srgb, components: [0.980, 0.973, 0.961], hex: "#FAF8F5" }
        $description: "Warm off-white for backgrounds. Never cold white — this brand is warm."
    typography:
      heading:
        $type: typography
        $value:
          fontFamily: "Fraunces"
          fontWeight: 700
          fontSize: { value: 2.5, unit: "rem" }
          lineHeight: 1.1
        $description: "Display headlines. Loud, confident. Use for carousel slide 1 and hero statements."
      subheading:
        $type: typography
        $value:
          fontFamily: "Fraunces"
          fontWeight: 400
          fontSize: { value: 1.5, unit: "rem" }
          lineHeight: 1.25
        $description: "Secondary headlines. Lighter weight keeps the energy without screaming."
      body:
        $type: typography
        $value:
          fontFamily: "Inter"
          fontWeight: 400
          fontSize: { value: 1, unit: "rem" }
          lineHeight: 1.6
        $description: "Body copy. Clean, readable. Never serif in body — that's occasion-coding."
      label:
        $type: typography
        $value:
          fontFamily: "Inter"
          fontWeight: 600
          fontSize: { value: 0.75, unit: "rem" }
          lineHeight: 1.4
          letterSpacing: { value: 0.08, unit: "em" }
        $description: "Product labels, price tags, shade names. All caps optional but use sparingly."
    $extensions:
      org.frame.brand:
        image_style_prompt: |
          Indian South Asian beauty editorial photography. South Asian model with
          warm brown skin tone, light to dusky range. Bold maximalist aesthetic with
          vibrant jewel-tone colors — deep reds, hot pinks, festive golds. Studio
          quality lighting, high contrast. Vogue India editorial style. Photorealistic,
          ultra-detailed. Confident expression, direct eye contact with camera.
          No bridal or wedding context. Everyday setting — campus, metro, café, mirror selfie.
        mood_keywords: [maximalist, playful, bold, editorial, confident, unapologetic, everyday]
        carousel_aspect_ratio: "1:1"
        primary_channels: [instagram, myntra, amazon-india]
---

# ColorFlix

## Research

### Market context

ColorFlix is an Indian D2C cosmetics brand founded to serve the Indian Gen Z beauty consumer at mass-market price points. Products include lipsticks (Glimmer Pop Liquid, Silk Touch Matte, Lip Drama Super Stay), kajals, eyeliners, foundations, primers, skincare (micellar water), and all-in-one kits (Navrang 12-in-1). Price range: individual items ₹158–₹425; kits up to ₹2,404. Primary sales channels: Myntra and Amazon India, with an Instagram-first marketing approach.

The Indian beauty market sits at an interesting inflection point. Legacy Indian brands (Lakme, Maybelline India) dominate shelf space and brand recognition, but they speak softly and largely to an aspirational bridal or "going out" occasion. International prestige brands (MAC, Charlotte Tilbury) are out of reach for most of the target demographic on price. The gap — a brand that is both affordable and genuinely loud — is where ColorFlix lives.

### Audience

Indian Gen Z women, 18–26. College students and early-career. Primarily Tier 1 and Tier 2 cities. Fluent in Hindi-English code-switching. Shops on Myntra and Amazon without leaving the app. Consumes beauty content on Instagram Reels and YouTube. Suspicious of over-polished influencer marketing; responds to specificity and honesty. Aware of skin-tone inclusivity as a value, not just a claim — they can tell when shade ranges are actually formulated for Indian skin versus when a Western range has been imported and relabelled. Has been quietly told by family, office culture, and legacy beauty marketing that loud makeup is "too much" for everyday — and is starting to reject that.

### Competitors and category

Direct competitors in the affordable Indian D2C cosmetics space:

| Brand | Avg entry price | Key strengths | Formulation claims | ColorFlix edge |
|---|---|---|---|---|
| **ColorFlix** | ₹150–₹300 | Humidity-proof lip products, curated combo travel kits | Cruelty-free, mostly vegan | — |
| **Insight** | ₹80–₹250 | Rich cream blushes, toxic-free nail lacquer lines | 100% vegan, paraben-free | ColorFlix wins on lip focus and skin-tone specificity |
| **MARS** | ₹70–₹299 | High-pigment lip pencils, themed eyeshadow palettes | Cruelty-free, trend-driven | ColorFlix wins on everyday positioning vs. MARS's trend/occasion framing |
| **Swiss Beauty** | ₹150–₹400 | Premium-feel liquid concealers, highlighting bases | Dermatologically tested | ColorFlix wins on voice and Gen Z cultural fit; Swiss Beauty skews more premium/clinical |

Broader category context: Legacy Indian brands (Lakme, Maybelline India) dominate distribution but speak softly and skew occasion-led. International prestige brands (MAC, Charlotte Tilbury) are out of reach on price. Sugar Cosmetics is the most culturally similar brand — Gen Z, affordable, direct — but broader in product range and less skin-tone-specific in messaging.

The category's soft default is aspirational-occasion beauty — the idea that bold makeup is a reward for a special day. ColorFlix's entire existence is a bet against that default. In the direct competitor set, none of Insight, MARS, or Swiss Beauty are explicitly fighting that framing. That gap is ColorFlix's to own.

### Voice analysis

ColorFlix's existing copy is energetic and second-person: "Elevate your pout game," "say goodbye to touch-ups, hello to intense pigmentation," "owning your vibe, unapologetically." Taglines include "every swipe a rebellion" and "Makeup for every shade of you." Independence Day campaigns used "Shades of Freedom, made for every Indian hue." The tone is motivational without being preachy — it tells you what the product does, then implies the permission to wear it.

The risk in the current voice: it sometimes tips into generic empowerment-speak ("elevate," "unapologetically") that any brand could say. The sharpened voice needs more specificity — shade names, rupee prices, real moments — to make it distinctly ColorFlix rather than generically bold-beauty.

### Visual references

Packaging: jewel-tone lipstick tubes, bold sans-serif or block-letter logo, high-contrast color. The "cf" monogram and full ColorFlix name appear in clean type. The Navrang kit comes in a "Girl Boss" travel pouch — playful and functional. The overall visual register is maximalist by Indian D2C standards, closer to Fenty Beauty's confidence than Lakme's softness.

---

## Positioning

### Purpose

> Why are we here?

ColorFlix exists to put bold color in everyday rotation for Indian women who've been quietly told that loud lipsticks are for weddings, not Wednesdays. The brand is a standing argument that a ₹200 lipstick formulated for warm brown skin is not a compromise — it's the point.

### Practice

> What do we do, and how do we do it?

We make lipsticks, kajals, and full makeup kits that work on the full range of Indian skin tones and cost what a college student can spend without thinking twice. We sell on Myntra and Amazon because that's where our audience already shops, with zero friction. Our content shows the product worn on real Tuesdays — in the metro, on a Zoom call, in a canteen — not on bridal mood boards or aspirational studio sets. We formulate with skin-friendly ingredients (aloe, blueberry extract, tea tree, vitamin C) because bold shouldn't mean punishing. Everything is cruelty-free and vegan.

### Difference

> What makes us different?

Most Indian beauty brands either over-price (international) or under-deliver on shade range and skin-fit for South Asian skin. Most of them also speak softly — aspirational, occasion-coded, bridal-adjacent. ColorFlix doesn't. We're the brand that says the bold lip is for right now, not for the shaadi. We're also the brand that says "formulated for Indian skin" and means it in the shade range, in the undertone, in the ingredients — not just in a campaign tagline.

### Audience

> Who are we here for?

Indian Gen Z women, 18–26. College students and early-career professionals in Tier 1 and Tier 2 cities. Comfortable on Instagram, fluent in Hindi-English, shopping on Myntra and Amazon. Ready for bold color but carrying the ambient message — from family, from office culture, from legacy beauty marketing — that it might be too much for a Tuesday. ColorFlix is for the woman who has the Glimmer Pop Liquid in her bag and is deciding whether to actually wear it today. The answer should always be yes.

### Values

> What do we value most?

- Color as everyday confidence, not occasion-wear.
- Formulation that actually works on Indian skin — honest about undertones, honest about what "inclusive" means.
- Accessible pricing: college-budget should not mean low-quality.
- Cruelty-free and skin-kind by default, not as a premium add-on.
- Playful and specific, never preachy or generic.

### Personality

> What is our personality?

The confident friend who actually knows beauty — not an influencer performing confidence, but the girl in your hostel who tells you the Silk Touch Matte in Brick Red looks better on your skin tone than the one you picked, and she's right. Mixes Hindi and English without thinking about it. Talks about shade stories like they're gossip. Doesn't apologize for being loud. Finds the bridal-beauty industrial complex slightly exhausting. Would tell you the price without being asked.

### Rejects

> What do we explicitly oppose?

The idea that bold lip color is reserved for weddings, parties, or "going out." The soft, apologetic tone of legacy Indian beauty marketing — the "touch of color," "hint of pink," "subtle glow" register. The assumption that good color formulation and skin-kind ingredients are a luxury price point. The generic empowerment-speak that any brand could slap on any product. The shade range that claims to be inclusive but maxes out at four shades for Indian skin.

### Belief shift

> What mental shift do we want to create?

From: "bold makeup is for special days."
To: "bold makeup is for Tuesday."

This is the central conversion the brand exists to drive. Every piece of content should pull the audience one step further from occasion-thinking and toward everyday-thinking. The Glimmer Pop Liquid should feel as normal to reach for on a Monday morning as a kajal. The permission is the product.

### Audience tension

> What unspoken contradiction does our audience live with?

Wanting to wear loud color — and genuinely loving it when they do — but carrying the ambient permission-check: is this too much for today? For this place? For my skin tone? The tension isn't self-doubt about ability; it's self-doubt about permission. The lipstick is in the bag. ColorFlix's job is to make reaching for it feel obvious, not brave.

---

## Voice

### Voice philosophy

Sharp, conversational Gen Z. Hindi-English code-switching where it's natural, never forced. Short sentences — if it needs a semicolon, it's too long. Specific over generic: shade names, rupee prices, real weekday moments. Permission-giving without preaching — we show the Tuesday, we don't tell you to seize it. The brand is the confident friend, not the motivational poster.

### Voice do's

- Use specific product names and prices. "Glimmer Pop Liquid in Brick Red, ₹225" beats "our bold lip collection."
- Mix Hindi-English where it flows naturally. "Yaar, this shade doesn't budge" is more ColorFlix than "long-lasting formula."
- End carousel slides on a question or an open beat — invite, don't close.
- Reference real, unglamorous moments: Tuesday meeting, metro commute, canteen lunch, 8am Zoom.
- Keep sentences short. One idea per sentence.
- Name the skin tone context. "Works on dusky skin" is more honest and useful than "for all skin types."
- Let the product be the proof — describe what it does before claiming what it means.

### Voice don'ts

- Don't use "glam," "gorgeous," "stunning," "slay" — overused to the point of invisibility.
- Don't say "pop of color." Ever.
- Don't apologize for boldness: no "a touch of," "just a hint of," "a little something."
- Don't use generic occasion-coding: "your special day," "date night," "party-ready."
- No corporate beauty-speak: "innovative formula," "cutting-edge pigmentation," "revolutionary."
- Don't preach empowerment — show the Tuesday, skip the manifesto.
- Don't use passive voice. The lipstick does things. Say what it does.

### Reference moves

- **The gossip opener:** "Okay so the Silk Touch Matte in Rust? It doesn't move. Wore it through chai, lunch, and a 3pm meeting. Still there."
- **The price drop:** "₹225. That's it. That's the tweet." (Works for product callout slides.)
- **The Tuesday anchor:** "Not for the wedding. Not for the date. For Tuesday, because you felt like it."
- **The skin-tone callout:** "Made for light to dusky Indian skin — and we mean that in the shade range, not just the tagline."
- **The permission close:** "Kab lagaogi? (When will you wear it?)" — ends on a question, in Hindi, non-pushy.
- **The specific over vague swap:** Instead of "bold and beautiful," try "Berry Drama. 12 hours. No touch-ups. Your Monday's problem solved."

### Anti-examples

- "Elevate your beauty game to the next level." — Corporate. Vague. Not ColorFlix.
- "Feel gorgeous and glam every single day!" — Four banned words in one sentence.
- "A touch of color for your special day." — Occasion-coded, apologetic, directly rejects the brand's core belief.
- "Innovative formula meets bold pigmentation." — Tech-speak that says nothing specific.
- "Celebrate your unique beauty journey." — The motivational poster voice. We don't preach.

---

## Framework

### Name

The ColorFlix Five

### Philosophy

ColorFlix carousels work like the brand: walk in loud, give the audience permission they didn't know they needed, leave with a wink. The five slides move through a predictable emotional arc — provoke attention, flex the product, tease the shade world, justify the decision rationally, then convert. Each slide has one job. No slide tries to do two things.

### Slides

#### 1. Provoke

- **Purpose:** Stop the scroll. Make a bold claim or ask a question that creates dissonance with the audience's existing belief. This is the "bold makeup is for Tuesday" slide.
- **Tone notes:** Declarative or question. One sentence. Maximum contrast — visual and copy both loud. No product mention yet.
- **Example:** "Yaar, the lipstick has been in your bag for three weeks. Why?"

#### 2. Flex

- **Purpose:** Show the product in full confidence. Product name, shade name, what it actually does (formula, finish, longevity). No occasion — everyday setting only.
- **Tone notes:** Specific and factual. Shade name + price can appear here. Show it on skin, not on a surface.
- **Example:** "Glimmer Pop Liquid. Shade: Brick Red. ₹225. 8 hours on dusky skin, no touch-up."

#### 3. Tease

- **Purpose:** Open the shade world. Show range, variety, the other options. This is where FOMO lives — not fear of missing out on the product, but on the versions of yourself you haven't tried yet.
- **Tone notes:** Playful, lighter. Can use a question. Hindi-English mix fits naturally here.
- **Example:** "Berry Drama or Rust? Both are Tuesday shades. Pick one. Or both."

#### 4. Justify

- **Purpose:** Give the rational brain something to hold. Formulation, ingredients, cruelty-free status, skin-type fit. The emotional decision has already been made — this slide confirms it was smart.
- **Tone notes:** Factual, confident. Can be list-format. Short lines.
- **Example:** "Cruelty-free. Paraben-free. Aloe + Vitamin C. Works on all Indian skin tones. ₹225."

#### 5. Convert

- **Purpose:** Close. Product name, price, where to buy (Myntra / Amazon), and a CTA that doesn't beg. The brand doesn't plead — it makes the next step obvious.
- **Tone notes:** Direct. One clear action. Can end on a question or a wink.
- **Example:** "Glimmer Pop Liquid, ₹225. Myntra mein milega. Kab order karogi?"

---

## Bridging

When we drafted the positioning, "Personality" came out as *confident friend* — specifically not loud-influencer-glam, but the person in the hostel who tells you the truth about which shade works on your skin. That framing felt right but also slightly soft visually — would the design end up too approachable, not bold enough?

When we sketched the visual direction, the first palette instinct was bridal-red-on-cream — a classic Indian beauty register. It read wrong immediately: too occasion-coded, too soft, exactly the aesthetic the brand exists to reject. We pulled the primary red away from dusty-rose-adjacent bridal red toward Bollywood lipstick red — more saturated, higher contrast, less powdery. Added hot pink as a secondary to push the energy further. The off-white background (`#FAF8F5`) kept the warmth without the bridal softness.

Going back to the positioning with that palette in hand, we tightened "Rejects" — the bridal aesthetic is now explicitly named, where before it had been implied. The visual exploration made the strategic edge clearer. The brand is not just "not bridal" by default; it actively rejects the bridal register as the default framing for Indian beauty.

The through-line: *confident friend* in strategy becomes *Bollywood red on warm off-white* in visual. Both are the same thing — loud, specific, warm, and unapologetic about it. Neither is performing boldness for an occasion. Both are just being themselves on a Tuesday.
