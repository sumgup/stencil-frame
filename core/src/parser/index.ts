import { readFile } from "fs/promises";
import { BrandSpec, BrandIdentity, BrandPositioning, BrandVoice, BrandFramework } from "../types/brand.js";

// ─── YAML frontmatter parser (no dependencies) ───────────────────────────────
// Handles the subset of YAML used in brand.md files.
// For anything more complex, swap in a proper YAML library.

function extractFrontmatter(raw: string): { yaml: string; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("No YAML frontmatter found in brand.md file");
  return { yaml: match[1], body: match[2] };
}

// Minimal YAML parser for the brand.md identity block.
// Extracts the `brand:` key and returns it as a plain object.
// Full YAML parsing (for the visual tokens) deferred to v0.2.
function parseIdentityFromYaml(yaml: string): BrandIdentity {
  const lines = yaml.split("\n");
  const identity: Record<string, unknown> = {};
  let inBrand = false;
  let inVisual = false;

  for (const line of lines) {
    if (line.trim() === "brand:") { inBrand = true; continue; }
    if (!inBrand) continue;
    if (line.trim() === "visual:") { inVisual = true; continue; }
    if (inVisual) continue; // visual tokens parsed separately — complex nested YAML

    const match = line.match(/^\s{2}(\w+):\s*(.+)$/);
    if (match) {
      const key = match[1];
      let value: string | string[] = match[2].trim().replace(/^["']|["']$/g, "");
      if (value.startsWith("[") && value.endsWith("]")) {
        value = value
          .slice(1, -1)
          .split(",")
          .map((v) => v.trim().replace(/^["']|["']$/g, ""));
      }
      identity[key] = value;
    }
  }

  return identity as unknown as BrandIdentity;
}

// ─── Markdown section extractor ──────────────────────────────────────────────

function extractSection(body: string, heading: string): string | null {
  const regex = new RegExp(`## ${heading}\\n([\\s\\S]*?)(?=\\n## |$)`, "i");
  const match = body.match(regex);
  return match ? match[1].trim() : null;
}

function extractSubsection(section: string, heading: string): string | null {
  const regex = new RegExp(`### ${heading}\\n(?:>.*\\n)?\\n?([\\s\\S]*?)(?=\\n### |$)`, "i");
  const match = section.match(regex);
  return match ? match[1].trim() : null;
}

function extractBulletList(text: string): string[] {
  return text
    .split("\n")
    .filter((line) => line.trim().startsWith("- "))
    .map((line) => line.trim().slice(2).trim());
}

// ─── Section parsers ─────────────────────────────────────────────────────────

function parsePositioning(section: string): BrandPositioning {
  const get = (heading: string) => extractSubsection(section, heading) ?? "";
  return {
    purpose: get("Purpose"),
    practice: get("Practice"),
    difference: get("Difference"),
    audience: get("Audience"),
    values: get("Values"),
    personality: get("Personality"),
    rejects: get("Rejects"),
    belief_shift: get("Belief shift"),
    audience_tension: get("Audience tension"),
  };
}

function parseVoice(section: string): BrandVoice {
  const philosophy = extractSubsection(section, "Voice philosophy") ?? "";
  const dosRaw = extractSubsection(section, "Voice do's") ?? "";
  const dontsRaw = extractSubsection(section, "Voice don'ts") ?? "";
  const movesRaw = extractSubsection(section, "Reference moves") ?? "";
  const antiRaw = extractSubsection(section, "Anti-examples") ?? "";

  return {
    philosophy,
    dos: extractBulletList(dosRaw),
    donts: extractBulletList(dontsRaw),
    reference_moves: extractBulletList(movesRaw),
    anti_examples: extractBulletList(antiRaw),
  };
}

function parseFramework(section: string): BrandFramework {
  const nameMatch = section.match(/### Name\n(.+)/);
  const name = nameMatch ? nameMatch[1].trim() : "";
  const philosophy = extractSubsection(section, "Philosophy") ?? "";

  // Extract individual slides (#### 1. Provoke etc.)
  const slideRegex = /#### \d+\.\s+(.+)\n([\s\S]*?)(?=#### \d+\.|$)/g;
  const slides = [];
  let match;

  while ((match = slideRegex.exec(section)) !== null) {
    const slideName = match[1].trim();
    const slideBody = match[2].trim();

    const purposeMatch = slideBody.match(/\*\*Purpose:\*\*\s*(.+)/);
    const toneMatch = slideBody.match(/\*\*Tone notes:\*\*\s*(.+)/);
    const exampleMatch = slideBody.match(/\*\*Example:\*\*\s*(.+)/);

    slides.push({
      name: slideName,
      purpose: purposeMatch ? purposeMatch[1].trim() : "",
      tone_notes: toneMatch ? toneMatch[1].trim() : "",
      example: exampleMatch ? exampleMatch[1].trim() : undefined,
    });
  }

  return { name, philosophy, slides };
}

// ─── Main parse function ──────────────────────────────────────────────────────

export async function parseBrandFile(filePath: string): Promise<BrandSpec> {
  const raw = await readFile(filePath, "utf-8");
  return parseBrandString(raw);
}

export function parseBrandString(raw: string): BrandSpec {
  const { yaml, body } = extractFrontmatter(raw);

  const identity = parseIdentityFromYaml(yaml);

  const researchSection = extractSection(body, "Research");
  if (!researchSection) throw new Error("brand.md missing required ## Research section");

  const positioningSection = extractSection(body, "Positioning");
  if (!positioningSection) throw new Error("brand.md missing required ## Positioning section");

  const voiceSection = extractSection(body, "Voice");
  const frameworkSection = extractSection(body, "Framework");
  const bridgingSection = extractSection(body, "Bridging");

  return {
    identity,
    research: researchSection,
    positioning: parsePositioning(positioningSection),
    voice: voiceSection ? parseVoice(voiceSection) : undefined,
    framework: frameworkSection ? parseFramework(frameworkSection) : undefined,
    bridging: bridgingSection ?? undefined,
  };
}
