import { useEffect, useRef } from "react";

// ─── Icosahedron geometry (computed once) ────────────────────────────────────
const PHI = (1 + Math.sqrt(5)) / 2;
const RAW_VERTS = [
  [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
  [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, 1], [-PHI, 0, -1],
];
const ICO_VERTS = RAW_VERTS.map((v) => {
  const len = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
  return v.map((x) => x / len);
});
const ICO_EDGES = [
  [0, 1], [0, 4], [0, 5], [0, 8], [0, 10],
  [1, 6], [1, 7], [1, 8], [1, 10],
  [2, 3], [2, 4], [2, 5], [2, 9], [2, 11],
  [3, 6], [3, 7], [3, 9], [3, 11],
  [4, 5], [4, 8], [4, 9], [5, 10], [5, 11],
  [6, 7], [6, 8], [6, 9], [7, 10], [7, 11],
  [8, 9], [10, 11],
];

const N = 12;

// ── Glow animation timing (frames) ────────────────────────────────────────────
const GLOW_RISE = 60;
const GLOW_PEAK = 40;
const GLOW_SETTLE = 80;

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * BlobMorph — the central visual metaphor of the Investigate session.
 * Renders an organic blob that morphs toward an icosahedron as geometryT -> 1.
 * On glowTrigger increment, plays the edge-glow "birth" animation (rise -> peak -> settle).
 *
 * Props:
 *  - geometryT: target 0 (pure blob) -> 1 (full icosahedron)
 *  - baseR: target base radius in px
 *  - speed: blob noise / rotation speed
 *  - glowTrigger: increment this number to fire the birth glow animation
 */
export default function BlobMorph({ geometryT = 0, baseR = 72, speed = 0.008, glowTrigger = 0 }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);

  // Lazy-init mutable animation state, including randomized blob control points
  if (!stateRef.current) {
    stateRef.current = {
      t: 0,
      blobOpacity: 0,
      geometryT: 0,
      targetGeometryT: geometryT,
      baseR,
      targetBaseR: baseR,
      speed,
      icoRotation: 0,
      glowActive: false,
      glowPhase: 0,
      glowTimer: 0,
      blobPts: Array.from({ length: N }, (_, i) => ({
        angle: (i / N) * Math.PI * 2,
        f1: 0.3 + Math.random() * 0.35,
        f2: 0.15 + Math.random() * 0.2,
        f3: 0.07 + Math.random() * 0.1,
        a1: 7 + Math.random() * 10,
        a2: 4 + Math.random() * 7,
        a3: 2 + Math.random() * 5,
        p1: Math.random() * Math.PI * 2,
        p2: Math.random() * Math.PI * 2,
        p3: Math.random() * Math.PI * 2,
      })),
    };
  }

  // Push prop changes into the animation state without restarting the loop
  useEffect(() => {
    const s = stateRef.current;
    s.targetGeometryT = geometryT;
    s.targetBaseR = baseR;
    s.speed = speed;
  }, [geometryT, baseR, speed]);

  // Fire the birth glow animation
  const glowTriggerRef = useRef(glowTrigger);
  useEffect(() => {
    if (glowTrigger !== glowTriggerRef.current) {
      glowTriggerRef.current = glowTrigger;
      const s = stateRef.current;
      s.glowActive = true;
      s.glowPhase = 0;
      s.glowTimer = 0;
    }
  }, [glowTrigger]);

  // Animation loop — set up once
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const s = stateRef.current;
    let raf;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.width;
    const H = () => canvas.height;
    const cx = () => W() / 2;
    const cy = () => H() / 2;

    function getBlobR(pt, base) {
      return (
        base +
        pt.a1 * Math.sin(s.t * pt.f1 + pt.p1) +
        pt.a2 * Math.sin(s.t * pt.f2 + pt.p2) +
        pt.a3 * Math.sin(s.t * pt.f3 + pt.p3)
      );
    }

    function getBlobPoint(i, base) {
      const pt = s.blobPts[i];
      const r = getBlobR(pt, base);
      return { x: cx() + r * Math.cos(pt.angle), y: cy() + r * Math.sin(pt.angle) };
    }

    function rotY(v, a) {
      return [v[0] * Math.cos(a) + v[2] * Math.sin(a), v[1], -v[0] * Math.sin(a) + v[2] * Math.cos(a)];
    }
    function rotX(v, a) {
      return [v[0], v[1] * Math.cos(a) - v[2] * Math.sin(a), v[1] * Math.sin(a) + v[2] * Math.cos(a)];
    }
    function project3D(v, R) {
      const z = v[2] + 3;
      const f = 2.8 / z;
      return { x: cx() + v[0] * R * f, y: cy() + v[1] * R * f, z: v[2] };
    }

    function getMorphedPoint(i, geoT, base) {
      const blob = getBlobPoint(i, base);
      const icoV = ICO_VERTS[i % ICO_VERTS.length];
      let rv = rotY(icoV, s.icoRotation);
      rv = rotX(rv, 0.3 + Math.sin(s.icoRotation * 0.3) * 0.1);
      const ico = project3D(rv, base);
      return { x: blob.x + (ico.x - blob.x) * geoT, y: blob.y + (ico.y - blob.y) * geoT, z: ico.z };
    }

    function drawMorphedShape(geoT, base) {
      const pts2d = Array.from({ length: N }, (_, i) => getMorphedPoint(i, geoT, base));
      ctx.beginPath();
      const len = pts2d.length;
      for (let i = 0; i < len; i++) {
        const p0 = pts2d[(i - 1 + len) % len];
        const p1 = pts2d[i];
        const p2 = pts2d[(i + 1) % len];
        const p3 = pts2d[(i + 2) % len];
        if (i === 0) ctx.moveTo(p1.x, p1.y);
        const smooth = 1 - geoT * 0.7;
        ctx.bezierCurveTo(
          p1.x + ((p2.x - p0.x) / 6) * smooth, p1.y + ((p2.y - p0.y) / 6) * smooth,
          p2.x - ((p3.x - p1.x) / 6) * smooth, p2.y - ((p3.y - p1.y) / 6) * smooth,
          p2.x, p2.y
        );
      }
      ctx.closePath();
    }

    function getGlowIntensity() {
      if (!s.glowActive) return 0;
      s.glowTimer++;
      if (s.glowPhase === 0) {
        const progress = s.glowTimer / GLOW_RISE;
        if (s.glowTimer >= GLOW_RISE) { s.glowPhase = 1; s.glowTimer = 0; }
        return easeInOut(progress);
      } else if (s.glowPhase === 1) {
        if (s.glowTimer >= GLOW_PEAK) { s.glowPhase = 2; s.glowTimer = 0; }
        return 1 + Math.sin(s.glowTimer * 0.15) * 0.15;
      } else {
        const progress = s.glowTimer / GLOW_SETTLE;
        if (s.glowTimer >= GLOW_SETTLE) {
          s.glowActive = false;
          s.glowPhase = 0;
          s.glowTimer = 0;
        }
        return 1 - easeInOut(progress);
      }
    }

    function drawIcoEdges(R, baseAlpha, glowIntensity) {
      const projected = ICO_VERTS.map((v) => {
        let rv = rotY(v, s.icoRotation);
        rv = rotX(rv, 0.3 + Math.sin(s.icoRotation * 0.3) * 0.1);
        return project3D(rv, R);
      });

      ICO_EDGES.forEach(([i, j]) => {
        const a = projected[i];
        const b = projected[j];
        const avgZ = (a.z + b.z) / 2;
        const depthA = (avgZ + 1) / 2;
        const alpha = depthA * baseAlpha * 0.6;

        if (glowIntensity > 0) {
          const glowAlpha = glowIntensity * 0.6 * depthA;
          const glowWidth = 3 + glowIntensity * 8;

          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(143,186,122,${glowAlpha * 0.3})`;
          ctx.lineWidth = glowWidth;
          ctx.stroke();

          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(180,220,160,${glowAlpha * 0.5})`;
          ctx.lineWidth = glowWidth * 0.4;
          ctx.stroke();

          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(220,255,200,${Math.min(1, alpha + glowIntensity * 0.5)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(143,186,122,${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      });
    }

    function drawIcoVerts(R, vertAlpha, glowIntensity) {
      const projected = ICO_VERTS.map((v) => {
        let rv = rotY(v, s.icoRotation);
        rv = rotX(rv, 0.3 + Math.sin(s.icoRotation * 0.3) * 0.1);
        return project3D(rv, R);
      });
      projected.forEach((p) => {
        const depthA = (p.z + 1) / 2;
        const size = glowIntensity > 0 ? 1.2 + glowIntensity * 3 : 1.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${glowIntensity > 0 ? "200,255,180" : "143,186,122"},${depthA * vertAlpha * 0.8})`;
        ctx.fill();
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W(), H());
      if (s.blobOpacity < 1) s.blobOpacity += 0.003;

      s.geometryT += (s.targetGeometryT - s.geometryT) * 0.015;
      s.baseR += (s.targetBaseR - s.baseR) * 0.02;
      s.icoRotation += s.speed * 0.5;
      s.t += s.speed;

      const gT = s.geometryT;
      const op = s.blobOpacity;
      const glowI = getGlowIntensity();

      // Glow layers (soft ambient halo, follows shape)
      for (let layer = 4; layer >= 1; layer--) {
        const scale = 1 + layer * 0.15;
        const alpha = (0.022 / layer) * op;
        ctx.save();
        ctx.translate(cx(), cy());
        ctx.scale(scale, scale);
        ctx.translate(-cx(), -cy());
        drawMorphedShape(gT, s.baseR);
        ctx.fillStyle = `rgba(143,186,122,${alpha})`;
        ctx.fill();
        ctx.restore();
      }

      // Core shape
      drawMorphedShape(gT, s.baseR);
      const grad = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), s.baseR * 1.4);
      grad.addColorStop(0, `rgba(143,186,122,${(0.07 + gT * 0.04) * op})`);
      grad.addColorStop(0.5, `rgba(143,186,122,${(0.03 + gT * 0.02) * op})`);
      grad.addColorStop(1, "rgba(143,186,122,0)");
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = `rgba(143,186,122,${(0.15 + gT * 0.25) * op})`;
      ctx.lineWidth = 0.8 + gT * 0.4;
      ctx.stroke();

      // Icosahedron edges + vertices fade in as geometry resolves
      if (gT > 0.3) {
        const edgeAlpha = ((gT - 0.3) / 0.7) * op;
        drawIcoEdges(s.baseR, edgeAlpha, glowI);
        if (gT > 0.6) drawIcoVerts(s.baseR, ((gT - 0.6) / 0.4) * op, glowI);
      }

      // Gold highlight (matches accent token)
      drawMorphedShape(gT, s.baseR);
      const hl = ctx.createRadialGradient(
        cx() - s.baseR * 0.2, cy() - s.baseR * 0.25, 0,
        cx() - s.baseR * 0.2, cy() - s.baseR * 0.25, s.baseR * 0.75
      );
      hl.addColorStop(0, `rgba(200,169,110,${(0.045 + gT * 0.02 + glowI * 0.03) * op})`);
      hl.addColorStop(1, "rgba(200,169,110,0)");
      ctx.fillStyle = hl;
      ctx.fill();

      // Ambient pulse during the birth glow
      if (glowI > 0) {
        const ambientGrad = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), 300 + glowI * 150);
        ambientGrad.addColorStop(0, `rgba(143,186,122,${glowI * 0.06})`);
        ambientGrad.addColorStop(1, "rgba(143,186,122,0)");
        ctx.beginPath();
        ctx.arc(cx(), cy(), 300 + glowI * 150, 0, Math.PI * 2);
        ctx.fillStyle = ambientGrad;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[1]" />;
}
