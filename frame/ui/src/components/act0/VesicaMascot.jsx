import { useEffect, useState } from "react";
import VesicaIcon from "../VesicaIcon.jsx";

// Vesica Piscis mascot — sits left of question text, same height as cap-height.
// Bug fix: animation-fill-mode:forwards on .pulsing keeps opacity at 0.22.
// After animation ends, JS switches to .present which sets opacity:0.22 statically.
// Opacity NEVER goes to zero after arrival.
export default function VesicaMascot({ arrived }) {
  const [state, setState] = useState("idle"); // "idle" | "pulsing" | "present"

  useEffect(() => {
    if (arrived && state === "idle") {
      setState("pulsing");
      const t = setTimeout(() => setState("present"), 1900);
      return () => clearTimeout(t);
    }
  }, [arrived, state]);

  return (
    <div
      className={`vesica-mascot ${state}`}
      style={{
        "--vm-h": "clamp(2.6rem, 5vw, 5rem)",
        height: "var(--vm-h)",
        width: "calc(var(--vm-h) * 1.5)",
        marginTop: "0.08em",
      }}
    >
      <VesicaIcon
        className="w-full h-full"
        circleClassName="vm-circle"
        fillClassName="vm-fill"
      />
    </div>
  );
}
