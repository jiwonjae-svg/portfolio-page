'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$&?><{}[]';

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;    // ms between frames
  step?: number;     // chars revealed per frame (fractional ok)
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
}

export default function ScrambleText({
  text,
  className = '',
  speed = 28,
  step = 0.38,
  tag: Tag = 'span',
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px' });
  const reducedMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(reducedMotion ? text : '');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iterRef = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isInView || startedRef.current) return;
    if (reducedMotion) {
      setDisplayed(text);
      return;
    }
    startedRef.current = true;
    iterRef.current = 0;

    intervalRef.current = setInterval(() => {
      const revealed = iterRef.current;
      setDisplayed(
        text
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' ';
            if (idx < revealed) return text[idx];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );
      iterRef.current += step;
      if (iterRef.current >= text.length) {
        setDisplayed(text);
        clearInterval(intervalRef.current!);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInView, text, speed, step, reducedMotion]);

  return (
    <Tag ref={ref as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement>} className={`font-mono ${className}`}>
      {displayed || '\u00A0'}
    </Tag>
  );
}
