'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

interface UseCountUpOptions {
  target: number;
  duration?: number; // ms
  enabled?: boolean;
}

export function useCountUp({ target, duration = 1200, enabled = true }: UseCountUpOptions) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    startTimeRef.current = null;

    const tick = (now: number) => {
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const t = Math.min(elapsed / duration, 1);
      const easedValue = easeOutQuart(t);
      setValue(Math.round(easedValue * target));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, enabled]);

  return value;
}

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({ target, suffix = '', duration = 1200, className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const value = useCountUp({ target, duration, enabled: isInView });

  return (
    <span ref={ref} className={className}>
      {value}{suffix}
    </span>
  );
}
