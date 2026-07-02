/**
 * MaskedReveal — a line of text that slides up from behind an overflow mask.
 * Used for the act's question lines (q-l1/q-l2/q-l3 in act0-typographic.html).
 *
 * `delay` (seconds) staggers successive lines so they reveal one after another.
 */
export default function MaskedReveal({ children, delay = 0, className = "", style }) {
  return (
    <div className="overflow-hidden leading-[1.08] mb-[0.1em]">
      <span
        className={`block translate-y-[108%] [animation-fill-mode:forwards] will-change-transform ${className}`}
        style={{
          animation: "slideUp 1s cubic-bezier(0.16,1,0.3,1) forwards",
          animationDelay: `${delay}s`,
          ...style,
        }}
      >
        {children}
      </span>
    </div>
  );
}
