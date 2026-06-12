/**
 * StructuralLines — hairlines across the top and bottom of the viewport
 * that expand from the left edge on mount, framing the act.
 */
export default function StructuralLines() {
  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 h-px bg-text-ghost z-20 origin-left scale-x-0 [animation-fill-mode:forwards]"
        style={{ animation: "expandLine 1.4s cubic-bezier(0.16,1,0.3,1) forwards", animationDelay: "0.1s" }}
      />
      <div
        className="fixed left-0 right-0 bottom-0 h-px bg-text-ghost z-20 origin-left scale-x-0 [animation-fill-mode:forwards]"
        style={{ animation: "expandLine 1.4s cubic-bezier(0.16,1,0.3,1) forwards", animationDelay: "0.2s" }}
      />
    </>
  );
}
