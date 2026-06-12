import { useState } from "react";
import BlobMorph from "./components/BlobMorph.jsx";
import VerticalHero from "./components/VerticalHero.jsx";

// Temporary review harness for BlobMorph — act presets from blob-morph-demo.html
const ACT_PRESETS = [
  { label: "Act 0 — Who Are You", geometryT: 0, baseR: 72, speed: 0.008 },
  { label: "Act 1 — Warm Up", geometryT: 0.2, baseR: 88, speed: 0.006 },
  { label: "Act 2b — Gap Map", geometryT: 0.5, baseR: 100, speed: 0.005 },
  { label: "Act 3 — Confirm", geometryT: 0.85, baseR: 115, speed: 0.003 },
];

export default function App() {
  const [actIndex, setActIndex] = useState(0);
  const [glowTrigger, setGlowTrigger] = useState(0);
  const [heroKey, setHeroKey] = useState(0);
  const act = ACT_PRESETS[actIndex];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BlobMorph geometryT={act.geometryT} baseR={act.baseR} speed={act.speed} glowTrigger={glowTrigger} />
      <VerticalHero key={heroKey} text="Find Your Gap" />

      <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-8 min-h-screen pointer-events-none">
        <h1 className="font-fraunces font-black text-5xl uppercase tracking-wide text-accent">
          Find Your Gap
        </h1>
        <p className="font-serif italic text-2xl text-text">
          Tell me what your brand does.
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-sub">
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
      </div>
    </div>
  );
}
