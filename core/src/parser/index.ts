import { readFile } from "fs/promises";
import { BrandSpec, BrandIdentity, BrandPositioning, BrandVoice, BrandFramework, ArchetypeHint } from "../types/brand.js";

// ─── YAML frontmatter parser (no dependencies) ───────────────────────────────
// Handles the subset of YAML used in brand.md files.
// For anything more complex, swap in a proper YAML library.

function extractFrontmatter(raw: string): { yaml: string; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error("No YAML frontmatter found in brand.md file");
  return { yaml: match[1], body: match[2] };
}

// Extracts image_style_prompt from a YAML block scalar (| literal).
// Scans for the key, then collects all lines indented past it.
function extractImageStylePrompt(yaml: string): string {
  const lines = yaml.split("\n");
  let inBlock = false;
  let baseIndent = 0;
  const blockLines: string[] = [];

  for (const line of lines) {
    if (!inBlock) {
      const match = line.match(/^(\s+)image_style_prompt:\s*\|$/);
      if (match) {
        inBlock = true;
        baseIndent = match[1].length + 2;
      }
    } else {
      if (/^\s*$/.test(line)) { blockLines.push(""); continue; }
      const indent = line.search(/\S/);
      if (indent >= baseIndent) {
        blockLines.push(line.slice(baseIndent));
      } else {
        break;
      }
    }
  }

  return blockLines.join("\n").trim();
}

// Extracts hex color values from the visual.color block.
// Color names are at 6-space indent; hex values appear in their $value line.
function extractColorHexes(yaml: string): Record<string, string> {
  const result: Record<string, string> = {};
  let lastName = "";
  for (const line of yaml.split("\n")) {
    const nameMatch = line.match(/^ {6}(\w+):\s*$/);
    if (nameMatch) { lastName = nameMatch[1]; continue; }
    const hexMatch = line.match(/hex:\s*["']?(#[0-9A-Fa-f]{6})["']?/);
    if (hexMatch && lastName) { result[lastName] = hexMatch[1]; lastName = ""; }
  }
  return result;
}

// Extracts mood_keywords inline array from the $extensions block.
function extractMoodKeywords(yaml: string): string[] {
  const match = yaml.match(/mood_keywords:\s*\[([^\]]+)\]/);
  if (!match) return [];
  return match[1].split(",").map((k) => k.trim().replace(/^["']|["']$/g, ""));
}

// Minimal YAML parser for the brand.md identity block.
// Extracts the `brand:` key and returns it as a plain object.
// Full YAML parsing (for the visual tokens) deferred to v0.2.
// Exception: image_style_prompt, colors, and mood_keywords are parsed now because Frame needs them.
function parseIdentityFromYaml(yaml: string): BrandIdentity {
  const lines = yaml.split("\n");
  const identity: Record<string, unknown> = {};
  let inBrand = false;
  let inVisual = false;

  for (const line of lines) {
    if (line.trim() === "brand:") { inBrand = true; continue; }
    if (!inBrand) continue;
    if (line.trim() === "visual:") { inVisual = true; continue; }
    if (inVisual) continue; // full visual token parsing deferred to v0.2

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

  const imageStylePrompt = extractImageStylePrompt(yaml);
  const colorHexes = extractColorHexes(yaml);
  const moodKeywords = extractMoodKeywords(yaml);
  if (imageStylePrompt || Object.keys(colorHexes).length) {
    identity.visual = {
      color: colorHexes,
      $extensions: {
        "org.frame.brand": {
          image_style_prompt: imageStylePrompt,
          mood_keywords: moodKeywords,
        },
      },
    };
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

// Parses the Personality subsection. If it contains a "**Creative stance**"
// block, returns the structured { description, creative_stance } form;
// otherwise returns the raw prose string (v0.x brands without creative_stance
// still work — Frame just won't have cascade rules to read).
function parsePersonality(raw: string): BrandPositioning["personality"] {
  const stanceMatch = raw.match(/\*\*Creative stance\*\*\s*\n([\s\S]*)/i);
  if (!stanceMatch) return raw;

  const description = raw.slice(0, stanceMatch.index).trim();
  const block = stanceMatch[1];
  const field = (label: string): string => {
    const m = block.match(new RegExp(`-\\s*${label}:\\s*(.+)`, "i"));
    return m ? m[1].trim().replace(/^["']|["']$/g, "") : "";
  };

  return {
    description,
    creative_stance: {
      primary_tension: field("Primary tension"),
      supporting: field("Supporting"),
      in_plain_language: field("In plain language"),
      archetype_hint: field("Archetype hint") as ArchetypeHint,
    },
  };
}

function parsePositioning(section: string): BrandPositioning {
  const get = (heading: string) => extractSubsection(section, heading) ?? "";
  return {
    purpose: get("Purpose"),
    practice: get("Practice"),
    difference: get("Difference"),
    audience: get("Audience"),
    values: get("Values"),
    personality: parsePersonality(get("Personality")),
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

export async function parseBrandFile(filePath: string): Promise