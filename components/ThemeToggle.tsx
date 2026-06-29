'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = theme === 'dark';

  return (
    <button
      aria-label="Toggle dark/light mode"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed top-5 right-5 z-50 flex h-9 w-9 items-center justify-center rounded-md border border-[#163042] bg-[#0b1220]/80 text-slate-400 shadow-[0_0_24px_rgba(34,211,238,0.08)] backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4 text-amber-500" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
