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
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
  }, []);

  useEffect(() => {
    if (reducedMotion || isTouch) return;
    // Hide default cursor
    document.documentElement.style.cursor = 'none';

    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);

    // Hover detection for interactive elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest('a, button, [role="button"], input, textarea, select, label');
      setHovering(isInteractive);
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
  }, [reducedMotion, isTouch, visible]);

  if (reducedMotion || isTouch) return null;

  return (
    <>
      {/* Inner dot — fast, snappy */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[999] rounded-full transition-opacity duration-300"
        style={{
          width: 8,
          height: 8,
          backgroundColor: clicking ? 'var(--color-accent)' : 'var(--color-primary, #6366f1)',
          opacity: visible ? 1 : 0,
          willChange: 'transform',
          transform: 'translate(-200px, -200px)',
          scale: clicking ? '0.5' : '1',
          transition: 'scale 0.15s ease, background-color 0.2s ease, opacity 0.3s ease',
        }}
      />
      {/* Outer ring — slow, trailing */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[998] rounded-full border transition-opacity duration-300"
        style={{
          width: 32,
          height: 32,
          borderColor: hovering ? '#06b6d4' : 'rgba(99,102,241,0.5)',
          backgroundColor: hovering ? 'rgba(99,102,241,0.08)' : 'transparent',
          opacity: visible ? 1 : 0,
          willChange: 'transform',
          transform: 'translate(-200px, -200px)',
          scale: clicking ? '0.7' : hovering ? '1.6' : '1',
          transition: 'scale 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, opacity 0.3s ease',
        }}
      />
    </>
  );
}
