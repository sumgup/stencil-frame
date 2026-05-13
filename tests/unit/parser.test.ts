import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { parseBrandString } from "../../core/src/parser/index.js";

const BRAND_FILE = resolve(__dirname, "../../brands/colorflix.brand.md");
const raw = readFileSync(BRAND_FILE, "utf-8");

describe("brand.md parser — colorflix", () => {

  it("parses identity fields", () => {
    const brand = parseBrandString(raw);
    expect(brand.identity.id).toBe("colorflix");
    expect(brand.identity.name).toBe("ColorFlix");
    expect(brand.identity.spec_version).toBe("0.1");
    expect(brand.identity.tagline).toContain("Tuesday");
  });

  it("parses all nine positioning fields", () => {
    const brand = parseBrandString(raw);
    const p = brand.positioning;
    expect(p.purpose).toBeTruthy();
    expect(p.practice).toBeTruthy();
    expect(p.difference).toBeTruthy();
    expect(p.audience).toBeTruthy();
    expect(p.values).toBeTruthy();
    expect(p.personality).toBeTruthy();
    expect(p.rejects).toBeTruthy();
    expect(p.belief_shift).toBeTruthy();
    expect(p.audience_tension).toBeTruthy();
  });

  it("belief shift contains the Tuesday line", () => {
    const brand = parseBrandString(raw);
    expect(brand.positioning.belief_shift.toLowerCase()).toContain("tuesday");
  });

  it("parses voice do's and don'ts", () => {
    const brand = parseBrandString(raw);
    expect(brand.voice).toBeDefined();
    expect(brand.voice!.dos.length).toBeGreaterThan(3);
    expect(brand.voice!.donts.length).toBeGreaterThan(3);
  });

  it("voice donts never contain banned words in the brand content", () => {
    const brand = parseBrandString(raw);
    const bannedPatterns = ["glam", "gorgeous", "stunning", "pop of color"];
    // voice donts should reference these words (as things NOT to say)
    const dontsText = brand.voice!.donts.join(" ").toLowerCase();
    bannedPatterns.forEach((word) => {
      expect(dontsText).toContain(word);
    });
  });

  it("parses framework with five slides", () => {
    const brand = parseBrandString(raw);
    expect(brand.framework).toBeDefined();
    expect(brand.framework!.slides.length).toBe(5);
    expect(brand.framework!.slides[0].name).toBe("Provoke");
    expect(brand.framework!.slides[4].name).toBe("Convert");
  });

  it("parses bridging section", () => {
    const brand = parseBrandString(raw);
    expect(brand.bridging).toBeDefined();
    expect(brand.bridging).toContain("Tuesday");
  });

  it("parses research section", () => {
    const brand = parseBrandString(raw);
    expect(brand.research).toContain("ColorFlix");
    expect(brand.research.length).toBeGreaterThan(200);
  });
});
