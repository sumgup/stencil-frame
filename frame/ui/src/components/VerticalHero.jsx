/**
 * VerticalHero — the act's title, set in Fraunces 900, running bottom-to-top
 * along the left edge. Plays once on mount: reveals via a rising clip-path,
 * peaks at full gold, then recedes to a faint watermark that stays for the
 * rest of the act.
 *
 * Re-mount (change `key` on the parent) to replay for a new act.
 */
export default function VerticalHero({ text }) {
  return (
    <div
      className="vertical-hero fixed left-0 top-0 bottom-0 z-[6] pointer-events-none
        flex items-center overflow-hidden select-none
        font-fraunces font-black uppercase whitespace-nowrap
        leading-none tracking-[0.01em]
        px-2"
      style={{ fontSize: "clamp(3rem, 13vh, 10rem)" }}
    >
      {text}
    </div>
  );
}
