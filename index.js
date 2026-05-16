/**
 * brand.md parser
 * Extracts a BrandSpec object from a .brand.md file.
 * No dependencies beyond Node built-ins.
 */

const fs = require('fs');
const path = require('path');

/**
 * Parse YAML frontmatter from markdown content.
 * Minimal parser — handles the brand.md structure only.
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: null, body: content };
  
  const yamlStr = match[1];
  const body = content.slice(match[0].length).trim();
  
  // Simple YAML parser for our known structure
  const frontmatter = parseSimpleYaml(yamlStr);
  return { frontmatter, body };
}

function parseSimpleYaml(yaml) {
  const lines = yaml.split('\n');
  const result = {};
  const stack = [{ obj: result, indent: -1 }];
  
  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    
    const indent = line.search(/\S/);
    const trimmed = line.trim();
    
    // Handle arrays like [a, b, c]
    const kvMatch = trimmed.match(/^([^:]+):\s*(.+)?$/);
    if (!kvMatch) continue;
    
    const key = kvMatch[1].trim();
    const val = kvMatch[2]?.trim() || null;
    
    // Pop stack to current indent level
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }
    
    const parent = stack[stack.length - 1].obj;
    
    if (val === null) {
      // Nested object
      parent[key] = {};
      stack.push({ obj: parent[key], indent });
    } else if (val.startsWith('[') && val.endsWith(']')) {
      // Inline array
      parent[key] = val.slice(1, -1).split(',').map(s => s.trim());
    } else if (val === 'true') {
      parent[key] = true;
    } else if (val === 'false') {
      parent[key] = false;
    } else if (!isNaN(val) && val !== '') {
      parent[key] = Number(val);
    } else {
      // String — strip quotes if present
      parent[key] = val.replace(/^["']|["']$/g, '');
    }
  }
  
  return result;
}

/**
 * Extract a markdown section by heading name.
 */
function extractSection(body, heading) {
  const regex = new RegExp(`## ${heading}\\n([\\s\\S]*?)(?=\\n## |$)`, 'i');
  const match = body.match(regex);
  return match ? match[1].trim() : null;
}

/**
 * Extract a subsection under a parent section.
 */
function extractSubsection(sectionBody, subheading) {
  const regex = new RegExp(`### ${subheading}\\n([\\s\\S]*?)(?=\\n### |$)`, 'i');
  const match = sectionBody?.match(regex);
  return match ? match[1].trim() : null;
}

/**
 * Extract bullet list items from a section.
 */
function extractBullets(text) {
  if (!text) return [];
  return text
    .split('\n')
    .filter(l => l.trim().startsWith('-'))
    .map(l => l.trim().slice(1).trim());
}

/**
 * Parse the Framework slides section.
 */
function parseSlides(frameworkBody) {
  if (!frameworkBody) return [];
  const slideRegex = /#### \d+\. (.+)\n([\s\S]*?)(?=\n#### |\s*$)/g;
  const slides = [];
  let match;
  while ((match = slideRegex.exec(frameworkBody)) !== null) {
    const name = match[1].trim();
    const content = match[2].trim();
    const purposeMatch = content.match(/\*\*Purpose:\*\*\s*(.+)/);
    const toneMatch = content.match(/\*\*Tone notes:\*\*\s*(.+)/);
    slides.push({
      name,
      purpose: purposeMatch ? purposeMatch[1].trim() : '',
      tone: toneMatch ? toneMatch[1].trim() : '',
    });
  }
  return slides;
}

/**
 * Main parser. Returns a BrandSpec object.
 */
function parseBrandFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, body } = parseFrontmatter(raw);
  
  const brand = frontmatter?.brand || {};
  const visual = brand.visual || {};
  const ext = visual.extensions || {};

  // Sections
  const positioningBody = extractSection(body, 'Positioning');
  const voiceBody = extractSection(body, 'Voice');
  const frameworkBody = extractSection(body, 'Framework');

  return {
    id: brand.id || path.basename(filePath, '.brand.md'),
    name: brand.name || 'Unnamed Brand',
    tagline: brand.tagline || '',
    specVersion: brand.spec_version || '0.1',
    
    visual: {
      colors: visual.color || {},
      imageStylePrompt: ext.image_style_prompt || '',
      moodKeywords: ext.mood_keywords || [],
    },

    research: extractSection(body, 'Research') || '',

    positioning: {
      purpose: extractSubsection(positioningBody, 'Purpose') || '',
      practice: extractSubsection(positioningBody, 'Practice') || '',
      difference: extractSubsection(positioningBody, 'Difference') || '',
      audience: extractSubsection(positioningBody, 'Audience') || '',
      values: extractBullets(extractSubsection(positioningBody, 'Values')),
      personality: extractSubsection(positioningBody, 'Personality') || '',
      rejects: extractSubsection(positioningBody, 'Rejects') || '',
      beliefShift: extractSubsection(positioningBody, 'Belief shift') || '',
      audienceTension: extractSubsection(positioningBody, 'Audience tension') || '',
    },

    voice: {
      philosophy: extractSubsection(voiceBody, 'Voice philosophy') || '',
      dos: extractBullets(extractSubsection(voiceBody, "Voice do's")),
      donts: extractBullets(extractSubsection(voiceBody, "Voice don'ts")),
    },

    framework: {
      name: extractSubsection(frameworkBody, 'Name') || '',
      philosophy: extractSubsection(frameworkBody, 'Philosophy') || '',
      slides: parseSlides(frameworkBody),
    },

    bridging: extractSection(body, 'Bridging') || '',
  };
}

/**
 * Load all brands from the brands directory.
 */
function loadAllBrands(brandsDir) {
  const files = fs.readdirSync(brandsDir)
    .filter(f => f.endsWith('.brand.md'));
  return files.map(f => parseBrandFile(path.join(brandsDir, f)));
}

module.exports = { parseBrandFile, loadAllBrands };
