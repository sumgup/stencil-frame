import { useNavigate } from "react-router-dom";
import VesicaIcon from "../components/VesicaIcon.jsx";
import MaskedReveal from "../components/MaskedReveal.jsx";
import StepsScrollStrip from "../components/StepsScrollStrip.jsx";

// Landing page — / route. Nav + hero with the CTA that starts the
// Investigate session at /investigate. Ported from design/prototypes/landing-v3.html.
export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <div className="noise-overlay fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-9 py-4"
        style={{
          borderBottom: "1px solid var(--text-ghost)",
          background: "rgba(8,15,10,0.92)",
          backdropFilter: "blur(20px)",
        }}
      >
        <a className="flex items-center gap-[10px] no-underline" href="/">
          <VesicaIcon style={{ width: 32, height: 21, flexShrink: 0 }} />
          <span
            className="uppercase tracking-[0.04em]"
            style={{ fontFamily: "Fraunces, serif", fontWeight: 900, fontSize: "0.875rem", color: "var(--text)" }}
          >
            Stencil<em style={{ color: "var(--vesica, #e8673a)", fontStyle: "normal" }}>+</em>Frame
          </span>
        </a>
        <div className="flex items-center gap-3">
          <button className="border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-sub transition-colors hover:border-accent-dim hover:text-accent" style={{ borderColor: "var(--text-dim)" }}>
            GitHub
          </button>
          <button
            onClick={() => navigate("/investigate")}
            className="border px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent/10"
            style={{ borderColor: "var(--accent-dim)" }}
          >
            Start free →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center px-9 pt-32 pb-20">
        <div className="relative z-[2] w-full max-w-[960px] pl-[clamp(2.5rem,9vw,8rem)]">
          <p
            className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em]"
            style={{ color: "var(--accent-dim)" }}
          >
            <span className="block h-px w-7 bg-current" />
            Brand discovery — free and open source
          </p>

          <MaskedReveal
            delay={0.2}
            className="mb-8 text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[0.96] text-text"
            style={{ fontFamily: "Fraunces, serif", fontWeight: 900, letterSpacing: "-0.02em" }}
          >
            Your brand, before anyone else defines it.
          </MaskedReveal>

          <p
            className="mb-10 max-w-[520px] leading-[1.7] text-text-sub"
            style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontSize: "clamp(1.05rem, 2vw, 1.3rem)" }}
          >
            Every branding tool assumes you already know who you are.{" "}
            <strong style={{ fontStyle: "normal", color: "var(--text-b, var(--text))" }}>
              Stencil starts where they don't —
            </strong>{" "}
            with the thinking before the logo, the colours, the copy.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/investigate")}
              className="border px-8 py-3 font-mono text-sm uppercase tracking-[0.22em] text-accent transition-colors hover:bg-accent/10"
              style={{ borderColor: "var(--accent-dim)" }}
            >
              Begin the investigation →
            </button>
            <button
              onClick={() =>
                document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 border-0 bg-transparent font-mono text-[11px] uppercase tracking-[0.14em] text-text-sub transition-colors hover:text-text"
            >
              See how it works ↓
            </button>
          </div>
        </div>

        <p
          className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em]"
          style={{ color: "var(--text-ghost)" }}
        >
          No account needed — your answers stay on your device
        </p>
      </section>

      {/* Problem / Solution */}
      <section id="problem" className="grid grid-cols-1 gap-px md:grid-cols-2" style={{ background: "var(--text-ghost)", borderTop: "1px solid var(--text-ghost)" }}>
        <div className="flex flex-col gap-6 bg-bg px-9 py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-dim">The problem</p>
          <h2 className="leading-[1.15] text-text-sub" style={{ fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: "clamp(1.5rem,3.5vw,2.8rem)" }}>
            Every brand tool assumes you already know who you are.
          </h2>
          <p className="max-w-[420px] leading-[1.8] text-text-sub" style={{ fontWeight: 300 }}>
            Canva asks you to pick colours. Looka asks for your industry. Jasper asks for your brand voice.
            All of them assume the hard work is already done. It isn't. That's where most brands fail — not in
            execution, but in identity.
          </p>
        </div>
        <div className="flex flex-col gap-6 bg-bg px-9 py-16" style={{ borderLeft: "1px solid var(--text-ghost)" }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-dim">The solution</p>
          <h2 className="leading-[1.15] text-text" style={{ fontFamily: "Fraunces, serif", fontWeight: 900, fontSize: "clamp(1.5rem,3.5vw,2.8rem)" }}>
            Stencil starts at the <em style={{ color: "var(--accent)", fontStyle: "italic" }}>beginning</em> — with you.
          </h2>
          <p className="max-w-[420px] leading-[1.8] text-text-sub" style={{ fontWeight: 300 }}>
            Who you are. What you stand against. Who you're really building for. Where no one else is standing.
            Five guided steps that take you from blank page to a brand that's genuinely yours.
          </p>
        </div>
      </section>

      {/* Five steps — scroll strip */}
      <section className="px-9 py-20" style={{ borderTop: "1px solid var(--text-ghost)" }}>
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="leading-[1.1] text-text" style={{ fontFamily: "Fraunces, serif", fontWeight: 900, fontSize: "clamp(1.5rem,3.5vw,2.8rem)" }}>
            Five steps.<br />One honest process.
          </h2>
          <p className="font-mono text-[11px] italic tracking-[0.1em] text-text-dim">
            Inspired by Michael Johnson's branding methodology
          </p>
        </div>

        <StepsScrollStrip />
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-3 px-9 py-8" style={{ borderTop: "1px solid var(--text-ghost)" }}>
        <span className="font-mono text-[11px] tracking-[0.12em] text-text-dim">
          Stencil + Frame — open source, free forever
        </span>
        <span className="font-mono text-[11px] tracking-[0.12em] text-text-dim">
          Your data never leaves your device
        </span>
      </footer>
    </div>
  );
}
