'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Download, Globe, AlertTriangle, Lightbulb, Network, BarChart3, FlaskConical, ChevronLeft, ChevronRight, CheckCircle2, Clock } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/data/projects';
import { type RefObject, useEffect, useRef, useState } from 'react';

const categoryColors: Record<string, string> = {
  language: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
  framework: 'bg-primary/10 text-primary border-primary/25',
  library: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  tool: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  api: 'bg-secondary/10 text-secondary border-secondary/25',
  infrastructure: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
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
  returnFocusRef?: RefObject<HTMLElement>;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
  returnFocusRef,
}: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'challenge' | 'architecture'>('overview');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveTab('overview');
      setGalleryIndex(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !project) return;

    const returnTarget = returnFocusRef?.current;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute('hidden'));

      if (focusable.length === 0) {
        e.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (e.shiftKey && activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', handleKeyDown);
      window.requestAnimationFrame(() => returnTarget?.focus());
    };
  }, [isOpen, onClose, project, returnFocusRef]);

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

  const evidenceSections = project.evidence
    ? [
        {
          label: 'Implemented',
          icon: <CheckCircle2 className="h-4 w-4" />,
          items: project.evidence.implemented,
          className: 'border-emerald-500/25 bg-emerald-500/5 text-emerald-300',
        },
        {
          label: 'Verified',
          icon: <BarChart3 className="h-4 w-4" />,
          items: project.evidence.verified,
          className: 'border-primary/25 bg-primary/5 text-primary',
        },
        {
          label: 'Future',
          icon: <Clock className="h-4 w-4" />,
          items: project.evidence.future,
          className: 'border-amber-500/25 bg-amber-500/5 text-amber-300',
        },
      ]
    : [];

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
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            aria-describedby="project-modal-description"
            tabIndex={-1}
            className="relative w-full max-w-3xl max-h-[90vh] console-panel-strong rounded-lg overflow-hidden flex flex-col"
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
                ref={closeButtonRef}
                type="button"
                aria-label={`Close ${project.title} details`}
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-md bg-[#07111f] hover:bg-[#0e1b2c] text-slate-400 hover:text-primary border border-border transition-all hover:rotate-90 duration-300 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title */}
              <motion.h2
                id="project-modal-title"
                className="text-3xl font-bold text-foreground mb-2 pr-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {project.title}
              </motion.h2>
              <p id="project-modal-description" className="sr-only">
                {project.summary}
              </p>

              {/* Metrics Bar */}
              {project.metrics && (
                <motion.div
                  className="flex flex-wrap gap-3 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                >
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#07111f]/80 rounded-md border border-[#163042]/80">
                      <BarChart3 className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs text-slate-400">{metric.label}:</span>
                      <span className="text-xs font-semibold text-foreground">{metric.value}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {project.deliveryContext && (
                <section className="mb-6" aria-labelledby="project-delivery-context">
                  <h3
                    id="project-delivery-context"
                    className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary"
                  >
                    Delivery context
                  </h3>
                  <dl className="grid gap-px overflow-hidden rounded-md border border-[#163042]/80 bg-[#163042]/80 sm:grid-cols-2">
                    {[
                      ['Project type', project.deliveryContext.type],
                      ['Period', project.period],
                      ['My role', project.deliveryContext.role],
                      ['Users / testing', project.deliveryContext.environment],
                      ['Deployment / operations', project.deliveryContext.deployment],
                      ['Measured outcome', project.deliveryContext.outcome],
                    ].map(([label, value]) => (
                      <div key={label} className="bg-[#07111f] p-3.5">
                        <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary">
                          {label}
                        </dt>
                        <dd className="mt-1.5 text-xs leading-5 text-slate-200">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {/* Tab Navigation */}
              <motion.div
                role="tablist"
                aria-label={`${project.title} detail sections`}
                className="flex gap-1 mb-6 bg-[#07111f]/80 rounded-md p-1 border border-[#163042]/80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    id={`project-tab-${tab.key}`}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.key}
                    aria-controls={`project-panel-${tab.key}`}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-300 ${
                      activeTab === tab.key
                        ? 'bg-primary text-[#03111c] shadow-lg shadow-primary/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-primary/5'
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
                    id="project-panel-overview"
                    role="tabpanel"
                    aria-labelledby="project-tab-overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Screenshot Gallery */}
                    {project.thumbnails && project.thumbnails.length > 0 && (
                      <div className="mb-8">
                        {/* Main image */}
                        <div className="relative rounded-md overflow-hidden bg-[#03070d] border border-[#163042]/80 mb-3 group">
                          <Image
                            src={project.thumbnails[galleryIndex]}
                            alt={`${project.title} screenshot ${galleryIndex + 1}`}
                            width={1200}
                            height={720}
                            sizes="(min-width: 768px) 768px, calc(100vw - 4rem)"
                            className="w-full max-h-72 object-contain"
                          />
                          {project.thumbnails.length > 1 && (
                            <>
                              <button
                                type="button"
                                aria-label={`Show previous ${project.title} screenshot`}
                                onClick={() => setGalleryIndex((i) => (i - 1 + project.thumbnails!.length) % project.thumbnails!.length)}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-black/40 hover:bg-black/70 text-white transition-colors"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                aria-label={`Show next ${project.title} screenshot`}
                                onClick={() => setGalleryIndex((i) => (i + 1) % project.thumbnails!.length)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md bg-black/40 hover:bg-black/70 text-white transition-colors"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {/* Image counter */}
                          {project.thumbnails.length > 1 && (
                            <span className="absolute bottom-2 right-2 text-[10px] bg-black/55 text-white px-2 py-0.5 rounded-md">
                              {galleryIndex + 1} / {project.thumbnails.length}
                            </span>
                          )}
                        </div>
                        {/* Thumbnail strip */}
                        {project.thumbnails.length > 1 && (
                          <div className="flex gap-2 overflow-x-auto pb-1">
                            {project.thumbnails.map((thumb, i) => (
                              <button
                                key={i}
                                type="button"
                                aria-label={`Show ${project.title} screenshot ${i + 1}`}
                                aria-pressed={i === galleryIndex}
                                onClick={() => setGalleryIndex(i)}
                                className={`shrink-0 w-16 h-11 rounded-md overflow-hidden border-2 transition-all ${
                                  i === galleryIndex
                                    ? 'border-primary opacity-100'
                                    : 'border-transparent opacity-60 hover:opacity-90'
                                }`}
                              >
                                <Image
                                  src={thumb}
                                  alt={`${project.title} thumbnail ${i + 1}`}
                                  width={96}
                                  height={66}
                                  sizes="64px"
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Full Description */}
                    <p className="text-slate-300 text-base leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {evidenceSections.length > 0 && (
                      <div className="mb-8 grid gap-4 md:grid-cols-3">
                        {evidenceSections.map((section) => (
                          <div
                            key={section.label}
                            className={`rounded-md border p-4 ${section.className}`}
                          >
                            <div className="mb-3 flex items-center gap-2">
                              {section.icon}
                              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">
                                {section.label}
                              </h3>
                            </div>
                            <ul className="space-y-2 text-xs leading-5 text-slate-300">
                              {section.items.map((item) => (
                                <li key={item} className="flex gap-2">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-current opacity-80" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Grouped Tech Stack */}
                    <div className="space-y-4 mb-8">
                      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-8 h-px bg-border" />
                        Tech Stack
                        <span className="flex-1 h-px bg-border" />
                      </h3>
                      {Object.entries(groupedTech).map(([category, techs]) => (
                        <div key={category} className="space-y-2">
                          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                            {categoryLabels[category] || category}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {techs.map((tech, i) => (
                              <span
                                key={i}
                                className={`px-3 py-1.5 text-xs border rounded-md cursor-default transition-colors hover:brightness-125 ${categoryColors[tech.category] || 'bg-zinc-800 text-zinc-300 border-zinc-700'}`}
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
                    id="project-panel-challenge"
                    role="tabpanel"
                    aria-labelledby="project-tab-challenge"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Problem */}
                    <div className="bg-red-500/5 border border-red-500/20 rounded-md p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <h3 className="text-base font-bold text-red-400">Problem</h3>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {project.technicalChallenge.problem}
                      </p>
                    </div>

                    {/* Arrow between problem and solution */}
                    <div className="flex justify-center">
                      <div className="w-px h-8 bg-gradient-to-b from-red-500/40 to-emerald-500/40" />
                    </div>

                    {/* Solution */}
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-md p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-base font-bold text-emerald-400">Solution</h3>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {project.technicalChallenge.solution}
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'architecture' && (
                  <motion.div
                    key="architecture"
                    id="project-panel-architecture"
                    role="tabpanel"
                    aria-labelledby="project-tab-architecture"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Network className="w-5 h-5 text-primary" />
                      <h3 className="text-base font-bold text-foreground">System Data Flow</h3>
                    </div>
                    <div className="bg-[#07111f]/80 border border-[#163042]/80 rounded-md p-6 overflow-x-auto">
                      <pre className="text-sm text-slate-300 font-mono leading-relaxed whitespace-pre">
                        {project.architecture}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Links - Always visible */}
              <motion.div
                className="flex gap-4 mt-8 pt-6 border-t border-border"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} GitHub repository`}
                    className="flex items-center gap-2 px-6 py-3 bg-[#07111f] hover:bg-[#0e1b2c] text-foreground rounded-md border border-[#163042]/80 transition-all hover:scale-[1.02] group"
                  >
                    <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span className="font-medium">GitHub</span>
                  </a>
                )}
                {project.status === 'testing' ? (
                  <div
                    className="relative flex items-center gap-2 px-6 py-3 bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-md cursor-default group"
                    title="Currently in testing phase"
                  >
                    <FlaskConical className="w-5 h-5" />
                    <span className="font-medium">Testing</span>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#07111f] text-xs text-slate-300 rounded-md border border-border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      This project is currently in testing
                    </div>
                  </div>
                ) : project.liveUrl && (() => {
                  const isRelease = project.liveUrl!.includes('/releases');
                  const Icon = isRelease ? Download : Globe;
                  const label = isRelease ? 'Download' : 'Live Demo';
                  return (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} for ${project.title}`}
                      className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 text-[#03111c] rounded-md transition-all hover:scale-[1.02] group"
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
