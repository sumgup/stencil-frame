// brand.md schema types — spec v0.1
// mirrors the seven layers defined in SPEC.md

// ─── Layer 1: Identity (from YAML frontmatter) ───────────────────────────────

export interface DtcgColorValue {
  colorSpace: "srgb" | "display-p3" | "a98-rgb";
  components: [number, number, number];
  hex: string;
}

export interface DtcgTypographyValue {
  fontFamily: string;
  fontWeight: number;
  fontSize: { value: number; unit: "rem" | "px" | "em" };
  lineHeight: number;
  letterSpacing?: { value: number; unit: "em" | "px" };
}

export interface DtcgColorToken {
  $value: DtcgColorValue;
  $type?: "color";
  $description?: string;
}

export interface DtcgTypographyToken {
  $type: "typography";
  $value: DtcgTypographyValue;
  $description?: string;
}

export interface FrameBrandExtensions {
  image_style_prompt: string;
  mood_keywords: string[];
  carousel_aspect_ratio?: string;
  primary_channels?: string[];
}

export interface BrandVisual {
  color: {
    $type?: "color";
    primary: DtcgColorToken;
    accent: DtcgColorToken;
    gold?: DtcgColorToken;
    ink: DtcgColorToken;
    paper: DtcgColorToken;
    [key: string]: DtcgColorToken | string | undefined;
  };
  typography?: {
    heading?: DtcgTypographyToken;
    subheading?: DtcgTypographyToken;
    body?: DtcgTypographyToken;
    label?: DtcgTypographyToken;
    [key: string]: DtcgTypographyToken | undefined;
  };
  $extensions?: {
    "org.frame.brand": FrameBrandExtensions;
    [key: string]: unknown;
  };
}

export interface BrandIdentity {
  id: string;
  name: string;
  spec_version: string;
  created_at: string;
  updated_at: string;
  tagline?: string;
  parent_brand?: string;
  tags?: string[];
  visual?: BrandVisual;
}

// ─── Layer 3: Positioning ─────────────────────────────────────────────────────

// Machine-readable hint Frame reads to load default cascade rules for
// copy register, visual density, motion personality, and interaction patterns.
export type ArchetypeHint =
  | "opinionated-tool"
  | "expert-absurdist"
  | "quiet-authority"
  | "warm-challenger"
  | "playful-precision"
  | "raw-authenticity";

// Derived by Stencil from positioning answers (personality, belief_shift,
// rejects) after Act 3. Not entered directly by the founder. The founder
// sees and approves `in_plain_language` only. Optional for v0.x — brands
// without it still work, Frame just won't have cascade rules to read.
export interface BrandCreativeStance {
  // The brand's core creative polarity, e.g. "opinionated ↔ instrumental"
  primary_tension: string;
  // Secondary principle, e.g. "evidenced ↔ felt"
  supporting: string;
  // Founder-approved plain description shown in UI
  in_plain_language: string;
  // One of: opinionated-tool, expert-absurdist, quiet-authority,
  // warm-challenger, playful-precision, raw-authenticity
  archetype_hint: ArchetypeHint;
}

export interface BrandPositioning {
  purpose: string;       // Why are we here?
  practice: string;      // What do we do and how?
  difference: string;    // What makes us different?
  audience: string;      // Who are we here for?
  values: string;        // What do we value most?
  // What is our personality? Flat string, or a structured object with an
  // optional creative_stance sub-field (see BrandCreativeStance above).
  personality: string | {
    description: string;
    creative_stance?: BrandCreativeStance;
  };
  rejects: string;       // What do we explicitly oppose?
  belief_shift: string;  // From X to Y
  audience_tension: string; // Unspoken contradiction we resolve
}

// ─── Layer 4: Voice ───────────────────────────────────────────────────────────

export interface BrandVoice {
  philosophy: string;
  dos: string[];
  donts: string[];
  reference_moves: string[];
  anti_examples: string[];
}

// ─── Layer 5: Framework (Frame-specific) ─────────────────────────────────────

export interface FrameworkSlide {
  name: string;
  purpose: string;
  tone_notes: string;
  example?: string;
}

export interface BrandFramework {
  name: string;
  philosophy: string;
  slides: FrameworkSlide[];
}

// ─── Full BrandSpec ───────────────────────────────────────────────────────────

export interface BrandSpec {
  // Layer 1 — Identity (required)
  identity: BrandIdentity;

  // Layer 2 — Research (required, raw prose)
  research: string;

  // Layer 3 — Positioning (required)
  positioning: BrandPositioning;

  // Layer 4 — Voice (optional)
  voice?: BrandVoice;

  // Layer 5 — Framework (optional)
  framework?: BrandFramework;

  // Layer 7 — Bridging (optional, raw prose)
  // Note: listed last in spec because it's authored after positioning + visual exist
  bridging?: string;
}

// ─── LLM Adapter types ──────────────────────────────────────────