// Act 1 — "Warm Up" prompts.
// See design/docs/Investigate-Agent Design.md for the behaviour these implement.

export const ACT1_QUESTION = "Tell me about your brand. What is it and what problem does it solve?";
export const ACT1_PUSH = "Tell me more about the problem. Who has it and how does it feel for them?";

const WEAK_ANSWER_TRIGGER = "a one-line answer with no real substance, and no problem named";

// ─── Weak-answer check ─────────────────────────────────────────────────────────
// tier: cheap — simple classification, no generation

export function buildAct1WeakAnswerCheckPrompt(answer: string): string {
  return `A user was asked: "${ACT1_QUESTION}"

They answered: "${answer}"

A weak answer to this question is ${WEAK_ANSWER_TRIGGER}.

Is this answer weak? Respond with ONLY valid JSON, no markdown:
{"weak": true or false}`;
}

// ─── Act 1 reflection ──────────────────────────────────────────────────────────
// tier: smart — organises the answer into facts / obstacles / opportunities

export function buildAct1ReflectionPrompt(input: {
  answer: string;
  oneLiner?: string;
  values?: string;
  purpose?: string;
}): string {
  return `A user described their brand and the problem it solves:

"${input.answer}"

For context, earlier in the session they said:
- What they do: "${input.oneLiner ?? ""}"
- What they believe: "${input.values ?? ""}"
- Who they're really here for: "${input.purpose ?? ""}"

Organise their answer into three buckets:
- facts: discrete factual statements about the brand and its market (a short list)
- obstacles: the main thing(s) standing in their way (a short list, usually just one)
- opportunities: where the opening might be (a short list)

Use the user's own words and ideas. Do not invent new claims. Respond with ONLY valid JSON,
no markdown, in this shape:
{"facts": ["..."], "obstacles": ["..."], "opportunities": ["..."]}`;
}
