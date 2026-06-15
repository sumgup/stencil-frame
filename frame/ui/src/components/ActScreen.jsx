import BlobMorph from "./BlobMorph.jsx";
import VerticalHero from "./VerticalHero.jsx";
import Spine from "./Spine.jsx";
import Motif from "./Motif.jsx";
import StructuralLines from "./StructuralLines.jsx";
import ProgressIndicator from "./ProgressIndicator.jsx";
import WorkedExampleOverlay from "./WorkedExampleOverlay.jsx";

/**
 * ActScreen — the shared full-bleed layout for every Investigate act:
 * blob backdrop, grain, vignette, structural lines, vertical hero,
 * spine + motif, progress rail, optional worked-example overlay, and a
 * left-aligned "stage" for the act's own content (questions, input, etc).
 *
 * Each act provides its own stage content via `children` and controls
 * the blob's emotional state via `geometryT` / `baseR` / `speed` / `glowTrigger`.
 */
export default function ActScreen({
  heroText,
  heroKey,
  geometryT = 0,
  baseR = 72,
  speed = 0.008,
  glowTrigger = 0,
  activeIndex = 0,
  workedExample,
  workedExampleOpen = false,
  onWorkedExampleClose,
  honestText,
  continueReady = false,
  onContinue,
  children,
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <BlobMorph geometryT={geometryT} baseR={baseR} speed={speed} glowTrigger={glowTrigger} />

      <div className="noise-overlay fixed inset-0 z-[100] pointer-events-none" />
      <div
        className="fixed inset-0 z-[3] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 65% 50%, transparent 25%, rgba(4,8,5,0.85) 100%)",
        }}
      />

      <StructuralLines />
      <VerticalHero key={heroKey} text={heroText} />
      <Spine />
      <Motif />
      <ProgressIndicator activeIndex={activeIndex} delay={5.5} />

      {workedExample && (
        <WorkedExampleOverlay open={workedExampleOpen} onClose={onWorkedExampleClose} example={workedExample} />
      )}

      <div className="fixed inset-0 z-10 flex flex-col justify-center px-[7rem] pl-[14rem]">
        {children}
      </div>

      {honestText && (
        <p
          className="fixed bottom-[2.2rem] left-1/2 -translate-x-1/2 z-20 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.2em] text-text-ghost opacity-0 [animation-fill-mode:forwards]"
          style={{ animation: "fadeIn 2s ease forwards", animationDelay: "7.5s" }}
        >
          {honestText}
        </p>
      )}

      {onContinue && (
        <button
          onClick={continueReady ? onContinue : undefined}
          className={`fixed bottom-[1.8rem] right-[2.8rem] z-20 border px-[1.2rem] py-[0.6rem] font-mono text-[9px] uppercase tracking-[0.2em] transition-all duration-300 opacity-0 [animation-fill-mode:forwards] ${
            continueReady
              ? "border-accent-dim text-text-sub pointer-events-auto hover:border-accent hover:text-accent"
              : "border-text-dim text-text-sub pointer-events-none"
          }`}
          style={{ animation: "fadeIn 1s ease forwards", animationDelay: "7.5s" }}
        >
          continue →
        </button>
      )}
    </div>
  );
}
