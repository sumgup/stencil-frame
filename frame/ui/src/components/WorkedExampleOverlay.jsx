/**
 * WorkedExampleOverlay — a single full worked example: one brand's answers to
 * all three Act 0 questions plus its reflection, shown together so a user can
 * see the whole shape of the exercise before they start. Available before
 * Question 1 only.
 *
 * `example` is { brand, qa: [{ prompt, answer }], reflection }.
 */
export default function WorkedExampleOverlay({ open, onClose, example }) {
  if (!example) return null;

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center transition-opacity duration-500 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-[rgba(4,8,5,0.92)]" onClick={onClose} />
      <div className="relative max-h-[80vh] w-[640px] max-w-[90vw] overflow-y-auto border border-text-ghost bg-[rgba(8,15,10,0.96)] px-8 py-7">
        <p className="mb-6 border-b border-text-ghost pb-2 font-mono text-[7px] uppercase tracking-[0.25em] text-accent-dim">
          How {example.brand} answered all of this
        </p>

        <div className="space-y-6">
          {example.qa.map((pair, i) => (
            <div key={i}>
              <p className="mb-2 font-serif italic text-[1rem] leading-[1.5] text-accent">{pair.prompt}</p>
              <p className="font-serif text-[0.95rem] leading-[1.6] text-text-sub">{pair.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 border-t border-text-ghost pt-6">
          <p className="mb-3 font-mono text-[7px] uppercase tracking-[0.25em] text-accent-dim">Reflection</p>
          <p className="font-serif text-[0.95rem] leading-[1.6] text-text-sub">{example.reflection}</p>
        </div>

        <button
          onClick={onClose}
          className="mt-7 font-mono text-[7px] uppercase tracking-[0.14em] text-text-dim transition-colors hover:text-text-sub"
        >
          ← close
        </button>
      </div>
    </div>
  );
}
