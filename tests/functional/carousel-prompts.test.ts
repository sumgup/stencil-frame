import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { parseBrandString } from "../../core/src/parser/index.js";
import { buildSystemPrompt, buildCarouselPrompt } from "../../frame/prompts/carousel.js";

const raw = readFileSync(resolve(__dirname, "../../brands/colorflix.brand.md"), "utf-8");

describe("carousel prompt builder", () => {

  it("system prompt contains positioning fields", () => {
    const brand = parseBrandString(raw);
    const prompt = buildSystemPrompt(brand);
    expect(prompt).toContain("Tuesday");
    expect(prompt).toContain("bold makeup");
    expect(prompt).toContain("DO'S");
    expect(prompt).toContain("DON'TS");
  });

  it("system prompt contains voice don'ts", () => {
    const brand = parseBrandString(raw);
    const prompt = buildSystemPrompt(brand);
    expect(prompt).toContain("glam");
    expect(prompt).toContain("pop of color");
  });

  it("carousel prompt references the brief campaign", () => {
    const brand = parseBrandString(raw);
    const brief = {
      campaign: "Glimmer Pop launch — everyday bold",
      product: "Glimmer Pop Liquid",
      channel: "instagram" as const,
    };
    const prompt = buildCarouselPrompt(brand, brief);
    expect(prompt).toContain("Glimmer Pop launch");
    expect(prompt).toContain("Glimmer Pop Liquid");
    expect(prompt).toContain("instagram");
  });

  it("carousel prompt includes image style base", () => {
    const brand = parseBrandString(raw);
    const brief = { campaign: "Test", channel: "instagram" as const };
    const prompt = buildCarouselPrompt(brand, brief);
    expect(prompt).toContain("South Asian");
    expect(prompt).toContain("Vogue India");
  });

  it("carousel prompt requests correct number of slides", () => {
    const brand = parseBrandString(raw);
    const brief = { campaign: "Test", channel: "instagram" as const };
    const prompt = buildCarouselPrompt(brand, brief);
    expect(prompt).toContain("5-slide");
  });
});
