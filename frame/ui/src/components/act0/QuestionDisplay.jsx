import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Kinetic character-by-character reveal using Big Shoulders Display 700 uppercase.
// Line 1 types left-to-right at 42ms/char.
// Line 2 begins when line 1 is 40% through, also at 42ms/char.
// Whisper appears after all chars are done.
// Re-key this component (key={step+q2i}) to restart animations when question changes.

const CHAR_MS = 42;
const MIN_FONT_PX = 26;

export default function QuestionDisplay({ l1, l2, whisper, onDone }) {
  const line2StartMs = Math.floor(l1.length * 0.4) * CHAR_MS;
  const totalMs = line2StartMs + l2.length * CHAR_MS;

  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const [fontPx, setFontPx] = useState(null); // null = use the CSS clamp() default

  useEffect(() => {
    if (!onDone) return;
    const t = setTimeout(onDone, totalMs + 150);
    return () => clearTimeout(t);
  }, [l1, l2, totalMs, onDone]);

  // Shrink long questions to fit the available width instead of running off
  // the edge of the screen. Always re-baseline against the CSS clamp() size
  // first (font-size in px, not transform:scale, so the layout box actually
  // collapses — no leftover empty space below a shrunk line) before
  // measuring, so resizing back up can recover the full size too.
  useLayoutEffect(() => {
    const fit = () => {
      setFontPx(null);
      requestAnimationFrame(() => {
        const container = containerRef.current;
        const el1 = line1Ref.current;
        const el2 = line2Ref.current;
        if (!container || !el1 || !el2) return;

        const available = container.clientWidth;
        const widest = Math.max(el1.scrollWidth, el2.scrollWidth);
        if (available <= 0 || widest <= available) return;

        const currentPx = parseFloat(getComputedStyle(el1).fontSize);
        const next = Math.max(MIN_FONT_PX, currentPx * (available / widest));
        setFontPx(next);
      });
    };

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [l1, l2]);

  const lineStyle = (color) => ({
    display: "block",
    fontFamily: "'Big Shoulders Display', sans-serif",
    fontWeight: 700,
    fontSize: fontPx != null ? `${fontPx}px` : "clamp(3.2rem, 7.5vw, 7rem)",
    lineHeight: 0.95,
    textTransform: "uppercase",
    letterSpacing: "0.02em",
    color,
    whiteSpace: "nowrap",
  });

  return (
    <div ref={containerRef} className="flex flex-col items-start min-w-0 w-full">
      {/* Line 1 — warm white */}
      <div style={{ overflow: "hidden", lineHeight: 1 }}>
        <span ref={line1Ref} style={lineStyle("var(--text)")}>
          {[...l1].map((ch, i) => (
            <span
              key={i}
              className={`q-char${ch === " " ? " sp" : ""}`}
              style={{ animationDelay: `${i * CHAR_MS}ms` }}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </span>
      </div>

      {/* Line 2 — accent gold */}
      <div style={{ overflow: "hidden", lineHeight: 1 }}>
        <span ref={line2Ref} style={lineStyle("var(--accent)")}>
          {[...l2].map((ch, i) => (
            <span
              key={i}
              className={`q-char${ch === " " ? " sp" : ""}`}
              style={{ animationDelay: `${line2StartMs + i * CHAR_MS}ms` }}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </span>
      </div>

      {/* Whisper — appears after typing completes */}
      {whisper && (
        <p
          className="act0-whisper"
          style={{
            animation: `fadeIn 0.9s ease ${totalMs + 250}ms forwards`,
          }}
        >
          {whisper}
        </p>
      )}
    </div>
  );
}
