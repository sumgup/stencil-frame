// IllusLayer — full-screen illustration.
// phase "hero"   → arrives (opacity 1, sharp, brightness 0.75)
// phase "recede" → stays but dims to brightness 0.22 (atmosphere)
//
// Expects the real asset at public/assets/illustrations/act0-origin.webp,
// referenced here as an absolute path (Vite serves /public at the site root —
// do not import it as a module). If the file is missing, the img's onError
// hides it and the dark fallback div behind it (with the same dimensions)
// becomes visible instead of a broken-image icon.

// Maps the caller's phase value to the CSS state class. Act0 tracks
// illusPhase as "idle" | "hero" | "recede" — "hero" means "arrived",
// which is what the .arrive CSS class actually represents.
const PHASE_CLASS = {
  hero: "arrive",
  recede: "recede",
};

import { useState } from "react";

export default function IllusLayer({ phase }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="illus-layer">
      {imgError && (
        <div className="illus-fallback">
          <span>act0-origin.webp missing — add it to frame/ui/public/assets/illustrations/</span>
        </div>
      )}
      <img
        src="/assets/illustrations/act0-origin.webp"
        alt=""
        onError={() => setImgError(true)}
        className={`illus-bg ${PHASE_CLASS[phase] || ""}`}
      />
      <div className="illus-vignette" />
    </div>
  );
}
