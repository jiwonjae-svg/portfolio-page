'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionTypewriterProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function SectionTypewriter({
  text,
  speed = 40,
  className = '',
}: SectionTypewriterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [displayedText, setDisplayedText] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  const animate = useCallback(() => {
    indexRef.current = 0;
    setDisplayedText('');
    setDone(false);

    const interval = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current >= text.length) {
        setDisplayedText(text);
        setDone(true);
        clearInterval(interval);
      } else {
        setDisplayedText(text.slice(0, indexRef.current));
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    if (!isInView) return;
    const cleanup = animate();
    return cleanup;
  }, [isInView, animate]);

  return (
    <span ref={containerRef} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayedText}
        {!done && isInView && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block ml-0.5"
          >
            |
          </motion.span>
        )}
      </span>
    </span>
  );
}
