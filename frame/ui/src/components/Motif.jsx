const BARS = [
  { height: 8, delay: 0 },
  { height: 13, delay: 0.4 },
  { height: 17, delay: 0.8 },
  { height: 11, delay: 1.2 },
];

/**
 * Motif — four small bars, top-right, that breathe gently forever.
 * The sonic-identity placeholder for the Investigate session.
 */
export default function Motif() {
  return (
    <div
      className="fixed top-[2rem] right-[2.8rem] z-20 flex items-end gap-[3px] opacity-0 [animation-fill-mode:forwards]"
      style={{ animation: "fadeIn 1s ease forwards", animationDelay: "0.8s" }}
    >
      {BARS.map((bar, i) => (
        <div
          key={i}
          className="w-[1.5px] rounded-[1px] bg-accent-dim"
          style={{
            height: `${bar.height}px`,
            animation: "mPulse 5s ease-in-out infinite",
            animationDelay: `${bar.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
