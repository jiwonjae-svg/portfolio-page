'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Orb {
  x: number; y: number; r: number; h: number;
  tx: number; ty: number; tr: number; th: number;
  elapsed: number; dur: number;
}

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function lerpHue(a: number, b: number, t: number): number {
  let diff = b - a;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return a + diff * t;
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function newTarget() {
  return {
    tx: rand(5, 95),
    ty: rand(5, 95),
    tr: rand(20, 65),
    th: Math.random() * 360,
    dur: rand(2500, 8000),
  };
}

function makeOrb(): Orb {
  const tgt = newTarget();
  return {
    x: rand(5, 95), y: rand(5, 95), r: rand(20, 65), h: Math.random() * 360,
    tx: tgt.tx, ty: tgt.ty, tr: tgt.tr, th: tgt.th,
    elapsed: rand(0, tgt.dur), dur: tgt.dur,
  };
}

// Saturation & lightness bands that look vivid against both light and dark backgrounds
const ORB_COUNT = 7;
const SAT = 82;
const LIT = 62;

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedGradientText({ children, className = '' }: AnimatedGradientTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const orbsRef = useRef<Orb[]>([]);

  useEffect(() => {
    if (reducedMotion) return;
    const el = spanRef.current;
    if (!el) return;

    orbsRef.current = Array.from({ length: ORB_COUNT }, makeOrb);

    let lastTime = performance.now();
    let animId = 0;

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 100); // cap large gaps (tab switch)
      lastTime = now;

      const gradients: string[] = [];

      for (const orb of orbsRef.current) {
        orb.elapsed = Math.min(orb.elapsed + dt, orb.dur);
        const t = smoothstep(orb.elapsed / orb.dur);

        const cx = orb.x + (orb.tx - orb.x) * t;
        const cy = orb.y + (orb.ty - orb.y) * t;
        const cr = orb.r + (orb.tr - orb.r) * t;
        const ch = lerpHue(orb.h, orb.th, t);

        gradients.push(
          `radial-gradient(circle ${cr.toFixed(1)}% at ${cx.toFixed(1)}% ${cy.toFixed(1)}%,` +
          ` hsl(${ch.toFixed(0)},${SAT}%,${LIT}%) 0%, transparent 72%)`
        );

        if (orb.elapsed >= orb.dur) {
          orb.x = orb.tx; orb.y = orb.ty; orb.r = orb.tr; orb.h = orb.th;
          const tgt = newTarget();
          orb.tx = tgt.tx; orb.ty = tgt.ty; orb.tr = tgt.tr; orb.th = tgt.th;
          orb.dur = tgt.dur; orb.elapsed = 0;
        }
      }

      el.style.backgroundImage = gradients.join(', ');
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [reducedMotion]);

  return (
    <span
      ref={spanRef}
      className={`bg-clip-text text-transparent ${className}`}
      style={{ backgroundImage: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)' }}
    >
      {children}
    </span>
  );
}
