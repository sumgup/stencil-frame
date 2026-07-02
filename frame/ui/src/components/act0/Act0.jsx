import { useEffect, useRef, useState } from "react";
import BlobMorph from "../BlobMorph.jsx";
import VesicaIcon from "../VesicaIcon.jsx";
import StructuralLines from "../StructuralLines.jsx";
import ProgressIndicator from "../ProgressIndicator.jsx";
import IllusLayer from "./IllusLayer.jsx";
import VesicaMascot from "./VesicaMascot.jsx";
import QuestionDisplay from "./QuestionDisplay.jsx";
import BrandPill from "./BrandPill.jsx";
import TypewriterHint from "./TypewriterHint.jsx";
import DraftCard from "./DraftCard.jsx";
import Q3MadLibs from "./Q3MadLibs.jsx";
import BrandExampleOverlay from "./BrandExampleOverlay.jsx";
import { useFocusMode } from "./useFocusMode.js";
import { BRANDS, Q2_VARIANTS } from "./brandsData.js";
import { useAct0, STEPS } from "../../hooks/useAct0.js";

// Only Q1 and Q1_PUSH have kinetic question text.
// Q2 uses Q2_VARIANTS directly (no entry here). Q3 uses Q3MadLibs.
const KINETIC = {
  [STEPS.Q1]:      { l1: "What does your", l2: "brand do?" },
  [STEPS.Q1_PUSH]: { l1: "Can you say that to", l2: "a ten year old?" },
};

const WHISPERS = {
  [STEPS.Q1]:      "if you need industry words, the sentence isn't done yet",
  [STEPS.Q1_PUSH]: "",
  [STEPS.Q2]:      "even if others think it's normal — what bothers you most?",
};

const BLOB_BASE = { baseR: 62, speed: 0.007 };

const TEXTAREA_STYLE = {
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
  resize: "none",
  caretColor: "var(--accent)",
  transition: "border-color 0.4s",
  lineHeight: 1.65,
  minHeight: "56px",
};

export default function Act0({ onComplete }) {
  const act0 = useAct0();
  const { focused, onTyping, onBlur, cancelFocus } = useFocusMode();

  const [phase, setPhase] = useState("hero"); // "hero" | "session"
  const [illusPhase, setIllusPhase] = useState("idle"); // "idle" | "hero" | "recede"
  const [input, setInput] = useState("");
  const [brandIdx, setBrandIdx] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [q2VariantIdx, setQ2VariantIdx] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [questionDone, setQuestionDone] = useState(false);

  const [q2Draft, setQ2Draft] = useState(null);
  const [q2DraftLoading, setQ2DraftLoading] = useState(false);

  const hintTimerRef = useRef(null);
  const pillCycleRef = useRef(null);
  const q2DraftTimerRef = useRef(null);
  const q2DraftLoadingTimerRef = useRef(null);

  const brand = BRANDS[brandIdx];
  const brandRef = useRef(brand);
  brandRef.current = brand;

  const answeredCount = Object.values(act0.answers).filter((a) => a.trim()).length;
  const warmth = answeredCount / 3;
  const blobGeometry = answeredCount * 0.08;

  // Illustration arrives on mount
  useEffect(() => {
    const t = setTimeout(() => setIllusPhase("hero"), 300);
    return () => clearTimeout(t);
  }, []);

  // Session start: recede illustration
  const startSession = () => {
    setIllusPhase("recede");
    setPhase("session");
    startPillCycle();
  };

  const startPillCycle = () => {
    pillCycleRef.current = setInterval(() => {
      setBrandIdx((i) => (i + 1) % BRANDS.length);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      clearInterval(pillCycleRef.current);
      clearTimeout(hintTimerRef.current);
    };
  }, []);

  // Typewriter hint — show once per question after 3.5s of no input
  const resetHintTimer = () => {
    clearTimeout(hintTimerRef.current);
    setShowHint(false);
    const step = act0.step;
    const isHintableStep = [STEPS.Q1, STEPS.Q2].includes(step);
    if (isHintableStep && !input) {
      hintTimerRef.current = setTimeout(() => setShowHint(true), 3500);
    }
  };

  useEffect(() => {
    resetHintTimer();
    return () => clearTimeout(hintTimerRef.current);
  }, [act0.step, input]);

  // Q2 scaffold draft — sourced from brands-dataset (not an LLM call).
  useEffect(() => {
    setQ2Draft(null);
    setQ2DraftLoading(false);
    clearTimeout(q2DraftTimerRef.current);
    clearTimeout(q2DraftLoadingTimerRef.current);

    if (act0.step !== STEPS.Q2 || input) return;

    q2DraftTimerRef.current = setTimeout(() => {
      setQ2DraftLoading(true);
      q2DraftLoadingTimerRef.current = setTimeout(() => {
        setQ2DraftLoading(false);
        const answerKey = Q2_VARIANTS[q2VariantIdx].answerKey;
        setQ2Draft(brandRef.current[answerKey] ?? brandRef.current.q2);
      }, 1200);
    }, 4000);

    return () => {
      clearTimeout(q2DraftTimerRef.current);
      clearTimeout(q2DraftLoadingTimerRef.current);
    };
  }, [act0.step, input, q2VariantIdx]);

  const handleInput = (e) => {
    setInput(e.target.value);
    setQ2Draft(null);
    setQ2DraftLoading(false);
    onTyping();
    setShowHint(false);
    clearTimeout(hintTimerRef.current);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const v = input.trim();
      if (v.length > 2) submitAnswer(v);
    }
  };

  const submitAnswer = (text) => {
    setInput("");
    cancelFocus();
    setShowHint(false);
    act0.submitAnswer(text);
  };

  const isQ2Step = act0.step === STEPS.Q2;
  const isQ3Step = act0.step === STEPS.Q3;

  const kineticQ = isQ2Step
    ? Q2_VARIANTS[q2VariantIdx]
    : KINETIC[act0.step];

  const whisper = isQ2Step ? WHISPERS[STEPS.Q2] : (WHISPERS[act0.step] || "");

  const showKinetic = Boolean(kineticQ) && !isQ3Step;
  const showInput = showKinetic;

  // Hint question index: 0=Q1, 1=Q2
  const qIndex = act0.step === STEPS.Q2 ? 1 : 0;

  // Question key — remounts QuestionDisplay to restart char animations
  const questionKey = `${act0.step}-${q2VariantIdx}`;

  const continueReady = Boolean(act0.answers.q3 && act0.answers.q3.trim());

  return (
    <>
      {/* Illustration — always rendered, controlled by illusPhase */}
      <IllusLayer phase={illusPhase} />

      {/* Blob — warms as questions are answered */}
      <BlobMorph
        geometryT={blobGeometry}
        baseR={BLOB_BASE.baseR + warmth * 20}
        speed={BLOB_BASE.speed}
        glowTrigger={0}
      />

      {/* Grain */}
      <div className="noise-overlay fixed inset-0 pointer-events-none" style={{ zIndex: 300 }} />

      {/* Structural lines */}
      <StructuralLines />

      {/* ── PHASE 1 — illustration IS the entry point. Click anywhere to begin. ── */}
      {phase === "hero" && (
        <div
          className="fixed inset-0 cursor-pointer"
          style={{ zIndex: 10 }}
          onClick={startSession}
        />
      )}

      {/* ── PHASE 2 — SESSION ── */}
      {phase === "session" && (
        <>
          {/* Progress rail — right side */}
          <ProgressIndicator activeIndex={0} delay={0.5} />

          {/* HUD — top bar */}
          <div
            className={`fl fixed top-0 left-0 right-0 flex justify-between items-center px-9 py-6 ${focused ? "receded" : ""}`}
            style={{ zIndex: 10 }}
          >
            <VesicaIcon className="flex-shrink-0 opacity-[0.32]" style={{ width: 30, height: 20 }} />
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
              <div className="m-bar" />
              <div className="m-bar" />
              <div className="m-bar" />
              <div className="m-bar" />
            </div>
          </div>

          {/* Brand pill — top center */}
          <BrandPill
            brand={brand}
            focused={focused}
            onClick={() => setOverlayOpen(true)}
          />

          {/* ── QUESTION ROW — padded so brand pill and bottom bar never collide ── */}
          <div
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 6, paddingTop: "8rem", paddingBottom: "6rem", boxSizing: "border-box" }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: "clamp(0.6rem, 1.8vw, 1.2rem)",
                width: "100%",
                padding: "0 clamp(2rem, 6vw, 5rem)",
                maxWidth: "1100px",
              }}
            >
              {/* Lit ground glow */}
              <div
                style={{
                  position: "absolute",
                  inset: "-3rem -2rem",
                  background: "radial-gradient(ellipse at center, rgba(200,169,110,0.048) 0%, rgba(232,103,58,0.01) 45%, transparent 70%)",
                  pointerEvents: "none",
                  borderRadius: 8,
                }}
              />

              {/* Vesica mascot — left, permanent */}
              <VesicaMascot arrived={true} />

              {/* Question lines + input stack */}
              <div style={{ display: "flex", flexDirection: "column", minWidth: 0, width: "100%" }}>

                {/* MODE — brand new vs existing */}
                {act0.step === STEPS.MODE && (
                  <div key="mode" className="q-blur-reveal">
                    <p
                      style={{
                        fontFamily: "'Big Shoulders Display', sans-serif",
                        fontWeight: 700,
                        fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                        textTransform: "uppercase",
                        letterSpacing: "0.02em",
                        color: "var(--text)",
                        lineHeight: 1.0,
                        marginBottom: "2rem",
                      }}
                    >
                      Is this brand{" "}
                      <span style={{ color: "var(--accent)" }}>new</span>, or does it
                      already exist?
                    </p>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button
                        className="d-btn primary"
                        style={{ fontSize: "10px", padding: "0.6rem 1.2rem" }}
                        onClick={() => act0.submitMode("new")}
                      >
                        It's new
                      </button>
                      <button
                        className="d-btn"
                        style={{ fontSize: "10px", padding: "0.6rem 1.2rem" }}
                        onClick={() => act0.submitMode("existing")}
                      >
                        It already exists
                      </button>
                    </div>
                  </div>
                )}

                {/* Kinetic question — Q1, Q1_PUSH, Q2 */}
                {showKinetic && (
                  <div key={questionKey} className="q-blur-reveal">
                    <QuestionDisplay
                      l1={kineticQ.l1}
                      l2={kineticQ.l2}
                      whisper={whisper}
                      onDone={() => setQuestionDone(true)}
                    />

                    {/* Q2 rotation button — cycles framing in place, never advances */}
                    {isQ2Step && (
                      <button
                        className="q2-rotate"
                        onClick={() => {
                          setQ2VariantIdx((i) => (i + 1) % Q2_VARIANTS.length);
                          setQuestionDone(false);
                          setInput("");
                          setQ2Draft(null);
                        }}
                      >
                        This question doesn't feel right — try a different angle
                      </button>
                    )}
                  </div>
                )}

                {/* Q3 — setup line + name input, then mad-libs slots */}
                {isQ3Step && (
                  <div key="q3" className="q-blur-reveal">
                    <Q3MadLibs onSubmit={(text) => submitAnswer(text)} />
                  </div>
                )}

                {/* Main textarea — Q1, Q1_PUSH, Q2 */}
                {showInput && (
                  <div
                    className="act0-input-wrap"
                    style={{ maxWidth: "560px", width: "100%", position: "relative", marginTop: "1.6rem" }}
                  >
                    <textarea
                      key={questionKey}
                      rows={2}
                      autoFocus
                      value={input}
                      onChange={handleInput}
                      onKeyDown={handleKeyDown}
                      onBlur={onBlur}
                      placeholder="speak plainly..."
                      disabled={act0.loading}
                      style={TEXTAREA_STYLE}
                    />
                    <div className="act0-input-line" />
                  </div>
                )}

                {/* Press enter hint / loading */}
                {showInput && (
                  <p
                    className="font-mono uppercase"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.22em",
                      color: "var(--text-sub)",
                      marginTop: "1.2rem",
                    }}
                  >
                    {act0.loading ? "thinking..." : "press enter to continue"}
                  </p>
                )}

                {/* Typewriter hint — fires ONCE per question then stops */}
                {showInput && (
                  <TypewriterHint
                    brand={brand}
                    questionIndex={qIndex}
                    visible={showHint}
                    onCycleComplete={() => {
                      // Advance brand but do NOT restart — fires once per question only
                      setBrandIdx((i) => (i + 1) % BRANDS.length);
                      setShowHint(false);
                    }}
                  />
                )}

                {/* Q2 scaffold draft */}
                {showInput && isQ2Step && (
                  <DraftCard
                    draft={q2Draft}
                    draftLoading={q2DraftLoading}
                    onUse={() => {
                      submitAnswer(q2Draft);
                      setQ2Draft(null);
                    }}
                    onEdit={() => {
                      setInput(q2Draft);
                      setQ2Draft(null);
                    }}
                    onDismiss={() => setQ2Draft(null)}
                  />
                )}

                {/* Reflection */}
                {act0.step === STEPS.REFLECTION && (
                  <div style={{ maxWidth: "560px" }}>
                    {act0.loading && (
                      <p
                        className="font-mono uppercase"
                        style={{ fontSize: "10px", letterSpacing: "0.22em", color: "var(--text-sub)" }}
                      >
                        reflecting...
                      </p>
                    )}
                    {!act0.loading && act0.reflection && (
                      <>
                        <p
                          style={{
                            fontFamily: "DM Sans, sans-serif",
                            fontWeight: 300,
                            fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                            lineHeight: 1.65,
                            color: "var(--text)",
                            marginBottom: "1.8rem",
                            opacity: 0,
                            animation: "fadeIn 1s ease 0.2s forwards",
                          }}
                        >
                          {act0.reflection}
                        </p>
                        <div style={{ display: "flex", gap: "0.75rem" }}>
                          <button className="d-btn primary" onClick={act0.confirm}>
                            yes, that's right
                          </button>
                          <button className="d-btn" onClick={() => act0.correct({})}>
                            something's off
                          </button>
                        </div>
                      </>
                    )}
                    {act0.error && (
                      <p style={{ color: "var(--text-sub)", fontFamily: "DM Sans", fontWeight: 300 }}>
                        {act0.error}
                      </p>
                    )}
                  </div>
                )}

                {/* Done */}
                {act0.step === STEPS.DONE && (
                  <p
                    style={{
                      fontFamily: "'Big Shoulders Display', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(2rem, 4vw, 3.5rem)",
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                      color: "var(--text)",
                      lineHeight: 1.0,
                      opacity: 0,
                      animation: "fadeIn 0.8s ease 0.2s forwards",
                    }}
                  >
                    Act 0 locked.{" "}
                    <span style={{ color: "var(--accent)" }}>Good.</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className={`fl fixed bottom-0 left-0 right-0 flex justify-between items-center px-9 py-7 ${focused ? "receded" : ""}`}
            style={{ zIndex: 10 }}
          >
            <p
              className="font-mono"
              style={{ fontSize: "7px", letterSpacing: "0.14em", color: "var(--text-ghost)" }}
            >
              the clearer you are here, the sharper everything gets later
            </p>
            <button
              onClick={continueReady ? () => onComplete?.(act0.answers) : undefined}
              className={`font-mono uppercase ${
                continueReady
                  ? "border-accent-dim text-accent cursor-pointer hover:border-accent"
                  : "border-text-dim text-text-sub pointer-events-none"
              }`}
              style={{
                background: "transparent",
                border: "0.5px solid",
                padding: "0.52rem 1.1rem",
                fontSize: "9px",
                letterSpacing: "0.18em",
                transition: "all 0.3s",
              }}
            >
              now let's look outward →
            </button>
          </div>
        </>
      )}

      {/* Brand example overlay */}
      <BrandExampleOverlay
        brand={brand}
        open={overlayOpen}
        onClose={() => setOverlayOpen(false)}
        activeQ2Variant={Q2_VARIANTS[q2VariantIdx]}
      />
    </>
  );
}
