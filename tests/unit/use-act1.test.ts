// @vitest-environment jsdom
// @ts-nocheck -- frame/ui is plain JSX, not part of the TS project (see tsconfig exclude)
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useAct1, ACT1_STEPS } from "../../frame/ui/src/hooks/useAct1.js";
import * as api from "../../frame/ui/src/lib/api.js";

describe("useAct1", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("starts on the open question", () => {
    const { result } = renderHook(() => useAct1());
    expect(result.current.step).toBe(ACT1_STEPS.OPEN);
  });

  it("goes straight to reflection when the answer is not weak", async () => {
    vi.spyOn(api, "checkAct1Answer").mockResolvedValue(false);
    vi.spyOn(api, "reflectAct1").mockResolvedValue({ facts: ["f"], obstacles: ["o"], opportunities: ["p"] });
    const { result } = renderHook(() => useAct1());

    await act(async () => result.current.submitAnswer("We help bakeries sell online without a tech team."));
    expect(result.current.step).toBe(ACT1_STEPS.REFLECTION);
    await waitFor(() => expect(result.current.reflection).toEqual({ facts: ["f"], obstacles: ["o"], opportunities: ["p"] }));
  });

  it("pushes back once on a weak answer, then accepts the push response", async () => {
    vi.spyOn(api, "checkAct1Answer").mockResolvedValue(true);
    vi.spyOn(api, "reflectAct1").mockResolvedValue({ facts: [], obstacles: [], opportunities: [] });
    const { result } = renderHook(() => useAct1());

    await act(async () => result.current.submitAnswer("We sell stuff."));
    expect(result.current.step).toBe(ACT1_STEPS.OPEN_PUSH);

    await act(async () => result.current.submitAnswer("Mostly small business owners who feel overwhelmed."));
    expect(result.current.step).toBe(ACT1_STEPS.REFLECTION);
  });

  it("accepts a blank answer and moves straight to reflection without pushing", async () => {
    const checkSpy = vi.spyOn(api, "checkAct1Answer").mockResolvedValue(false);
    vi.spyOn(api, "reflectAct1").mockResolvedValue({ facts: [], obstacles: [], opportunities: [] });
    const { result } = renderHook(() => useAct1());

    await act(async () => result.current.submitAnswer("   "));
    expect(result.current.step).toBe(ACT1_STEPS.REFLECTION);
    expect(checkSpy).not.toHaveBeenCalled();
  });

  it("surfaces an error when reflection fails", async () => {
    vi.spyOn(api, "checkAct1Answer").mockResolvedValue(false);
    vi.spyOn(api, "reflectAct1").mockRejectedValue(new Error("network down"));
    const { result } = renderHook(() => useAct1());

    await act(async () => result.current.submitAnswer("We help bakeries sell online without a tech team."));
    await waitFor(() => expect(result.current.error).toMatch(/ANTHROPIC_API_KEY/));
  });

  it("confirm moves from reflection to done", async () => {
    vi.spyOn(api, "checkAct1Answer").mockResolvedValue(false);
    vi.spyOn(api, "reflectAct1").mockResolvedValue({ facts: ["f"], obstacles: ["o"], opportunities: ["p"] });
    const { result } = renderHook(() => useAct1());

    await act(async () => result.current.submitAnswer("We help bakeries sell online without a tech team."));
    await waitFor(() => expect(result.current.reflection).not.toBeNull());

    act(() => result.current.confirm());
    expect(result.current.step).toBe(ACT1_STEPS.DONE);
  });
});
