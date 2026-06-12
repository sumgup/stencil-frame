import { useState } from "react";
import ActScreen from "./components/ActScreen.jsx";
import MaskedReveal from "./components/MaskedReveal.jsx";

// Temporary review harness — act presets from blob-morph-demo.html
const ACT_PRESETS = [
  { label: "Act 0 — Who Are You", geometryT: 0, baseR: 72, speed: 0.008 },
  { label: "Act 1 — Warm Up", geometryT: 0.2, baseR: 88, speed: 0.006 },
  { label: "Act 2b — Gap Map", geometryT: 0.5, baseR: 100, speed: 0.005 },
  { label: "Act 3 — Confirm", geometryT: 0.85, baseR: 115, speed: 0.003 },
];

const EXAMPLES = [
  { brand: "Muji", text: "We make everyday products stripped of everything unnecessary." },
  { brand: "Patagonia", text: "We make gear for the outdoors and fix it when it breaks." },
  { brand: "Oatly", text: "We make oat-based food for people who want milk without the cow." },
];

export default function App() {
  const [actIndex, setActIndex] = useState(0);
  const [glowTrigger, setGlowTrigger] = useState(0);
  const [heroKey, setHeroKey] = useState(0);
  const [exampleOpen, setExampleOpen] = useState(false);
  const [input, setInput] = useState("");
  const act = ACT_PRESETS[actIndex];

  return (
    <>
      <ActScreen
        heroText="Find Your Gap"
        heroKey={heroKey}
        geometryT={act.geometryT}
        baseR={act.baseR}
        speed={act.speed}
        glowTrigger={glowTrigger}
        activeIndex={actIndex}
        examples={EXAMPLES}
        exampleOpen={exampleOpen}
        onExampleClose={() => setExampleOpen(false)}
        honestText="Every strong brand starts with honest questions"
        continueReady={input.trim().length > 0}
        onContinue={() => setActIndex((i) => Math.min(i + 1, ACT_PRESETS.length - 1))}
      >
        <div
          className="mb-[2.8rem] flex items-center gap-4 font-mono text-[8px] uppercase tracking-[0.3em] text-accent-dim opacity-0 [animation-fill-mode:forwards]"
          style={{ animation: "fadeIn 0.8s ease forwards", animationDelay: "4.2s" }}
        >
          Act 0 — Before everything else
          <span className="block h-px w-9 bg-accent-dim opacity-40" />
        </div>

        <MaskedReveal delay={4.6} className="font-serif text-text text-[clamp(2.2rem,4.5vw,4.4rem)]">
          Tell me what
        </MaskedReveal>
        <MaskedReveal delay={4.85} className="font-serif italic text-accent text-[clamp(2.2rem,4.5vw,4.4rem)]">
          your brand does.
        </MaskedReveal>
        <MaskedReveal delay={5.1} className="font-serif text-text-sub text-[clamp(1.8rem,3.6vw,3.4rem)]">
          One sentence.
        </MaskedReveal>

        <p
          className="mt-[2.4rem] font-mono text-[9px] uppercase tracking-[0.22em] text-text-sub opacity-0 [animation-fill-mode:forwards]"
          style={{ animation: "fadeIn 1s ease forwards", animationDelay: "6s" }}
        >
          No industry words — plain language only
        </p>

        <div
          className="relative mt-8 max-w-[460px] opacity-0 [animation-fill-mode:forwards]"
          style={{ animation: "fadeIn 1s ease forwards", animationDelay: "6.4s" }}
        >
          <textarea
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="speak plainly..."
            className="w-full resize-none border-0 border-b border-text-dim bg-transparent pb-0 pt-[0.8rem] font-serif italic text-base text-text leading-[1.8] outline-none transition-colors focus:border-accent-dim placeholder:text-text-dim"
            style={{ caretColor: "var(--accent)" }}
          />
          <div
            className="absolute bottom-0 left-0 h-px bg-accent transition-[width] duration-700"
            style={{ width: input ? "100%" : "0%" }}
          />
        </div>

        <button
          onClick={() => setExampleOpen((o) => !o)}
          className="mt-[1.4rem] flex items-center gap-[10px] font-mono text-[8px] uppercase tracking-[0.22em] text-text-dim transition-colors hover:text-accent-dim"
        >
          <span className="block h-px w-[18px] bg-current transition-all" />
          {exampleOpen ? "close example" : "show me an example"}
        </button>
      </ActScreen>

      {/* Review harness controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 pointer-events-auto">
        {ACT_PRESETS.map((preset, i) => (
          <button
            key={preset.label}
            onClick={() => setActIndex(i)}
            className={`font-mono text-[9px] uppercase tracking-[0.16em] px-4 py-2 border transition-colors ${
              i === actIndex
                ? "border-accent text-accent bg-accent/10"
                : "border-text-dim text-text-dim hover:border-text-sub hover:text-text-sub"
            }`}
          >
            Act {i === 2 ? "2b" : i}
          </button>
        ))}
        <button
          onClick={() => setGlowTrigger((g) => g + 1)}
          className="font-mono text-[9px] uppercase tracking-[0.16em] px-6 py-2 border border-accent-dim text-accent ml-6 hover:bg-accent/10 transition-colors"
        >
          confirm — morph to form →
        </button>
        <button
          onClick={() => setHeroKey((k) => k + 1)}
          className="font-mono text-[9px] uppercase tracking-[0.16em] px-6 py-2 border border-text-dim text-text-dim hover:border-text-sub hover:text-text-sub ml-2 transition-colors"
        >
          replay hero
        </button>
      </div>
    </>
  );
}
