import { useState } from "react";

// Q3 — two-beat "who is your person" flow.
// Beat 1: name input
// Beat 2: three mad-lib slots → compiles to a sentence → same 3-button
// draft card as Q2 ("this is right →" / "edit this" / "write my own").
export default function Q3MadLibs({ onSubmit }) {
  const [phase, setPhase] = useState("name"); // "name" | "slots" | "draft" | "freeform"
  const [name, setName] = useState("");
  const [s1, setS1] = useState("");
  const [s2, setS2] = useState("");
  const [s3, setS3] = useState("");
  const [sceneText, setSceneText] = useState("");
  const [freeText, setFreeText] = useState("");

  const handleNameKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!name.trim()) return;
      setPhase("slots");
    }
  };

  const buildScene = () => {
    if (!s1.trim() || !s2.trim() || !s3.trim()) return;
    setSceneText(`${name} is ${s1} who feels ${s2} — especially ${s3}.`);
    setPhase("draft");
  };

  const handleFreeformKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const v = freeText.trim();
      if (v.length > 2) onSubmit(v);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--text-dim)",
    padding: "0.7rem 0",
    fontFamily: "DM Sans, sans-serif",
    fontWeight: 300,
    fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
    color: "var(--text)",
    outline: "none",
    caretColor: "var(--accent)",
    transition: "border-color 0.4s",
  };

  return (
    <div style={{ maxWidth: "560px", width: "100%", marginTop: "1.6rem" }}>
      {/* Setup line — italic, muted */}
      <p
        style={{
          fontFamily: "DM Sans, sans-serif",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "clamp(1.4rem, 2.8vw, 2.1rem)",
          color: "var(--text)",
          opacity: 0.85,
          marginBottom: "1.6rem",
          lineHeight: 1.5,
          maxWidth: "640px",
        }}
      >
        Think of one person who genuinely needs what you're building.
      </p>

      {/* Beat 1 — name */}
      {phase === "name" && (
        <div className="act0-input-wrap" style={{ position: "relative" }}>
          <p
            style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "8px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--text-dim)",
              marginBottom: "0.4rem",
            }}
          >
            What's their name?
          </p>
          <input
            type="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleNameKey}
            placeholder="Priya, Marcus, Zara..."
            style={{ ...inputStyle, minHeight: "auto" }}
          />
          <div className="act0-input-line" />
        </div>
      )}

      {/* Beat 2 — three slots */}
      {phase === "slots" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div className="act0-input-wrap" style={{ position: "relative" }}>
            <span className="slot-label">describe them in a few words</span>
            <input
              type="text"
              autoFocus
              value={s1}
              onChange={(e) => setS1(e.target.value)}
              placeholder="19-year-old who loves bold colour"
              style={{ ...inputStyle, minHeight: "auto" }}
            />
            <div className="act0-input-line" />
          </div>
          <div className="act0-input-wrap" style={{ position: "relative" }}>
            <span className="slot-label">the feeling they carry</span>
            <input
              type="text"
              value={s2}
              onChange={(e) => setS2(e.target.value)}
              placeholder="invisible"
              style={{ ...inputStyle, minHeight: "auto" }}
            />
            <div className="act0-input-line" />
          </div>
          <div className="act0-input-wrap" style={{ position: "relative" }}>
            <span className="slot-label">the moment this matters most</span>
            <input
              type="text"
              value={s3}
              onChange={(e) => setS3(e.target.value)}
              placeholder="trying to find a shade that matches her skin"
              style={{ ...inputStyle, minHeight: "auto" }}
            />
            <div className="act0-input-line" />
          </div>
          <button
            className="d-btn primary"
            onClick={buildScene}
            style={{ marginTop: "0.4rem", alignSelf: "flex-start" }}
          >
            show me their day →
          </button>
        </div>
      )}

      {/* Draft — same 3-button pattern as Q2's scaffold draft */}
      {phase === "draft" && (
        <div className="draft-card visible" style={{ marginTop: "0.5rem" }}>
          <div className="draft-label">
            <span className="draft-pulse" />
            a starting point — not your answer
          </div>
          <p className="draft-text">"{sceneText}"</p>
          <div className="draft-actions">
            <button className="d-btn primary" onClick={() => onSubmit(sceneText)}>
              this is right →
            </button>
            <button
              className="d-btn"
              onClick={() => {
                setFreeText(sceneText);
                setPhase("freeform");
              }}
            >
              edit this
            </button>
            <button
              className="d-btn"
              onClick={() => {
                setFreeText("");
                setPhase("freeform");
              }}
            >
              write my own
            </button>
          </div>
        </div>
      )}

      {/* Freeform — edit the draft or write from scratch */}
      {phase === "freeform" && (
        <div className="act0-input-wrap" style={{ position: "relative" }}>
          <textarea
            rows={2}
            autoFocus
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            onKeyDown={handleFreeformKey}
            placeholder="speak plainly..."
            style={{ ...inputStyle, resize: "none", minHeight: "56px", lineHeight: 1.65 }}
          />
          <div className="act0-input-line" />
        </div>
      )}
    </div>
  );
}
