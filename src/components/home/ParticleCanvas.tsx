"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

/**
 * Hero atmosphere layer. Deferred by parent via dynamic().
 * Pauses when tab hidden / prefers-reduced-motion / scrolled past hero.
 */
export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      ctx.fillStyle = "#05050c";
      ctx.fillRect(
        0,
        0,
        canvas.width || window.innerWidth,
        canvas.height || window.innerHeight,
      );
      return;
    }

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999 };
    let frameId = 0;
    let running = true;
    let inHero = true;

    const count = () => {
      const area = width * height;
      const mobile = width < 768;
      return Math.min(mobile ? 36 : 72, Math.floor(area / (mobile ? 22000 : 16000)));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = count();
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        r: Math.random() * 1.8 + 0.8,
      }));
    };

    const onMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    const draw = () => {
      if (!running || !inHero) {
        frameId = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = "rgba(5, 5, 12, 0.28)";
      ctx.fillRect(0, 0, width, height);

      const n = particles.length;
      for (let i = 0; i < n; i += 1) {
        const p = particles[i];
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110 && dist > 0.01) {
          p.vx -= (dx / dist) * 0.018;
          p.vy -= (dy / dist) * 0.018;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.vx *= 0.995;
        p.vy *= 0.995;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(167, 139, 250, 0.8)";
        ctx.fill();
      }

      // Limit link checks: every particle to next few neighbors only
      const linkLimit = Math.min(12, n);
      for (let i = 0; i < n; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < Math.min(n, i + linkLimit); j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.85 - d / 110})`;
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      frameId = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      running = document.visibilityState === "visible";
    };

    const onScroll = () => {
      inHero = window.scrollY < window.innerHeight * 0.95;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 -z-10 h-full w-full" aria-hidden />
  );
}
