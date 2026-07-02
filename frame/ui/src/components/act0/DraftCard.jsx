import { useEffect, useRef, useState } from "react";

// Scaffolded draft — shown after a pause when input is empty (Q2 and Q3 only).
// draft: string | null
// draftLoading: boolean
export default function DraftCard({ draft, draftLoading, onUse, onEdit, onDismiss }) {
  const [mounted, setMounted] = useState(false);
  const prevRef = useRef(false);

  useEffect(() => {
    const hasContent = !!(draft || draftLoading);
    if (hasContent && !prevRef.current) {
      // Small delay lets display:block settle before opacity transition fires
      requestAnimationFrame(() => setMounted(true));
    }
    if (!hasContent) {
      setMounted(false);
    }
    prevRef.current = hasContent;
  }, [draft, draftLoading]);

  if (!draft && !draftLoading) return null;

  return (
    <div className={`draft-card${mounted ? " visible" : ""}`} style={{ marginTop: "1rem" }}>
      <div className="draft-label">
        <span className="draft-pulse" />
        a starting point — not your answer
      </div>

      {draftLoading && !draft && (
        <p
          style={{
            fontFamily: "DM Mono, monospace",
            fontSize: "8px",
            letterSpacing: "0.14em",
            color: "var(--text-dim)",
          }}
        >
          drafting something from what you've said...
        </p>
      )}

      {draft && (
        <>
          <p className="draft-text">"{draft}"</p>
          <div className="draft-actions">
            <button className="d-btn primary" onClick={onUse}>
              this is right →
            </button>
            <button className="d-btn" onClick={onEdit}>
              edit this
            </button>
            <button className="d-btn" onClick={onDismiss}>
              write my own
            </button>
          </div>
        </>
      )}
    </div>
  );
}
