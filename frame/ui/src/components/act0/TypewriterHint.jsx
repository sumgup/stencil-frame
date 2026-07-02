import { useEffect, useRef, useState } from "react";

// Appears after a pause when the input is empty.
// Types out the current brand's example answer, holds 2.5s, then hides.
// visible: controlled externally (show after 3.5s pause)
// onCycleComplete: called after the text types out and hides — caller can advance the brand
export default function TypewriterHint({ brand, questionIndex, visible, onCycleComplete }) {
  const [displayText, setDisplayText] = useState("");
  const [active, setActive] = useState(false);
  // The brand pill cycles brandIdx independently every 5s — if that happens
  // mid-typing, "brand" (the live prop) would no longer match the text
  // already on screen. Pin the brand used for this typing pass so the label
  // and dot never drift from the text.
  const [typingBrand, setTypingBrand] = useState(brand);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!visible) {
      setDisplayText("");
      setActive(false);
      clearTimeout(timerRef.current);
      return;
    }

    if (active) return;

    const pinnedBrand = brand;
    const text = questionIndex === 1 ? pinnedBrand.q2 : pinnedBrand.q1;
    setTypingBrand(pinnedBrand);
    setDisplayText("");
    setActive(true);
    let i = 0;

    const step = () => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
        timerRef.current = setTimeout(step, 26 + Math.random() * 16);
      } else {
        timerRef.current = setTimeout(() => {
          setActive(false);
          setDisplayText("");
          onCycleComplete?.();
        }, 2500);
      }
    };

    timerRef.current = setTimeout(step, 0);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, questionIndex]);

  const show = visible && (active || displayText);

  return (
    <div className={`tw-hint${show ? " visible" : ""}`} style={{ marginTop: "0.9rem" }}>
      <div className="tw-dot" style={{ background: typingBrand.colour }} />
      <div>
        <p className="tw-label">{typingBrand.name}</p>
        <p className="tw-text">
          {displayText}
          {active && <span className="tw-cursor" />}
        </p>
      </div>
    </div>
  );
}
