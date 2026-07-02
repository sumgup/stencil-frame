import { useEffect, useRef } from "react";

// Zigzag + smoke particles drawn in the hero phase.
// Hides immediately (opacity 0) when visible becomes false.
export default function MotionCanvas({ visible }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({ zigP: 0, smokeY: 0, smokeOp: 0 });

  useEffect(() => {
    if (!visible) return;

    const mc = canvasRef.current;
    if (!mc) return;
    const mx = mc.getContext("2d");

    const resize = () => {
      mc.width = window.innerWidth;
      mc.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const s = stateRef.current;
    s.zigP = 0;
    s.smokeY = 0;
    s.smokeOp = 0;

    const animate = () => {
      mx.clearRect(0, 0, mc.width, mc.height);

      if (s.zigP < 1) s.zigP += 0.005;
      if (s.smokeOp < 0.25) s.smokeOp += 0.002;
      s.smokeY = (s.smokeY - 0.25 + mc.height * 0.3) % (mc.height * 0.3);

      // Zigzag
      const zx = mc.width * 0.56;
      const zy = mc.height * 0.07;
      const zw = mc.width * 0.36;
      const zh = mc.height * 0.11;
      const segs = 6;
      const zp = Array.from({ length: segs + 1 }, (_, i) => ({
        x: zx + (i / segs) * zw,
        y: zy + (i % 2 === 0 ? 0 : zh),
      }));
      const segLen = Math.sqrt((zw / segs) ** 2 + zh ** 2);
      const totalLen = segs * segLen;
      let drawn = 0;
      const target = s.zigP * totalLen;

      mx.beginPath();
      mx.strokeStyle = `rgba(200,169,110,${0.6 * s.zigP})`;
      mx.lineWidth = 2;
      mx.lineCap = "round";
      mx.lineJoin = "round";
      let started = false;
      for (let i = 0; i < zp.length - 1; i++) {
        const sl = Math.sqrt((zp[i + 1].x - zp[i].x) ** 2 + (zp[i + 1].y - zp[i].y) ** 2);
        if (drawn >= target) break;
        if (!started) {
          mx.moveTo(zp[i].x, zp[i].y);
          started = true;
        }
        if (drawn + sl <= target) {
          mx.lineTo(zp[i + 1].x, zp[i + 1].y);
          drawn += sl;
        } else {
          const t = (target - drawn) / sl;
          mx.lineTo(zp[i].x + (zp[i + 1].x - zp[i].x) * t, zp[i].y + (zp[i + 1].y - zp[i].y) * t);
          drawn = target;
        }
      }
      mx.stroke();

      // Smoke particles
      const sx = mc.width * 0.62;
      const syb = mc.height * 0.41;
      for (let p = 0; p < 3; p++) {
        const py = syb - s.smokeY - p * 28;
        const a = s.smokeOp * (1 - p * 0.3) * (0.5 + 0.5 * Math.sin(Date.now() * 0.001 + p));
        mx.beginPath();
        mx.arc(sx + Math.sin(py * 0.03) * 7, py, 3 + p * 2, 0, Math.PI * 2);
        mx.fillStyle = `rgba(200,169,110,${a * 0.25})`;
        mx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [visible]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 2,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    />
  );
}
