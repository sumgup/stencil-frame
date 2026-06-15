import { describe, it, expect } from "vitest";
import { buildAct1WeakAnswerCheckPrompt, buildAct1ReflectionPrompt } from "../../frame/prompts/act1.js";

describe("act1 weak-answer check prompt", () => {
  it("includes the opening question and the answer", () => {
    const prompt = buildAct1WeakAnswerCheckPrompt("We sell stuff online.");
    expect(prompt).toContain("Tell me about your brand. What is it and what problem does it solve?");
    expect(prompt).toContain("We sell stuff online.");
  });

  it("includes the weak-answer trigger", () => {
    const prompt = buildAct1WeakAnswerCheckPrompt("We sell stuff online.");
    expect(prompt).toContain("a one-line answer with no real substance, and no problem named");
  });

  it("asks for JSON-only output", () => {
    const prompt = buildAct1WeakAnswerCheckPrompt("We make things.");
    expect(prompt).toContain('{"weak": true or false}');
  });
});

describe("act1 reflection prompt", () => {
  it("includes the answer and act0 context", () => {
    const prompt = buildAct1ReflectionPrompt({
      answer: "We help bakeries sell online without a tech team.",
      oneLiner: "We help bakeries sell online.",
      values: "Brands overcharge for logos on shirts.",
      purpose: "People tired of being sold to.",
    });
    expect(prompt).toContain("We help bakeries sell online without a tech team.");
    expect(prompt).toContain("We help bakeries sell online.");
    expect(prompt).toContain("Brands overcharge for logos on shirts.");
    expect(prompt).toContain("People tired of being sold to.");
  });

  it("asks for facts, obstacles, and opportunities as JSON", () => {
    const prompt = buildAct1ReflectionPrompt({ answer: "a" });
    expect(prompt).toContain('{"facts": ["..."], "obstacles": ["..."], "opportunities": ["..."]}');
  });
});
