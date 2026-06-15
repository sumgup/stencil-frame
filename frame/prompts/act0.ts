// Act 0 — "Who Are You" prompts.
// See design/docs/Investigate-Agent Design.md for the behaviour these implement.

export type Act0QuestionId = "q1" | "q2" | "q3";

const QUESTION_TEXT: Record<Act0QuestionId, string> = {
  q1: "Tell me what your brand does. One sentence, no industry words.",
  q2: "What makes you angry about how things are done in your space? What exists that shouldn't?",
  q3: "Who are you really here for — and what do they deserve that they're not getting today?",
};

const WEAK_ANSWER_TRIGGER: Record<Act0QuestionId, string> = {
  q1: "vague, too long, or full of jargon",
  q2: "generic, safe, with no heat or conviction in it",
  q3: "describes a demographic (age, income, location) rather than a human — a feeling or a need",
};

// ─── Weak-answer check ─────────────────────────────────────────────────────────
// tier: cheap — simple classification, no generation

export function buildWeakAnswerCheckPrompt(question: Act0QuestionId, answer: string): string {
  return `A user was asked: "${QUESTION_TEXT[question]}"

They answered: "${answer}"

A weak answer to this question is one that is ${WEAK_ANSWER_TRIGGER[question]}.

Is this answer weak? Respond with ONLY valid JSON, no markdown:
{"weak": true or false}`;
}

// ─── Scaffolded draft ──────────────────────────────────────────────────────────
// tier: cheap — short draft answer grounded only in what the user already said

export function buildAct0DraftPrompt(question: "q2" | "q3", context: { q1: string; q2?: string }): string {
  const priorAnswers = [`What they do: "${context.q1}"`];
  if (question === "q3") priorAnswers.push(`What they believe / what makes them angry about their space: "${context.q2}"`);

  return `A user is being asked: "${QUESTION_TEXT[question]}"

So far they have told us:
${priorAnswers.join("\n")}

Write a short, plausible draft answer to the question above — one a person in this position
might give. Ground it only in what they have already said; do not invent new facts about
their brand. Plain language, first person, one to two sentences. Respond with ONLY the
draft answer — no preamble, no quotes, no markdown.`;
}

// ─── Act 0 reflection ──────────────────────────────────────────────────────────
// tier: smart — synthesises the three answers into one short paragraph

export function buildAct0ReflectionPrompt(answers: {
  oneLiner: string;
  values: string;
  purpose: string;
}): string {
  return `A user answered three questions about their brand:

What they do: "${answers.oneLiner}"
What they believe / what makes them angry about their space: "${answers.values}"
Who they're really here for: "${answers.purpose}"

Reflect this back to them in one short paragraph, plain language, no bullet points,
following this template:

"Here is what I am hearing. You make [one-liner]. You believe [values]. You are here
for [purpose]. Does this feel true? Is anything missing or wrong?"

Use the user's own words and tone where possible. Do not add new claims. Respond with
ONLY the paragraph — no preamble, no markdown.`;
}
