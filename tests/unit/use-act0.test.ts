// @vitest-environment jsdom
// @ts-nocheck -- frame/ui is plain JSX, not part of the TS project (see tsconfig exclude)
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useAct0, STEPS } from "../../frame/ui/src/hooks/useAct0.js";
import * as api from "../../frame/ui/src/lib/api.js";

describe("useAct0", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("starts on the mode question", () => {
    const { result } = renderHook(() => useAct0());
    expect(result.current.step).toBe(STEPS.MODE);
  });

  it("submitMode moves to Q1", () => {
    const { result } = renderHook(() => useAct0());
    act(() => result.current.submitMode("new"));
    expect(result.current.step).toBe(STEPS.Q1);
    expect(result.current.mode).toBe("new");
  });

  it("advances Q1 -> Q2 -> Q3 when answers are not weak", async () => {
    vi.spyOn(api, "checkAct0Answer").mockResolvedValue(false);
    const { result } = renderHook(() => useAct0());

    act(() => result.current.submitMode("new"));
    await act(async () => result.current.submitAnswer("We help bakeries sell online."));
    expect(result.current.step).toBe(STEPS.Q2);

    await act(async () => result.current.submitAnswer("Brands overcharge for logos on shirts."));
    expect(result.current.step).toBe(STEPS.Q3);
  });

  it("pushes back once on a weak answer, then accepts the push response", async () => {
    vi.spyOn(api, "checkAct0Answer").mockResolvedValue(true);
    const { result } = renderHook(() => useAct0());

    act(() => result.current.submitMode("new"));
    await act(async () => result.current.submitAnswer("We sell stuff."));
    expect(result.current.step).toBe(STEPS.Q1_PUSH);

    await act(async () => result.current.submitAnswer("We help bakeries sell online without a tech team."));
    expect(result.current.step).toBe(STEPS.Q2);
  });

  it("does not push twice for the same question", async () => {
    vi.spyOn(api, "checkAct0Answer").mockResolvedValue(true);
    const { result } = renderHook(() => useAct0());

    act(() => result.current.submitMode("new"));
    await act(async () => result.current.submitAnswer("We sell stuff."));
    expect(result.current.step).toBe(STEPS.Q1_PUSH);

    await act(async () => result.current.submitAnswer("Still vague."));
    expect(result.current.step).toBe(STEPS.Q2);
  });

  it("accepts a blank answer and moves on without pushing", async () => {
    const checkSpy = vi.spyOn(api, "checkAct0Answer").mockResolvedValue(false);
    const { result } = renderHook(() => useAct0());

    act(() => result.current.submitMode("new"));
    await act(async () => result.current.submitAnswer("   "));
    expect(result.current.step).toBe(STEPS.Q2);
    expect(checkSpy).not.toHaveBeenCalled();
  });

  it("goes to reflection after Q3 and stores the result", async () => {
    vi.spyOn(api, "checkAct0Answer").mockResolvedValue(false);
    vi.spyOn(api, "reflectAct0").mockResolvedValue("Here is what I am hearing...");
    const { result } = renderHook(() => useAct0());

    act(() => result.current.submitMode("new"));
    await act(async () => result.current.submitAnswer("We help bakeries sell online."));
    await act(async () => result.current.submitAnswer("Brands overcharge for logos on shirts."));
    await act(async () => result.current.submitAnswer("People tired of being sold to."));

    expect(result.current.step).toBe(STEPS.REFLECTION);
    await waitFor(() => expect(result.current.reflection).toBe("Here is what I am hearing..."));
  });

  it("surfaces an error when reflection fails", async () => {
    vi.spyOn(api, "checkAct0Answer").mockResolvedValue(false);
    vi.spyOn(api, "reflectAct0").mockRejectedValue(new Error("network down"));
    const { result } = renderHook(() => useAct0());

    act(() => result.current.submitMode("new"));
    await act(async () => result.current.submitAnswer("We help bakeries sell online."));
    await act(async () => result.current.submitAnswer("Brands overcharge for logos on shirts."));
    await act(async () => result.current.submitAnswer("People tired of being sold to."));

    await waitFor(() => expect(result.current.error).toMatch(/ANTHROPIC_API_KEY/));
  });

  it("offers a draft after a pause on Q2, and dismisses on cancelDraft", async () => {
    vi.useFakeTimers();
    vi.spyOn(api, "checkAct0Answer").mockResolvedValue(false);
    vi.spyOn(api, "draftAct0Answer").mockResolvedValue("A drafted Q2 answer.");
    const { result } = renderHook(() => useAct0());

    act(() => result.current.submitMode("new"));
    await act(async () => result.current.submitAnswer("We help bakeries sell online."));
    expect(result.current.step).toBe(STEPS.Q2);
    expect(result.current.draft).toBeNull();

    await act(async () => vi.advanceTimersByTimeAsync(4000));
    expect(result.current.draft).toBe("A drafted Q2 answer.");

    act(() => result.current.cancelDraft());
    expect(result.current.draft).toBeNull();

    vi.useRealTimers();
  });

  it("does not offer a draft if the user starts typing before the pause", async () => {
    vi.useFakeTimers();
    vi.spyOn(api, "checkAct0Answer").mockResolvedValue(false);
    const draftSpy = vi.spyOn(api, "draftAct0Answer").mockResolvedValue("A drafted Q2 answer.");
    const { result } = renderHook(() => useAct0());

    act(() => result.current.submitMode("new"));
    await act(async () => result.current.submitAnswer("We help bakeries sell online."));
    expect(result.current.step).toBe(STEPS.Q2);

    act(() => result.current.cancelDraft());
    await act(async () => vi.advanceTimersByTimeAsync(4000));
    expect(result.current.draft).toBeNull();
    expect(draftSpy).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it("does not offer a draft on Q1", async () => {
    vi.useFakeTimers();
    const draftSpy = vi.spyOn(api, "draftAct0Answer").mockResolvedValue("draft");
    const { result } = renderHook(() => useAct0());

    act(() => result.current.submitMode("new"));
    expect(result.current.step).toBe(STEPS.Q1);

    await act(async () => vi.advanceTimersByTimeAsync(4000));
    expect(result.current.draft).toBeNull();
    expect(draftSpy).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it("confirm moves from reflection to done", async () => {
    vi.spyOn(api, "checkAct0Answer").mockResolvedValue(false);
    vi.spyOn(api, "reflectAct0").mockResolvedValue("reflection text");
    const { result } = renderHook(() => useAct0());

    act(() => result.current.submitMode("new"));
    await act(async () => result.current.submitAnswer("a"));
    await act(async () => result.current.submitAnswer("b"));
    await act(async () => result.current.submitAnswer("c"));
    await waitFor(() => expect(result.current.reflection).toBe("reflection text"));

    act(() => result.current.confirm());
    expect(result.current.step).toBe(STEPS.DONE);
  });
});
