'use client';

import { motion } from 'framer-motion';
import type { Project, ProjectCategory } from '@/data/projects';

const categoryColors: Record<ProjectCategory, { dot: string; badge: string; text: string }> = {
  web: { dot: 'bg-primary', badge: 'bg-primary/10 border-primary/30', text: 'text-primary' },
  desktop: { dot: 'bg-amber-300', badge: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-300' },
  mobile: { dot: 'bg-sky-300', badge: 'bg-sky-500/10 border-sky-500/30', text: 'text-sky-300' },
  game: { dot: 'bg-secondary', badge: 'bg-secondary/10 border-secondary/30', text: 'text-secondary' },
};

const categoryLabels: Record<ProjectCategory, string> = {
  web: 'Web',
  desktop: 'Desktop',
  mobile: 'Mobile',
  game: 'Game',
};

interface ProjectTimelineProps {
  projects: Project[];
}

export default function ProjectTimeline({ projects }: ProjectTimelineProps) {
  const sorted = [...projects].sort((a, b) => a.id - b.id);

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />

      <div className="space-y-12">
        {sorted.map((project, i) => {
          const colors = categoryColors[project.category];
          const isLeft = i % 2 === 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true, margin: '-50px' }}
              className="relative"
            >
              {/* Dot on the line */}
              <div
                className={`absolute left-4 md:left-1/2 w-3.5 h-3.5 rounded-full ${colors.dot} border-2 border-background -translate-x-1/2 top-6 z-10`}
              />

              {/* Card */}
              <div
                className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                  isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}
              >
                <div className="console-panel rounded-lg p-5 transition-colors hover:border-primary/40">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${colors.badge} ${colors.text}`}>
                      {categoryLabels[project.category]}
                    </span>
                    <span className="text-xs text-slate-500 ml-auto">{project.period}</span>
                  </div>
                  <h4 className="text-base font-bold text-foreground mb-1">{project.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {project.summary.slice(0, 120)}...
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
