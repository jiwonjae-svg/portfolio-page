'use client';

import { useEffect, useRef, useState } from 'react';

// Generate a random HSL color string
function randomHSL(): string {
  const h = Math.floor(Math.random() * 360);
  const s = 60 + Math.floor(Math.random() * 30); // 60-90% saturation
  const l = 55 + Math.floor(Math.random() * 20); // 55-75% lightness
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// Generate a random angle for gradient direction
function randomAngle(): number {
  return Math.floor(Math.random() * 360);
}

// Generate random gradient stop positions
function randomStops(): [number, number] {
  const a = Math.floor(Math.random() * 30);
  const b = 70 + Math.floor(Math.random() * 30);
  return [a, b];
}

interface GradientState {
  color1: string;
  color2: string;
  color3: string;
  angle: number;
  stop1: number;
  stop2: number;
}

function newGradientState(): GradientState {
  const [stop1, stop2] = randomStops();
  return {
    color1: randomHSL(),
    color2: randomHSL(),
    color3: randomHSL(),
    angle: randomAngle(),
    stop1,
    stop2,
  };
}

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedGradientText({ children, className = '' }: AnimatedGradientTextProps) {
  const [currentState, setCurrentState] = useState<GradientState>(newGradientState);
  const [nextState, setNextState] = useState<GradientState>(newGradientState);
  const [progress, setProgress] = useState(0);
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Transition duration in ms
  const transitionDuration = 4000;

  useEffect(() => {
    lastTimeRef.current = performance.now();

    const animate = (time: number) => {
      const elapsed = time - lastTimeRef.current;
      const newProgress = Math.min(elapsed / transitionDuration, 1);
      setProgress(newProgress);

      if (newProgress >= 1) {
        // Transition complete, start new one
        setCurrentState(nextState);
        setNextState(newGradientState());
        setProgress(0);
        lastTimeRef.current = time;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [nextState]);

  // Interpolate between current and next gradient states
  const interpolate = (a: number, b: number, t: number) => a + (b - a) * t;
  const eased = progress * progress * (3 - 2 * progress); // smoothstep

  const angle = interpolate(currentState.angle, nextState.angle, eased);
  const stop1 = interpolate(currentState.stop1, nextState.stop1, eased);
  const stop2 = interpolate(currentState.stop2, nextState.stop2, eased);

  // For color interpolation, use CSS transition on the background
  const gradient = `linear-gradient(${angle}deg, ${currentState.color1} ${stop1}%, ${currentState.color2} ${(stop1 + stop2) / 2}%, ${nextState.color3} ${stop2}%)`;

  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: gradient,
        transition: 'background-image 0.3s ease',
      }}
    >
      {children}
    </span>
  );
}
