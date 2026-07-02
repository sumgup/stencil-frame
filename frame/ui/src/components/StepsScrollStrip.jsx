import { useNavigate } from "react-router-dom";

// Five steps — horizontal scroll strip. Hover magnifies a card, others
// compress. Ported from design/prototypes/landing-v3.html .scroll-strip.
const STEPS_DATA = [
  {
    num: "01",
    name: "Investigate",
    desc: "Find your gap. Map the competition, discover the space no one else occupies. The thinking that makes everything else possible.",
    badge: "Stencil — available now",
    badgeClass: "s",
    active: true,
    illus: true,
  },
  {
    num: "02",
    name: "Strategy",
    desc: "Turn the gap into a position. Define where you stand, who you speak to, and what you uniquely own.",
    badge: "Coming — Stencil",
    badgeClass: "l",
    locked: true,
  },
  {
    num: "02.5",
    name: "Narrative",
    desc: "Your verbal identity — words, tone, story — all derived from strategy, not invented in a vacuum.",
    badge: "Coming — Stencil",
    badgeClass: "l",
    locked: true,
  },
  {
    num: "03",
    name: "Design",
    desc: "Visual identity that comes from strategy, not trends. Logo, colour, typography — all earned.",
    badge: "Coming — Frame",
    badgeClass: "f",
    locked: true,
  },
  {
    num: "04–05",
    name: "Build + Launch",
    desc: "Taking your brand into the world with everything Frame generates for you.",
    badge: "Coming — Frame",
    badgeClass: "f",
    locked: true,
  },
];

export default function StepsScrollStrip() {
  const navigate = useNavigate();

  return (
    <>
      <div className="scroll-strip">
        {STEPS_DATA.map((s) => (
          <div
            key={s.num}
            className={`step-card${s.active ? " active" : ""}${s.locked ? " locked" : ""}`}
            onClick={s.locked ? undefined : () => navigate("/investigate")}
          >
            <div
              className="step-illus"
              style={
                s.illus
                  ? {
                      backgroundImage: "url('/assets/illustrations/act0-origin.webp')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "brightness(0.5)",
                    }
                  : { background: "#0e1a0f" }
              }
            />
            <div className="step-content">
              <span className="step-num">{s.num}</span>
              <span className="step-name">{s.name}</span>
              <p className="step-desc">{s.desc}</p>
              <span className={`step-badge ${s.badgeClass}`}>{s.badge}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="strip-hint">hover to explore each step</p>
    </>
  );
}
