// Full-screen overlay showing a brand's Q1/Q2/Q3 answers.
// Triggered by the brand pill.
// activeQ2Variant: the Q2_VARIANTS entry currently active (has .question and .answerKey)
export default function BrandExampleOverlay({ brand, open, onClose, activeQ2Variant }) {
  const q2Question = activeQ2Variant
    ? activeQ2Variant.question
    : "What does your industry do that's dishonest, lazy, or just plain wrong?";
  const q2Answer = activeQ2Variant
    ? brand[activeQ2Variant.answerKey] ?? brand.q2
    : brand.q2;

  return (
    <div className={`brand-ex-overlay${open ? " open" : ""}`}>
      <div className="brand-ex-inner">
        <button className="brand-ex-close" onClick={onClose}>
          close ×
        </button>
        <div className="brand-ex-name" style={{ color: brand.colour }}>
          {brand.name}
        </div>
        <div className="brand-ex-qa">
          <p className="brand-ex-q">What does your brand do? One sentence, no industry words.</p>
          <p className="brand-ex-a">"{brand.q1}"</p>
        </div>
        <div className="brand-ex-qa">
          <p className="brand-ex-q">{q2Question}</p>
          <p className="brand-ex-a">"{q2Answer}"</p>
        </div>
        <div className="brand-ex-qa">
          <p className="brand-ex-q">Think of one person who genuinely needs what you're building.</p>
          <p className="brand-ex-a">"{brand.q3}"</p>
        </div>
      </div>
    </div>
  );
}
