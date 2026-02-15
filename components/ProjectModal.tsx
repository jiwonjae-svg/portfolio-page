'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Download, Globe, AlertTriangle, Lightbulb, Network, BarChart3 } from 'lucide-react';
import { Project } from '@/data/projects';
import { useEffect, useState } from 'react';

const categoryColors: Record<string, string> = {
  language: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  framework: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  library: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  tool: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  api: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  infrastructure: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
};

const categoryLabels: Record<string, string> = {
  language: 'Language',
  framework: 'Framework',
  library: 'Library',
  tool: 'Tool',
  api: 'API',
  infrastructure: 'Infra',
};

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'challenge' | 'architecture'>('overview');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveTab('overview');
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  // Group tech stack by category
  const groupedTech = project.techStack.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof project.techStack>);

  const tabs = [
    { key: 'overview' as const, label: 'Overview' },
    { key: 'challenge' as const, label: 'Technical Challenge' },
    { key: 'architecture' as const, label: 'System Architecture' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-3xl max-h-[90vh] bg-zinc-900 border border-zinc-700/50 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 flex flex-col"
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header gradient bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-accent shrink-0" />

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 p-8">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all hover:rotate-90 duration-300 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title */}
              <motion.h2
                className="text-3xl font-bold text-foreground mb-2 pr-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {project.title}
              </motion.h2>

              {/* Metrics Bar */}
              {project.metrics && (
                <motion.div
                  className="flex flex-wrap gap-3 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                >
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800/80 rounded-lg border border-zinc-700/50">
                      <BarChart3 className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs text-zinc-400">{metric.label}:</span>
                      <span className="text-xs font-semibold text-foreground">{metric.value}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Tab Navigation */}
              <motion.div
                className="flex gap-1 mb-6 bg-zinc-800/50 rounded-xl p-1 border border-zinc-700/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                      activeTab === tab.key
                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </motion.div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Full Description */}
                    <p className="text-zinc-300 text-base leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {/* Grouped Tech Stack */}
                    <div className="space-y-4 mb-8">
                      <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-8 h-px bg-zinc-700" />
                        Tech Stack
                        <span className="flex-1 h-px bg-zinc-700" />
                      </h3>
                      {Object.entries(groupedTech).map(([category, techs]) => (
                        <div key={category} className="space-y-2">
                          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                            {categoryLabels[category] || category}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {techs.map((tech, i) => (
                              <span
                                key={i}
                                className={`px-3 py-1.5 text-xs border rounded-full cursor-default transition-colors hover:brightness-125 ${categoryColors[tech.category] || 'bg-zinc-800 text-zinc-300 border-zinc-700'}`}
                              >
                                {tech.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'challenge' && (
                  <motion.div
                    key="challenge"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Problem */}
                    <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <h3 className="text-base font-bold text-red-400">Problem</h3>
                      </div>
                      <p className="text-zinc-300 text-sm leading-relaxed">
                        {project.technicalChallenge.problem}
                      </p>
                    </div>

                    {/* Arrow between problem and solution */}
                    <div className="flex justify-center">
                      <div className="w-px h-8 bg-gradient-to-b from-red-500/40 to-emerald-500/40" />
                    </div>

                    {/* Solution */}
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-base font-bold text-emerald-400">Solution</h3>
                      </div>
                      <p className="text-zinc-300 text-sm leading-relaxed">
                        {project.technicalChallenge.solution}
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'architecture' && (
                  <motion.div
                    key="architecture"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Network className="w-5 h-5 text-primary" />
                      <h3 className="text-base font-bold text-foreground">System Data Flow</h3>
                    </div>
                    <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-2xl p-6 overflow-x-auto">
                      <pre className="text-sm text-zinc-300 font-mono leading-relaxed whitespace-pre">
                        {project.architecture}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Links - Always visible */}
              <motion.div
                className="flex gap-4 mt-8 pt-6 border-t border-zinc-800"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-foreground rounded-xl transition-all hover:scale-105 group"
                  >
                    <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span className="font-medium">GitHub</span>
                  </a>
                )}
                {project.liveUrl && (() => {
                  const isRelease = project.liveUrl.includes('/releases');
                  const Icon = isRelease ? Download : Globe;
                  const label = isRelease ? 'Download' : 'Live Demo';
                  return (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-xl transition-all hover:scale-105 group"
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{label}</span>
                    </a>
                  );
                })()}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
