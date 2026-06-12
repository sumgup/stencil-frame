/**
 * ExamplePanel — "how others answered this" panel. Slides in from the left
 * edge of the stage when the user asks for examples; clicking a card or the
 * close button dismisses it.
 *
 * `examples` is an array of { brand, text }.
 */
export default function ExamplePanel({ open, onClose, examples }) {
  return (
    <div
      className={`fixed left-[11rem] top-1/2 -translate-y-1/2 w-[220px] z-30 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        open ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none -translate-x-3"
      }`}
    >
      <p className="font-mono text-[7px] tracking-[0.25em] uppercase text-accent-dim mb-[0.8rem] pb-2 border-b border-text-ghost">
        How others answered this
      </p>
      {examples.map((ex) => (
        <div
          key={ex.brand}
          onClick={onClose}
          className="px-4 py-[0.85rem] border border-text-ghost mb-1 cursor-pointer transition-colors hover:border-accent-dim bg-[rgba(8,15,10,0.92)]"
        >
          <p className="font-mono text-[7px] tracking-[0.18em] uppercase text-accent-dim mb-1">{ex.brand}</p>
          <p className="font-serif italic text-[0.78rem] leading-[1.55] text-text-sub">{ex.text}</p>
        </div>
      ))}
      <button
        onClick={onClose}
        className="font-mono text-[7px] tracking-[0.14em] uppercase text-text-dim hover:text-text-sub mt-[0.6rem] transition-colors"
      >
        ← close
      </button>
    </div>
  );
}
