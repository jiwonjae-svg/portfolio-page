'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Download, Globe, BarChart3 } from 'lucide-react';
import { Project } from '@/data/projects';
import { useState, useEffect, useRef, MouseEvent } from 'react';

const categoryColors: Record<string, string> = {
  language: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  framework: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  library: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  tool: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  api: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  infrastructure: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

export default function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [showThumbnail, setShowThumbnail] = useState(false);
  const [thumbPos, setThumbPos] = useState({ x: 0, y: 0 });
  const [currentThumbIndex, setCurrentThumbIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cycle through thumbnails every 5 seconds
  useEffect(() => {
    if (showThumbnail && project.thumbnails && project.thumbnails.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentThumbIndex((prev) => (prev + 1) % project.thumbnails!.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [showThumbnail, project.thumbnails]);

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

    // Update thumbnail position (offset from cursor)
    if (project.thumbnails && project.thumbnails.length > 0) {
      setThumbPos({ x: e.clientX + 16, y: e.clientY + 16 });
      setShowThumbnail(true);
    }
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setShowThumbnail(false);
    setCurrentThumbIndex(0);
  };

  // Color accents per project
  const accentColors = [
    'from-rose-500/20 to-orange-500/20',
    'from-violet-500/20 to-indigo-500/20',
    'from-cyan-500/20 to-blue-500/20',
    'from-emerald-500/20 to-teal-500/20',
    'from-amber-500/20 to-yellow-500/20',
    'from-pink-500/20 to-purple-500/20',
  ];

  const borderAccents = [
    'hover:border-rose-500/50',
    'hover:border-violet-500/50',
    'hover:border-cyan-500/50',
    'hover:border-emerald-500/50',
    'hover:border-amber-500/50',
    'hover:border-pink-500/50',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      className={`group relative bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-6 border border-zinc-700/50 ${borderAccents[index % borderAccents.length]} transition-all duration-300 overflow-hidden cursor-pointer`}
      onClick={() => onOpenModal(project)}
    >
      {/* Background Gradient Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accentColors[index % accentColors.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg, transparent, rgba(99,102,241,0.15), transparent, rgba(139,92,246,0.15), transparent)',
          animation: 'spin 6s linear infinite',
        }}
      />

      <div className="relative z-10">
        {/* Project Number */}
        <span className="text-xs font-mono text-zinc-600 group-hover:text-primary/60 transition-colors">
          #{String(project.id).padStart(2, '0')}
        </span>

        {/* Project Title */}
        <h3 className="text-2xl font-bold text-foreground mb-3 mt-1 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        {/* Project Summary (truncated) */}
        <p className="text-zinc-400 mb-4 leading-relaxed line-clamp-2">
          {project.summary}
        </p>

        {/* "Read More" hint */}
        <span className="text-sm text-primary/70 group-hover:text-primary transition-colors mb-4 inline-block">
          Click to read more →
        </span>

        {/* Metrics */}
        {project.metrics && (
          <div className="flex flex-wrap gap-2 mb-3 mt-3">
            {project.metrics.slice(0, 3).map((metric, i) => (
              <div key={i} className="flex items-center gap-1 px-2 py-1 bg-zinc-800/80 rounded-md border border-zinc-700/50">
                <BarChart3 className="w-3 h-3 text-primary" />
                <span className="text-[10px] text-zinc-500">{metric.label}:</span>
                <span className="text-[10px] font-semibold text-zinc-300">{metric.value}</span>
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
              className={`px-2.5 py-1 text-[11px] border rounded-full transition-colors hover:brightness-125 ${categoryColors[tech.category] || 'bg-zinc-800 text-zinc-300 border-zinc-700'}`}
            >
              {tech.name}
            </motion.span>
          ))}
          {project.techStack.length > 5 && (
            <span className="px-2.5 py-1 text-[11px] bg-zinc-800/60 text-zinc-500 border border-zinc-700/50 rounded-full">
              +{project.techStack.length - 5} more
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-foreground rounded-lg transition-colors group/link"
            >
              <Github className="w-4 h-4 group-hover/link:rotate-12 transition-transform" />
              <span className="text-sm font-medium">GitHub</span>
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
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors group/link"
              >
                <Icon className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                <span className="text-sm font-medium">{label}</span>
              </a>
            );
          })()}
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      {/* Thumbnail Preview on Hover */}
      {showThumbnail && project.thumbnails && project.thumbnails.length > 0 && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: thumbPos.x,
            top: thumbPos.y,
          }}
        >
          <div className="relative w-72 h-48 rounded-xl overflow-hidden border border-zinc-600/50 shadow-2xl shadow-black/60 bg-zinc-900">
            <img
              src={project.thumbnails[currentThumbIndex]}
              alt={`${project.title} preview`}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            {project.thumbnails.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {project.thumbnails.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === currentThumbIndex ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
