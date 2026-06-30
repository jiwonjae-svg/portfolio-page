'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Download, Globe, BarChart3, FlaskConical } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/data/projects';
import { useState, useEffect, useRef, MouseEvent, KeyboardEvent } from 'react';

const categoryColors: Record<string, string> = {
  language: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
  framework: 'bg-primary/10 text-primary border-primary/25',
  library: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  tool: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  api: 'bg-secondary/10 text-secondary border-secondary/25',
  infrastructure: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
  cardSummary?: string;
}

export default function ProjectCard({ project, index, onOpenModal, cardSummary }: ProjectCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [currentThumbIndex, setCurrentThumbIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const hasThumbnails = project.thumbnails && project.thumbnails.length > 0;

  // Cycle through thumbnails every 5 seconds while hovered
  useEffect(() => {
    if (isHovered && project.thumbnails && project.thumbnails.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentThumbIndex((prev) => (prev + 1) % project.thumbnails!.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, project.thumbnails]);

  // 3D tilt effect on mouse move
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = (y - centerY) / 12;
    const rotateYValue = (centerX - x) / 12;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
    setCurrentThumbIndex(0);
  };

  const handleCardKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpenModal(project);
    }
  };

  const borderAccents = [
    'hover:border-primary/50',
    'hover:border-secondary/40',
    'hover:border-sky-400/50',
    'hover:border-amber-300/40',
    'hover:border-emerald-300/40',
    'hover:border-cyan-300/40',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title} project details`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      className={`group relative console-panel rounded-lg ${borderAccents[index % borderAccents.length]} transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col`}
      onClick={() => onOpenModal(project)}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.12),transparent_34%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Thumbnail Preview — embedded at top of card */}
      {hasThumbnails && (
        <div
          className={`relative w-full overflow-hidden border-b border-[#163042]/80 bg-[#03070d] transition-[height] duration-500 ease-in-out ${
            isHovered ? 'h-48' : 'h-36'
          }`}
        >
          {/* Stack all images; only the active one is fully opaque */}
          {project.thumbnails!.map((thumb, i) => (
            <Image
              key={thumb}
              src={thumb}
              alt={`${project.title} preview ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isHovered ? 'object-contain' : 'object-cover'
              } ${
                i === currentThumbIndex ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
            />
          ))}
          {/* Gradient fade to card body */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-card to-transparent z-[1]" />
          {/* Dot indicators */}
          {project.thumbnails!.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {project.thumbnails!.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show ${project.title} preview ${i + 1}`}
                  aria-pressed={i === currentThumbIndex}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentThumbIndex(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === currentThumbIndex
                      ? 'bg-primary w-4'
                      : 'bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="relative z-10 p-5 flex flex-col flex-1">
        {/* Project Number */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500 group-hover:text-primary/70 transition-colors">
            exp-{String(index + 1).padStart(2, '0')} / #{String(project.id).padStart(2, '0')}
          </span>
          {project.status && (
            <span className="rounded-md border border-secondary/25 bg-secondary/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-secondary">
              {project.status}
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        {/* Project Summary (truncated) */}
        <p className="text-sm text-slate-400 mb-4 leading-6 line-clamp-2">
          {cardSummary ?? project.summary}
        </p>

        {/* "Read More" hint */}
        <span className="font-mono text-xs text-primary/70 group-hover:text-primary transition-colors mb-4 inline-block">
          open_case_file();
        </span>

        {/* Metrics */}
        {project.metrics && (
          <div className="flex flex-wrap gap-2 mb-3 mt-3">
            {project.metrics.slice(0, 3).map((metric, i) => (
              <div key={i} className="flex items-center gap-1 px-2 py-1 bg-[#07111f]/80 rounded-md border border-[#163042]/80">
                <BarChart3 className="w-3 h-3 text-primary" />
                <span className="text-[10px] text-slate-500">{metric.label}:</span>
                <span className="text-[10px] font-semibold text-slate-200">{metric.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.slice(0, 5).map((tech, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + i * 0.05 }}
              className={`px-2.5 py-1 text-[11px] border rounded-md transition-colors hover:brightness-125 ${categoryColors[tech.category] || 'bg-zinc-800 text-zinc-300 border-zinc-700'}`}
            >
              {tech.name}
            </motion.span>
          ))}
          {project.techStack.length > 5 && (
            <span className="px-2.5 py-1 text-[11px] bg-[#07111f]/80 text-slate-500 border border-[#163042]/80 rounded-md">
              +{project.techStack.length - 5} more
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3 mt-auto pt-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} GitHub repository`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 bg-[#07111f] hover:bg-[#0e1b2c] text-foreground rounded-md border border-[#163042]/80 transition-colors group/link"
            >
              <Github className="w-4 h-4 group-hover/link:rotate-12 transition-transform" />
              <span className="text-sm font-medium">GitHub</span>
            </a>
          )}
          {project.status === 'testing' ? (
            <div
              className="relative flex items-center gap-2 px-4 py-2 bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-md cursor-default group/testing"
              title="Currently in testing phase"
            >
              <FlaskConical className="w-4 h-4" />
              <span className="text-sm font-medium">Testing</span>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#07111f] text-xs text-slate-300 rounded-md border border-border opacity-0 group-hover/testing:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
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
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-[#03111c] rounded-md transition-colors group/link"
              >
                <Icon className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                <span className="text-sm font-medium">{label}</span>
              </a>
            );
          })()}
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
}
