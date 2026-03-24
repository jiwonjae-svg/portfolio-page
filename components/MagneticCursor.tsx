'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);

  const mouse = useRef({ x: -200, y: -200 });
  const dot = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });

  // Use refs for interaction state — avoids re-renders racing with the rAF loop
  const leftDown = useRef(false);
  const rightDown = useRef(false);
  const hovering = useRef(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
  }, []);

  useEffect(() => {
    if (reducedMotion || isTouch) return;

    document.documentElement.style.cursor = 'none';
    let rafId = 0;

    // Apply ring scale directly to DOM — no state, no re-render
    const applyRingScale = () => {
      if (!ringRef.current) return;
      let s: number;
      if (leftDown.current) s = 1.8;        // left click → expand
      else if (rightDown.current) s = 0.4;  // right click → shrink
      else if (hovering.current) s = 1.6;   // hover interactive
      else s = 1;
      ringRef.current.style.scale = String(s);
    };

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };
    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1';
      if (ringRef.current) ringRef.current.style.opacity = '1';
    };
    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) leftDown.current = true;
      if (e.button === 2) rightDown.current = true;
      applyRingScale();
    };
    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 0) leftDown.current = false;
      if (e.button === 2) rightDown.current = false;
      applyRingScale();
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      hovering.current = !!target.closest('a, button, [role="button"], input, textarea, select, label');
      applyRingScale();
      if (ringRef.current) {
        ringRef.current.style.borderColor = hovering.current ? '#06b6d4' : 'rgba(99,102,241,0.5)';
        ringRef.current.style.backgroundColor = hovering.current ? 'rgba(99,102,241,0.08)' : 'transparent';
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onOver);

    const animate = () => {
      dot.current.x = lerp(dot.current.x, mouse.current.x, 0.45);
      dot.current.y = lerp(dot.current.y, mouse.current.y, 0.45);
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dot.current.x - 4}px, ${dot.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, isTouch]);

  if (reducedMotion || isTouch) return null;

  return (
    <>
      {/* Inner dot — fast, snappy */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[999] rounded-full"
        style={{
          width: 8,
          height: 8,
          backgroundColor: 'var(--color-primary, #6366f1)',
          opacity: 0,
          willChange: 'transform',
          transform: 'translate(-200px, -200px)',
          transition: 'opacity 0.3s ease',
        }}
      />
      {/* Outer ring — slow, trailing */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[998] rounded-full border"
        style={{
          width: 32,
          height: 32,
          borderColor: 'rgba(99,102,241,0.5)',
          backgroundColor: 'transparent',
          opacity: 0,
          willChange: 'transform',
          transform: 'translate(-200px, -200px)',
          scale: '1',
          transition: 'scale 0.25s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s ease, background-color 0.2s ease, opacity 0.3s ease',
        }}
      />
    </>
  );
}
