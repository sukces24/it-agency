"use client";

import { useEffect, useRef } from "react";

type Star = {
  nx: number; // normalized base x [0,1)
  ny: number; // normalized base y [0,1)
  r: number; // radius in css px
  depth: number; // parallax depth factor (further = smaller offset)
  tw: number; // twinkle speed
  phase: number; // twinkle phase offset
  color: string;
};

type Nebula = {
  nx: number;
  ny: number;
  r: number; // radius as fraction of the larger viewport side
  color: string; // rgba prefix like "rgba(0,140,255,"
  phase: number;
};

const STAR_COLORS = ["#ffffff", "#dff1ff", "#bfe0ff", "#9fd6ff", "#7fc4ff"];

/**
 * Full-page interactive starfield rendered on a fixed 2D canvas that sits
 * behind all page content. Stars drift slowly, twinkle, and respond to both
 * pointer movement (parallax) and scrolling, extending the hero's cosmic look
 * across the entire site. Drawing happens entirely in the browser via the
 * effect, so it is safe to render on the server (it outputs an empty canvas).
 */
export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let nebulae: Nebula[] = [];

    const pointer = { x: 0, y: 0 }; // target, range -1..1
    const smooth = { x: 0, y: 0 }; // eased pointer offset
    let scrollY = window.scrollY || 0;

    const buildStars = () => {
      const count = Math.round(
        Math.min(Math.max((W * H) / 5200, 90), 320),
      );
      stars = [];
      for (let i = 0; i < count; i++) {
        const depth = 0.4 + Math.random() * 1.4;
        stars.push({
          nx: Math.random(),
          ny: Math.random(),
          r: (Math.random() * 0.9 + 0.35) * (0.7 + depth * 0.5),
          depth,
          tw: 0.6 + Math.random() * 1.8,
          phase: Math.random() * Math.PI * 2,
          color: STAR_COLORS[(Math.random() * STAR_COLORS.length) | 0],
        });
      }
    };

    const buildNebulae = () => {
      nebulae = [
        { nx: 0.8, ny: 0.16, r: 0.55, color: "rgba(0,140,255,", phase: 0 },
        { nx: 0.14, ny: 0.6, r: 0.5, color: "rgba(40,120,235,", phase: 1.7 },
        { nx: 0.55, ny: 1.02, r: 0.62, color: "rgba(20,100,210,", phase: 3.2 },
      ];
    };

    let builtW = 0;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Only (re)scatter stars on a meaningful width change (e.g. orientation
      // change). This avoids the mobile address bar showing/hiding — which only
      // changes the height — from making the whole starfield jump around.
      if (stars.length === 0 || Math.abs(W - builtW) > 120) {
        builtW = W;
        buildStars();
        buildNebulae();
      }
    };

    const drawNebulae = (t: number) => {
      ctx.globalCompositeOperation = "lighter";
      const maxSide = Math.max(W, H);
      for (const n of nebulae) {
        const cx = n.nx * W;
        const cy = n.ny * H - scrollY * 0.04;
        const rr = n.r * maxSide * (0.9 + Math.sin(t * 0.0005 + n.phase) * 0.08);
        const a = Math.max(0, 0.06 + Math.sin(t * 0.0006 + n.phase) * 0.02);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
        g.addColorStop(0, `${n.color}${a})`);
        g.addColorStop(1, `${n.color}0)`);
        ctx.fillStyle = g;
        ctx.fillRect(cx - rr, cy - rr, rr * 2, rr * 2);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const drawStars = (t: number) => {
      ctx.globalCompositeOperation = "lighter";
      const drift = reduceMotion ? 0 : t * 0.012;
      for (const s of stars) {
        const depth = s.depth;
        let y = s.ny * H + drift * depth + scrollY * 0.06 * depth;
        y = ((y % H) + H) % H;
        const x = s.nx * W + smooth.x * 14 * depth;
        const yy = y + smooth.y * 10 * depth;
        const twinkle = reduceMotion
          ? 0.8
          : 0.55 + 0.45 * Math.sin(t * 0.001 * s.tw + s.phase);
        const alpha = Math.min(1, Math.max(0, twinkle) * (0.5 + depth * 0.28));

        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(x, yy, s.r, 0, Math.PI * 2);
        ctx.fill();

        if (s.r > 1.1) {
          ctx.globalAlpha = Math.min(0.5, alpha * 0.5);
          ctx.beginPath();
          ctx.arc(x, yy, s.r * 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const render = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      drawNebulae(t);
      drawStars(t);
    };

    let raf = 0;
    const frame = (now: number) => {
      smooth.x += (pointer.x - smooth.x) * 0.05;
      smooth.y += (pointer.y - smooth.y) * 0.05;
      render(now);
      raf = requestAnimationFrame(frame);
    };

    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scrollY = window.scrollY || window.pageYOffset || 0;
    };
    const onResize = () => {
      resize();
      if (reduceMotion) render(0);
    };

    resize();
    window.addEventListener("resize", onResize);

    if (reduceMotion) {
      render(0);
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="space-background" aria-hidden="true" />;
}
