'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '@/data/projects';
import { useState, MouseEvent } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

export default function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

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

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
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

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-5 mt-3">
          {project.techStack.map((tech, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + i * 0.05 }}
              className="px-3 py-1 text-xs bg-primary/10 text-primary border border-primary/20 rounded-full hover:bg-primary/20 transition-colors"
            >
              {tech}
            </motion.span>
          ))}
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
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors group/link"
            >
              <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              <span className="text-sm font-medium">Live Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
}
