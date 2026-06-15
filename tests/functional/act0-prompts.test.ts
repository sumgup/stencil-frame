import { describe, it, expect } from "vitest";
import { buildWeakAnswerCheckPrompt, buildAct0DraftPrompt, buildAct0ReflectionPrompt } from "../../frame/prompts/act0.js";

describe("act0 weak-answer check prompt", () => {
  it("includes the question text for q1", () => {
    const prompt = buildWeakAnswerCheckPrompt("q1", "We sell stuff online.");
    expect(prompt).toContain("Tell me what your brand does. One sentence, no industry words.");
    expect(prompt).toContain("We sell stuff online.");
  });

  it("includes the q2 weak-answer trigger", () => {
    const prompt = buildWeakAnswerCheckPrompt("q2", "Bad customer service.");
    expect(prompt).toContain("generic, safe, with no heat or conviction in it");
  });

  it("includes the q3 weak-answer trigger", () => {
    const prompt = buildWeakAnswerCheckPrompt("q3", "Millennials aged 25-34.");
    expect(prompt).toContain("describes a demographic");
  });

  it("asks for JSON-only output", () => {
    const prompt = buildWeakAnswerCheckPrompt("q1", "We make things.");
    expect(prompt).toContain('{"weak": true or false}');
  });
});

describe("act0 draft prompt", () => {
  it("includes the q2 question and the q1 answer for context", () => {
    const prompt = buildAct0DraftPrompt("q2", { q1: "We help bakeries sell online." });
    expect(prompt).toContain("What makes you angry about how things are done in your space? What exists that shouldn't?");
    expect(prompt).toContain("We help bakeries sell online.");
  });

  it("includes q1 and q2 answers for q3 context", () => {
    const prompt = buildAct0DraftPrompt("q3", {
      q1: "We help bakeries sell online.",
      q2: "Brands overcharge for logos on shirts.",
    });
    expect(prompt).toContain("We help bakeries sell online.");
    expect(prompt).toContain("Brands overcharge for logos on shirts.");
  });

  it("asks for a plain draft answer with no markdown", () => {
    const prompt = buildAct0DraftPrompt("q2", { q1: "a" });
    expect(prompt).toContain("no preamble, no quotes, no markdown");
  });
});

describe("act0 reflection prompt", () => {
  it("includes all three answers", () => {
    const prompt = buildAct0ReflectionPrompt({
      oneLiner: "We help bakeries sell online.",
      values: "Brands overcharge for logos on shirts.",
      purpose: "People tired of being sold to.",
    });
    expect(prompt).toContain("We help bakeries sell online.");
    expect(prompt).toContain("Brands overcharge for logos on shirts.");
    expect(prompt).toContain("People tired of being sold to.");
  });

  it("includes the reflection template", () => {
    const prompt = buildAct0ReflectionPrompt({ oneLiner: "a", values: "b", purpose: "c" });
    expect(prompt).toContain("Here is what I am hearing");
    expect(prompt).toContain("Does this feel true? Is anything missing or wrong?");
  });
});
