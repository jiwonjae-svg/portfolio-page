'use client';

import { useEffect, useRef } from 'react';

// Parse HSL string to numeric components
interface HSL {
  h: number;
  s: number;
  l: number;
}

function randomHSL(): HSL {
  return {
    h: Math.random() * 360,
    s: 60 + Math.random() * 30,  // 60-90% saturation
    l: 55 + Math.random() * 20,  // 55-75% lightness
  };
}

function hslToString(c: HSL): string {
  return `hsl(${c.h.toFixed(1)}, ${c.s.toFixed(1)}%, ${c.l.toFixed(1)}%)`;
}

// Interpolate hue via shortest arc
function lerpHue(a: number, b: number, t: number): number {
  let diff = b - a;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  let result = a + diff * t;
  if (result < 0) result += 360;
  if (result >= 360) result -= 360;
  return result;
}

function lerpHSL(a: HSL, b: HSL, t: number): HSL {
  return {
    h: lerpHue(a.h, b.h, t),
    s: a.s + (b.s - a.s) * t,
    l: a.l + (b.l - a.l) * t,
  };
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// Smoothstep easing
function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

interface GradientTarget {
  color1: HSL;
  color2: HSL;
  color3: HSL;
  angle: number;
  stop1: number;
  stop2: number;
}

function randomTarget(): GradientTarget {
  return {
    color1: randomHSL(),
    color2: randomHSL(),
    color3: randomHSL(),
    angle: Math.random() * 360,
    stop1: Math.random() * 30,
    stop2: 70 + Math.random() * 30,
  };
}

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedGradientText({ children, className = '' }: AnimatedGradientTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    // Mutable state tracked outside React to avoid re-renders
    let current = randomTarget();
    let next = randomTarget();
    let startTime = performance.now();
    const cycleDuration = 5000; // ms per transition
    let animId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawT = Math.min(elapsed / cycleDuration, 1);
      const t = smoothstep(rawT);

      // Interpolate all properties
      const c1 = lerpHSL(current.color1, next.color1, t);
      const c2 = lerpHSL(current.color2, next.color2, t);
      const c3 = lerpHSL(current.color3, next.color3, t);

      // Interpolate angle via shortest arc (same as hue)
      const angle = lerpHue(current.angle, next.angle, t);
      const s1 = lerp(current.stop1, next.stop1, t);
      const s2 = lerp(current.stop2, next.stop2, t);
      const sMid = (s1 + s2) / 2;

      el.style.backgroundImage =
        `linear-gradient(${angle.toFixed(1)}deg, ${hslToString(c1)} ${s1.toFixed(1)}%, ${hslToString(c2)} ${sMid.toFixed(1)}%, ${hslToString(c3)} ${s2.toFixed(1)}%)`;

      if (rawT >= 1) {
        // Seamlessly chain: old target becomes current, pick a fresh next
        current = { ...next };
        next = randomTarget();
        startTime = now;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <span
      ref={spanRef}
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
      }}
    >
      {children}
    </span>
  );
}
