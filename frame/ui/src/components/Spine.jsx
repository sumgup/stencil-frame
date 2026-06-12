/**
 * Spine — the tiny "Stencil + Frame" wordmark anchored top-left.
 * Fades in once on mount.
 */
export default function Spine({ label = "Stencil + Frame" }) {
  return (
    <div
      className="fixed left-[1.6rem] top-[2.2rem] z-20 font-mono text-[7px] uppercase tracking-[0.32em] text-accent-dim opacity-0 [animation-fill-mode:forwards]"
      style={{ animation: "fadeIn 0.8s ease forwards", animationDelay: "0.3s" }}
    >
      {label}
    </div>
  );
}
