import { useCallback, useState } from "react";
import { checkAct1Answer, reflectAct1 } from "../lib/api.js";

// Act 1 — "Warm Up". One opening question, at most one push-back, then a
// reflection organised into facts / obstacles / opportunities.
// See design/docs/Investigate-Agent Design.md.

export const ACT1_STEPS = {
  OPEN: "open",
  OPEN_PUSH: "open_push",
  REFLECTION: "reflection",
  DONE: "done",
};

export const ACT1_PROMPTS = {
  [ACT1_STEPS.OPEN]: "Tell me about your brand. What is it and what problem does it solve?",
  [ACT1_STEPS.OPEN_PUSH]: "Tell me more about the problem. Who has it and how does it feel for them?",
};

export const ACT1_WATERMARK =
  "DIY branding for people starting fresh. Problem: Coherent voice and visuals " +
  "from Day 1 — avoid the beginner trap, kill impostor syndrome.";

export function useAct1(act0Answers = {}) {
  const [step, setStep] = useState(ACT1_STEPS.OPEN);
  const [answer, setAnswer] = useState("");
  const [pushed, setPushed] = useState(false);
  const [reflection, setReflection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const goToReflection = useCallback(
    async (finalAnswer) => {
      setStep(ACT1_STEPS.REFLECTION);
      setLoading(true);
      setError(null);
      try {
        const result = await reflectAct1({
          answer: finalAnswer,
          oneLiner: act0Answers.q1,
          values: act0Answers.q2,
          purpose: act0Answers.q3,
        });
        setReflection(result);
      } catch {
        setError("Couldn't generate the reflection — check the server and ANTHROPIC_API_KEY.");
      } finally {
        setLoading(false);
      }
    },
    [act0Answers]
  );

  const submitAnswer = useCallback(
    async (text) => {
      const isPush = step === ACT1_STEPS.OPEN_PUSH;
      const finalAnswer = isPush ? `${answer} ${text}`.trim() : text;
      setAnswer(finalAnswer);

      // After a push, or on a blank/"I don't know" answer, accept and move on.
      if (isPush || !text.trim()) {
        return goToReflection(finalAnswer);
      }

      setLoading(true);
      setError(null);
      let weak = false;
      try {
        weak = await checkAct1Answer(text);
      } catch {
        // If the check fails, accept the answer rather than blocking the flow.
      }
      setLoading(false);

      if (weak && !pushed) {
        setPushed(true);
        setStep(ACT1_STEPS.OPEN_PUSH);
      } else {
        goToReflection(text);
      }
    },
    [step, answer, pushed, goToReflection]
  );

  const confirm = useCallback(() => setStep(ACT1_STEPS.DONE), []);

  const correct = useCallback((updated) => {
    setReflection((r) => ({ ...r, ...updated }));
    setStep(ACT1_STEPS.DONE);
  }, []);

  return {
    step,
    prompt: ACT1_PROMPTS[step],
    answer,
    reflection,
    loading,
    error,
    submitAnswer,
    confirm,
    correct,
  };
}
