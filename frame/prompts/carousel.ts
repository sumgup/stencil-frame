import { BrandSpec, ContentBrief, CarouselSlide, FrameworkSlide } from "@stencil-frame/core";

// ─── System prompt ────────────────────────────────────────────────────────────
// tier: smart — this is the core content generation call

export function buildSystemPrompt(brand: BrandSpec): string {
  const { positioning, voice, framework } = brand;

  const voiceRules = voice
    ? `
VOICE DO'S:
${voice.dos.map((d) => `- ${d}`).join("\n")}

VOICE DON'TS:
${voice.donts.map((d) => `- ${d}`).join("\n")}

REFERENCE MOVES (patterns to use):
${voice.reference_moves.map((m) => `- ${m}`).join("\n")}

ANTI-EXAMPLES (never write like this):
${voice.anti_examples.map((a) => `- ${a}`).join("\n")}
`
    : "";

  const frameworkRules = framework
    ? `
CONTENT FRAMEWORK — ${framework.name}:
${framework.philosophy}

SLIDE ROLES:
${framework.slides.map((s) => `${s.name}: ${s.purpose} | Tone: ${s.tone_notes}`).join("\n")}
`
    : "";

  return `You are a content generator for the brand "${brand.identity.name}".

BRAND POSITIONING:
- Purpose: ${positioning.purpose}
- Difference: ${positioning.difference}
- Personality: ${positioning.personality}
- Rejects: ${positioning.rejects}
- Belief shift: ${positioning.belief_shift}
- Audience tension: ${positioning.audience_tension}
${voiceRules}
${frameworkRules}

Generate content that is specific, not generic. Use real product names, prices in INR, and everyday Indian moments. Never use the words in the DON'TS list.

Respond ONLY with valid JSON. No markdown, no preamble.`;
}

// ─── Carousel generation prompt ───────────────────────────────────────────────
// tier: smart

export function buildCarouselPrompt(
  brand: BrandSpec,
  brief: ContentBrief
): string {
  const slides = brand.framework?.slides ?? defaultSlideRoles;
  const imageBase =
    brand.identity.visual?.$extensions?.["org.frame.brand"]?.image_style_prompt ?? "";

  const slideSchema = slides.map((s: FrameworkSlide, i: number) => ({
    index: i + 1,
    role: s.name,
    purpose: s.purpose,
    tone_notes: s.tone_notes,
    example: s.example,
  }));

  return `Generate a ${slides.length}-slide Instagram carousel for the following brief.

BRIEF:
Campaign: ${brief.campaign}
${brief.product ? `Product: ${brief.product}` : ""}
${brief.hook ? `Angle: ${brief.hook}` : ""}
Channel: ${brief.channel}

SLIDE STRUCTURE (follow this order exactly):
${JSON.stringify(slideSchema, null, 2)}

IMAGE STYLE BASE:
${imageBase}

For each slide, return:
{
  "index": number,
  "role": "slide role name",
  "headline": "the main text (bold, short)",
  "body": "supporting copy (1-3 sentences max)",
  "cta": "call to action (optional, only on last slide)",
  "image_prompt": "complete image generation prompt for this specific slide, building on the image style base"
}

Return a JSON array of ${slides.length} slide objects. Nothing else.`;
}

// ─── Fallback slide roles if no framework in brand.md ────────────────────────

const defaultSlideRoles: FrameworkSlide[] = [
  { name: "Hook", purpose: "Stop the scroll with a bold claim", tone_notes: "Declarative, one sentence" },
  { name: "Product", purpose: "Show the product in action", tone_notes: "Specific, factual" },
  { name: "Range", purpose: "Open the product world", tone_notes: "Playful, inviting" },
  { name: "Proof", purpose: "Rational justification", tone_notes: "Factual, list format" },
  { name: "CTA", purpose: "Convert", tone_notes: "Direct, one action" },
];
