import { useState } from "react";
import ActScreen from "./components/ActScreen.jsx";
import MaskedReveal from "./components/MaskedReveal.jsx";
import { useAct0, STEPS } from "./hooks/useAct0.js";
import { useAct1, ACT1_STEPS, ACT1_WATERMARK } from "./hooks/useAct1.js";

const EXAMPLES = [
  { brand: "Muji", text: "We make everyday products stripped of everything unnecessary." },
  { brand: "Patagonia", text: "We make gear for the outdoors and fix it when it breaks." },
  { brand: "Oatly", text: "We make oat-based food for people who want milk without the cow." },
];

// Act 0 is "Origin" — fast, restless, pure blob (geometryT 0).
const ACT0_BLOB = { geometryT: 0, baseR: 72, speed: 0.008 };

// Act 1 is "Opening up" — hints of geometry emerging, larger and slower.
const ACT1_BLOB = { geometryT: 0.3, baseR: 90, speed: 0.005 };

const ACT1_QUESTION_STEPS = [ACT1_STEPS.OPEN, ACT1_STEPS.OPEN_PUSH];

export default function App() {
  const act0 = useAct0();
  const act1 = useAct1(act0.answers);
  const [act, setAct] = useState("act0");
  const [input, setInput] = useState("");
  const [exampleOpen, setExampleOpen] = useState(false);
  const [heroKey] = useState(0);
  const [glowTrigger, setGlowTrigger] = useState(0);

  const active = act === "act0" ? act0 : act1;

  const handleSubmit = () => {
    if (active.loading) return;
    active.submitAnswer(input);
    setInput("");
    setExampleOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const blob = act === "act0" ? ACT0_BLOB : ACT1_BLOB;

  return (
    <ActScreen
      heroText="Find Your Gap"
      heroKey={heroKey}
      geometryT={blob.geometryT}
      baseR={blob.baseR}
      speed={blob.speed}
      glowTrigger={glowTrigger}
      activeIndex={act === "act0" ? 0 : 1}
      examples={act0.step === STEPS.Q1 || act0.step === STEPS.Q1_PUSH ? EXAMPLES : undefined}
      exampleOpen={exampleOpen}
      onExampleClose={() => setExampleOpen(false)}
      honestText="Every strong brand starts with honest questions"
      continueReady={act === "act0" && act0.step === STEPS.DONE}
      onContinue={() => {
        setAct("act1");
        setGlowTrigger((g) => g + 1);
      }}
    >
      <div
        className="mb-[2.8rem] flex items-center gap-4 font-mono text-[8px] uppercase tracking-[0.3em] text-accent-dim opacity-0 [animation-fill-mode:forwards]"
        style={{ animation: "fadeIn 0.8s ease forwards", animationDelay: "0.4s" }}
      >
        {act === "act0" ? "Act 0 — Before everything else" : "Act 1 — Warm up"}
        <span className="block h-px w-9 bg-accent-dim opacity-40" />
      </div>

      {act === "act0" && act0.step === STEPS.MODE && (
        <>
          <MaskedReveal key="mode" delay={0.2} className="font-serif text-text text-[clamp(2rem,4vw,3.6rem)]">
            Is this brand new, or does it already exist in some form?
          </MaskedReveal>
          <div className="mt-8 flex gap-3 opacity-0 [animation-fill-mode:forwards]" style={{ animation: "fadeIn 1s ease forwards", animationDelay: "0.6s" }}>
            <button
              onClick={() => act0.submitMode("new")}
              className="border border-text-dim px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-text-sub transition-colors hover:border-accent-dim hover:text-accent"
            >
              It's new
            </button>
            <button
              onClick={() => act0.submitMode("existing")}
              className="border border-text-dim px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-text-sub transition-colors hover:border-accent-dim hover:text-accent"
            >
              It already exists
            </button>
          </div>
        </>
      )}

      {act === "act0" && [STEPS.Q1, STEPS.Q1_PUSH, STEPS.Q2, STEPS.Q2_PUSH, STEPS.Q3, STEPS.Q3_PUSH].includes(act0.step) && (
        <>
          <MaskedReveal key={act0.step} delay={0.1} className="font-serif italic text-accent text-[clamp(1.8rem,3.6vw,3.4rem)]">
            {act0.prompt}
          </MaskedReveal>

          <div className="relative mt-8 max-w-[460px]">
            <textarea
              rows={2}
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="speak plainly..."
              disabled={act0.loading}
              className="w-full resize-none border-0 border-b border-text-dim bg-transparent pb-0 pt-[0.8rem] font-serif italic text-base text-text leading-[1.8] outline-none transition-colors focus:border-accent-dim placeholder:text-text-dim disabled:opacity-50"
              style={{ caretColor: "var(--accent)" }}
            />
            <div
              className="absolute bottom-0 left-0 h-px bg-accent transition-[width] duration-700"
              style={{ width: input ? "100%" : "0%" }}
            />
          </div>

          <p className="mt-[1.2rem] font-mono text-[9px] uppercase tracking-[0.22em] text-text-sub">
            {act0.loading ? "thinking..." : "press enter to continue"}
          </p>

          {act0.step === STEPS.Q1 && (
            <button
              onClick={() => setExampleOpen((o) => !o)}
              className="mt-[1.4rem] flex items-center gap-[10px] font-mono text-[8px] uppercase tracking-[0.22em] text-text-dim transition-colors hover:text-accent-dim"
            >
              <span className="block h-px w-[18px] bg-current transition-all" />
              {exampleOpen ? "close example" : "show me an example"}
            </button>
          )}
        </>
      )}

      {act === "act0" && act0.step === STEPS.REFLECTION && (
        <>
          {act0.loading && (
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-sub">reflecting...</p>
          )}
          {act0.error && (
            <p className="font-serif italic text-text-sub max-w-[520px]">{act0.error}</p>
          )}
          {!act0.loading && act0.reflection && (
            <>
              <MaskedReveal key="reflection" delay={0.1} className="font-serif text-text text-[clamp(1.4rem,2.6vw,2.2rem)] leading-[1.4]">
                {act0.reflection}
              </MaskedReveal>
              <div className="mt-8 flex gap-3">
                <button
                  onClick={act0.confirm}
                  className="border border-accent-dim px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent/10"
                >
                  yes, that's right
                </button>
                <button
                  onClick={() => act0.correct({})}
                  className="border border-text-dim px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-text-sub transition-colors hover:border-text-sub"
                >
                  something's off
                </button>
              </div>
            </>
          )}
        </>
      )}

      {act === "act0" && act0.step === STEPS.DONE && (
        <MaskedReveal key="done" delay={0.1} className="font-serif text-text text-[clamp(1.6rem,3vw,2.8rem)]">
          Act 0 locked. Good. Now tell me about the brand itself.
        </MaskedReveal>
      )}

      {act === "act1" && ACT1_QUESTION_STEPS.includes(act1.step) && (
        <>
          <MaskedReveal key={act1.step} delay={0.1} className="font-serif italic text-accent text-[clamp(1.8rem,3.6vw,3.4rem)]">
            {act1.prompt}
          </MaskedReveal>

          <div className="relative mt-8 max-w-[460px]">
            <textarea
              rows={3}
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={act1.step === ACT1_STEPS.OPEN ? ACT1_WATERMARK : "speak plainly..."}
              disabled={act1.loading}
              className="w-full resize-none border-0 border-b border-text-dim bg-transparent pb-0 pt-[0.8rem] font-serif italic text-base text-text leading-[1.8] outline-none transition-colors focus:border-accent-dim placeholder:text-text-dim disabled:opacity-50"
              style={{ caretColor: "var(--accent)" }}
            />
            <div
              className="absolute bottom-0 left-0 h-px bg-accent transition-[width] duration-700"
              style={{ width: input ? "100%" : "0%" }}
            />
          </div>

          <p className="mt-[1.2rem] font-mono text-[9px] uppercase tracking-[0.22em] text-text-sub">
            {act1.loading ? "thinking..." : "press enter to continue"}
          </p>
        </>
      )}

      {act === "act1" && act1.step === ACT1_STEPS.REFLECTION && (
        <>
          {act1.loading && (
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-sub">reflecting...</p>
          )}
          {act1.error && (
            <p className="font-serif italic text-text-sub max-w-[520px]">{act1.error}</p>
          )}
          {!act1.loading && act1.reflection && (
            <>
              <MaskedReveal key="reflection" delay={0.1} className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-sub">
                Here is what I am hearing
              </MaskedReveal>

              <div className="mt-6 max-w-[560px] space-y-6">
                {[
                  { label: "Facts", items: act1.reflection.facts },
                  { label: "Obstacles", items: act1.reflection.obstacles },
                  { label: "Opportunities", items: act1.reflection.opportunities },
                ].map(({ label, items }) => (
                  <div key={label}>
                    <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-accent-dim">{label}</p>
                    <ul className="space-y-1">
                      {(items ?? []).map((item, i) => (
                        <li key={i} className="font-serif italic text-text text-[1.05rem] leading-[1.5]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="mt-6 font-serif italic text-text-sub">Does that feel right?</p>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={act1.confirm}
                  className="border border-accent-dim px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent/10"
                >
                  yes, that's right
                </button>
                <button
                  onClick={() => act1.correct({})}
                  className="border border-text-dim px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-text-sub transition-colors hover:border-text-sub"
                >
                  something's off
                </button>
              </div>
            </>
          )}
        </>
      )}

      {act === "act1" && act1.step === ACT1_STEPS.DONE && (
        <MaskedReveal key="act1-done" delay={0.1} className="font-serif text-text text-[clamp(1.6rem,3vw,2.8rem)]">
          Act 1 locked. Good. Now let us look at who else is in this space and where the gap actually is.
        </MaskedReveal>
      )}
    </ActScreen>
  );
}
