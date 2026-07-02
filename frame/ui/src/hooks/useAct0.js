import { useCallback, useEffect, useRef, useState } from "react";
import { checkAct0Answer, draftAct0Answer, reflectAct0 } from "../lib/api.js";

// Act 0 — "Who Are You". State machine for the mode question, the three
// identity questions (with at most one push-back each), and the closing
// reflection. See design/docs/Investigate-Agent Design.md.

export const STEPS = {
  MODE: "mode",
  Q1: "q1",
  Q1_PUSH: "q1_push",
  Q2: "q2",
  Q2_PUSH: "q2_push",
  Q3: "q3",
  Q3_PUSH: "q3_push",
  REFLECTION: "reflection",
  DONE: "done",
};

export const PROMPTS = {
  [STEPS.MODE]: "Is this brand new, or does it already exist in some form?",
  [STEPS.Q1]: "Tell me what your brand does. One sentence, no industry words.",
  [STEPS.Q1_PUSH]: "Can you say that to a ten year old?",
  [STEPS.Q2]: "What makes you angry about how things are done in your space? What exists that shouldn't?",
  [STEPS.Q2_PUSH]: "What would you burn down if you could?",
  [STEPS.Q3]: "Who are you really here for — and what do they deserve that they're not getting today?",
  [STEPS.Q3_PUSH]: "Forget age and income. What is life like for this person right now?",
};

const NEXT_QUESTION = { q1: STEPS.Q2, q2: STEPS.Q3 };

// Q2 and Q3 only — if the user pauses this long without typing, offer a draft.
const DRAFT_DELAY_MS = 4000;
const DRAFTABLE_STEPS = [STEPS.Q2, STEPS.Q3];

export function useAct0() {
  const [step, setStep] = useState(STEPS.MODE);
  const [mode, setMode] = useState(null); // "new" | "existing"
  const [answers, setAnswers] = useState({ q1: "", q2: "", q3: "" });
  const [pushed, setPushed] = useState({ q1: false, q2: false, q3: false });
  const [reflection, setReflection] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [draft, setDraft] = useState(null);
  const [draftLoading, setDraftLoading] = useState(false);
  const draftTimerRef = useRef(null);

  const goToReflection = useCallback(async (finalAnswers) => {
    setStep(STEPS.REFLECTION);
    setLoading(true);
    setError(null);
    try {
      const text = await reflectAct0({
        oneLiner: finalAnswers.q1,
        values: finalAnswers.q2,
        purpose: finalAnswers.q3,
      });
      setReflection(text);
    } catch {
      setError("Couldn't generate the reflection — check the server and ANTHROPIC_API_KEY.");
    } finally {
      setLoading(false);
    }
  }, []);

  const submitMode = useCallback((value) => {
    setMode(value);
    setStep(STEPS.Q1);
  }, []);

  // Offer a scaffolded draft if the user pauses on Q2/Q3 without typing.
  useEffect(() => {
    setDraft(null);
    setDraftLoading(false);

    if (!DRAFTABLE_STEPS.includes(step)) return;

    draftTimerRef.current = setTimeout(async () => {
      setDraftLoading(true);
      try {
        const text = await draftAct0Answer(step, { q1: answers.q1, q2: answers.q2 });
        setDraft(text);
      } catch {
        // Draft is a nice-to-have — silently skip if it fails.
      } finally {
        setDraftLoading(false);
      }
    }, DRAFT_DELAY_MS);

    return () => clearTimeout(draftTimerRef.current);
  }, [step, answers.q1, answers.q2]);

  // Call as soon as the user starts typing, so the draft doesn't appear underneath them.
  const cancelDraft = useCallback(() => {
    clearTimeout(draftTimerRef.current);
    setDraft(null);
    setDraftLoading(false);
  }, []);

  const dismissDraft = useCallback(() => setDraft(null), []);

  const submitAnswer = useCallback(
    async (text) => {
      const base = step.replace("_push", "");
      const isPush = step.endsWith("_push");
      const nextAnswers = { ...answers, [base]: text };
      setAnswers(nextAnswers);

      const advance = () => {
        if (base === "q3") return goToReflection(nextAnswers);
        setStep(NEXT_QUESTION[base]);
      };

      // After a push, or on a blank/"I don't know" answer, accept and move on.
      if (isPush || !text.trim()) {
        advance();
        return;
      }

      // Only Q1 gets a push-back check. Q2 and Q3 always advance directly.
      if (base !== "q1") {
        advance();
        return;
      }

      setLoading(true);
      setError(null);
      let weak = false;
      try {
        weak = await checkAct0Answer(base, text);
      } catch {
        // If the check fails, accept the answer rather than blocking the flow.
      }
      setLoading(false);

      if (weak && !pushed[base]) {
        setPushed((p) => ({ ...p, [base]: true }));
        setStep(`${base}_push`);
      } else {
        advance();
      }
    },
    [step, answers, pushed, goToReflection]
  );

  const confirm = useCallback(() => setStep(STEPS.DONE), []);

  const correct = useCallback((updatedAnswers) => {
    setAnswers((a) => ({ ...a, ...updatedAnswers }));
    setStep(STEPS.DONE);
  }, []);

  return {
    step,
    mode,
    answers,
    prompt: PROMPTS[step],
    reflection,
    loading,
    error,
    draft,
    draftLoading,
    cancelDraft,
    dismissDraft,
    submitMode,
    submitAnswer,
    confirm,
    correct,
  };
}
