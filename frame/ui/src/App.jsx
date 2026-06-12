import { useState } from "react";
import BlobMorph from "./components/BlobMorph.jsx";
import VerticalHero from "./components/VerticalHero.jsx";
import MaskedReveal from "./components/MaskedReveal.jsx";
import ProgressIndicator from "./components/ProgressIndicator.jsx";
import ExamplePanel from "./components/ExamplePanel.jsx";

// Temporary review harness for BlobMorph — act presets from blob-morph-demo.html
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
  const act = ACT_PRESETS[actIndex];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BlobMorph geometryT={act.geometryT} baseR={act.baseR} speed={act.speed} glowTrigger={glowTrigger} />
      <VerticalHero key={heroKey} text="Find Your Gap" />

      <ProgressIndicator activeIndex={actIndex} delay={0.3} />
      <ExamplePanel open={exampleOpen} onClose={() => setExampleOpen(false)} examples={EXAMPLES} />

      <div className="relative z-10 flex flex-col items-center justify-center gap-2 px-8 min-h-screen pointer-events-none text-center">
        <MaskedReveal delay={0.2} className="font-serif text-text text-[clamp(2.2rem,4.5vw,4.4rem)]">
          Tell me what
        </MaskedReveal>
        <MaskedReveal delay={0.45} className="font-serif italic text-accent text-[clamp(2.2rem,4.5vw,4.4rem)]">
          your brand does.
        </MaskedReveal>
        <MaskedReveal delay={0.7} className="font-serif text-text-sub text-[clamp(1.8rem,3.6vw,3.4rem)]">
          One sentence.
        </MaskedReveal>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-sub mt-4">
          {act.label}
        </p>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 pointer-events-auto">
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
        <button
          onClick={() => setExampleOpen((o) => !o)}
          className="font-mono text-[9px] uppercase tracking-[0.16em] px-6 py-2 border border-text-dim text-text-dim hover:border-text-sub hover:text-text-sub ml-2 transition-colors"
        >
          {exampleOpen ? "close examples" : "show me an example"}
        </button>
      </div>
    </div>
  );
}
