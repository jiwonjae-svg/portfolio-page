'use client';

import { motion } from 'framer-motion';
import type { ProjectCategory } from '@/data/projects';

const filters: { label: string; value: ProjectCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Desktop', value: 'desktop' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Game', value: 'game' },
];

interface ProjectFilterProps {
  active: ProjectCategory | 'all';
  onChange: (category: ProjectCategory | 'all') => void;
}

export default function ProjectFilter({ active, onChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            active === f.value
              ? 'text-white'
              : 'text-zinc-600 dark:text-zinc-400 bg-zinc-200/60 dark:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-300/60 dark:hover:bg-zinc-700/60 border border-zinc-300/60 dark:border-transparent'
          }`}
        >
          {active === f.value && (
            <motion.span
              layoutId="filter-pill"
              className="absolute inset-0 bg-primary rounded-full"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{f.label}</span>
        </button>
      ))}
    </div>
  );
}
