const DEFAULT_STEPS = ["Who", "Warm", "Research", "Map", "Confirm"];

/**
 * ProgressIndicator — the right-edge rail showing where the user is in the
 * Investigate session (Act 0 "Who" through Act 3 "Confirm").
 */
export default function ProgressIndicator({ steps = DEFAULT_STEPS, activeIndex = 0, delay = 0 }) {
  return (
    <div
      className="fixed right-[2.8rem] top-1/2 -translate-y-1/2 z-20 flex flex-col gap-[10px] opacity-0 [animation-fill-mode:forwards]"
      style={{ animation: "fadeIn 1s ease forwards", animationDelay: `${delay}s` }}
    >
      {steps.map((label, i) => {
        const on = i === activeIndex;
        return (
          <div key={label} className="flex items-center gap-2 justify-end">
            <span
              className={`font-mono text-[7px] tracking-[0.16em] uppercase ${
                on ? "text-accent-dim" : "text-text-dim"
              }`}
            >
              {label}
            </span>
            <div className={`h-px ${on ? "w-5 bg-accent" : "w-3 bg-text-dim"}`} />
          </div>
        );
      })}
    </div>
  );
}
