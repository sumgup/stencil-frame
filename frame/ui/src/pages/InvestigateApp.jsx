import { useState } from "react";
import Act0 from "../components/act0/Act0.jsx";

// Placeholder for Act 1 — shown after Act 0 completes.
// Displays a recap of the 3 answers and a "coming soon" message.
function Act1Placeholder({ answers, onBack }) {
  const items = [
    { q: "What your brand does", a: answers.q1 },
    { q: "What's wrong in your space", a: answers.q2 },
    { q: "Who you're here for", a: answers.q3 },
  ];

  return (
    <div
      className="noise-overlay"
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 20,
        opacity: 0,
        animation: "fadeIn 0.9s ease 0.3s forwards",
      }}
    >
      {/* Grain */}
      <div
        className="noise-overlay"
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 300 }}
      />

      {/* Top / bottom structural lines */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 1, background: "var(--text-dim)" }} />
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 1, background: "var(--text-dim)" }} />

      <div style={{ maxWidth: 560, width: "100%", padding: "3rem 2rem", position: "relative", zIndex: 10 }}>
        {/* Act label */}
        <p
          className="font-mono"
          style={{
            fontSize: 9,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--accent-dim)",
            marginBottom: "2.5rem",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          Act 1 — Warm Up
          <span style={{ display: "block", height: 1, width: 36, background: "var(--accent-dim)", opacity: 0.4 }} />
        </p>

        {/* Recap */}
        <p
          className="font-mono"
          style={{
            fontSize: 8,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--text-dim)",
            marginBottom: "1.4rem",
          }}
        >
          What you just said
        </p>

        {items.map(({ q, a }) => (
          <div key={q} style={{ marginBottom: "1.6rem" }}>
            <p
              className="font-mono"
              style={{
                fontSize: 8,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--accent-dim)",
                marginBottom: "0.4rem",
              }}
            >
              {q}
            </p>
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
                lineHeight: 1.65,
                color: "var(--text-sub)",
              }}
            >
              {a ? `"${a}"` : <span style={{ color: "var(--text-dim)" }}>—</span>}
            </p>
          </div>
        ))}

        {/* Coming soon */}
        <div
          style={{
            borderTop: "0.5px solid var(--text-dim)",
            paddingTop: "2rem",
            marginTop: "0.5rem",
          }}
        >
          <p
            className="font-mono"
            style={{
              fontSize: 8,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-dim)",
              marginBottom: "0.9rem",
            }}
          >
            coming soon
          </p>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              lineHeight: 1.7,
              color: "var(--text-sub)",
              marginBottom: "2rem",
            }}
          >
            Act 1 — Warm Up is under construction. You'll look outward here: market context,
            competitor gaps, and early positioning signals.
          </p>
          <button
            className="d-btn"
            style={{ fontSize: "9px", letterSpacing: "0.18em" }}
            onClick={onBack}
          >
            ← return to Act 0
          </button>
        </div>
      </div>
    </div>
  );
}

// The /investigate route — Act 0, then Act 1 placeholder.
export default function InvestigateApp() {
  const [act, setAct] = useState("act0");
  const [act0Answers, setAct0Answers] = useState({ q1: "", q2: "", q3: "" });

  if (act === "act0") {
    return (
      <Act0
        onComplete={(answers) => {
          setAct0Answers(answers ?? { q1: "", q2: "", q3: "" });
          setAct("act1");
        }}
      />
    );
  }

  return (
    <Act1Placeholder
      answers={act0Answers}
      onBack={() => setAct("act0")}
    />
  );
}
