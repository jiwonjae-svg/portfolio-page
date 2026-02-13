'use client';

import { motion } from 'framer-motion';
import { Github, Mail, ArrowDown, Code2, Sparkles, Cpu, Layers, Shield, Package, Download, Globe } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import ParticleBackground from '@/components/ParticleBackground';
import AnimatedGradientText from '@/components/AnimatedGradientText';
import { projects, Project } from '@/data/projects';
import { useState } from 'react';

// Tech stack organized by category
const techCategories = [
  {
    icon: '🚀',
    title: 'Languages & Core',
    items: [
      {
        name: 'Python (3.12+)',
        desc: 'Complex system logic architecture design and data processing.',
      },
      {
        name: 'TypeScript (5+) & JavaScript (ES6+)',
        desc: 'Large-scale web application development with type safety.',
      },
    ],
  },
  {
    icon: '💻',
    title: 'Frontend & Interface',
    items: [
      {
        name: 'Next.js (14, App Router) & React (18)',
        desc: 'High-performance web services with SSR/ISR.',
      },
      {
        name: 'PyQt6 & CustomTkinter',
        desc: 'Modern desktop GUI programs and event-driven system design.',
      },
      {
        name: 'Tailwind CSS & Framer Motion',
        desc: 'Declarative animations and responsive UI/UX.',
      },
      {
        name: 'Zustand',
        desc: 'Lightweight, intuitive global state management and data synchronization.',
      },
    ],
  },
  {
    icon: '🎨',
    title: '3D Graphics & AI Interactive',
    items: [
      {
        name: 'Three.js & React Three Fiber (R3F)',
        desc: 'Advanced WebGL-based 3D rendering and GLSL shader computation.',
      },
      {
        name: 'MediaPipe Hands',
        desc: 'Real-time hand tracking and AI gesture recognition interface.',
      },
      {
        name: 'Google Gemini API Integration',
        desc: 'Semantic data mapping and AI-powered feature automation via LLM.',
      },
      {
        name: 'Image Processing (OpenCV, Pillow)',
        desc: 'Image analysis and SVG vector conversion through pixel-based algorithms.',
      },
    ],
  },
  {
    icon: '🔒',
    title: 'Security & System Logic',
    items: [
      {
        name: 'Data Security (AES-128 Fernet)',
        desc: 'Robust local data encryption and security protocol design based on device-specific keys.',
      },
      {
        name: 'OS Integration (Win32 API)',
        desc: 'OS-level control: clipboard hooking, system tray, multi-instance prevention.',
      },
      {
        name: 'Firebase (Auth, Firestore)',
        desc: 'Serverless user authentication and real-time database integration.',
      },
    ],
  },
  {
    icon: '📦',
    title: 'Infrastructure & DevOps',
    items: [
      {
        name: 'CI/CD (GitHub Actions)',
        desc: 'Automated build and deployment pipelines.',
      },
      {
        name: 'Distribution (Vercel, PyInstaller)',
        desc: 'Web-optimized deployment and single executable (.exe) packaging.',
      },
      {
        name: 'Performance Optimization',
        desc: 'Dynamic imports and algorithm optimization for peak rendering performance.',
      },
    ],
  },
];

// Category icons mapped to lucide components
const categoryIcons: Record<string, React.ReactNode> = {
  'Languages & Core': <Cpu className="w-5 h-5" />,
  'Frontend & Interface': <Layers className="w-5 h-5" />,
  '3D Graphics & AI Interactive': <Sparkles className="w-5 h-5" />,
  'Security & System Logic': <Shield className="w-5 h-5" />,
  'Infrastructure & DevOps': <Package className="w-5 h-5" />,
};

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticleBackground />

      {/* Project Detail Modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />

      {/* ==================== Hero Section ==================== */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <AnimatedGradientText>
              Crafting Digital
              <br />
              Experiences Through Code
            </AnimatedGradientText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-zinc-400 mb-12 leading-relaxed"
          >
            Where algorithms meet artistry — merging AI, 3D graphics,<br className="hidden md:block" />
            and systems engineering into tools that feel alive.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 justify-center mb-16"
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-primary hover:bg-primary/80 text-white rounded-full font-medium transition-all hover:scale-105 flex items-center gap-2"
            >
              View Projects
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-white rounded-full font-medium transition-all hover:scale-105"
            >
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-6 justify-center"
          >
            <a
              href="https://github.com/jiwonjae-svg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-primary transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="mailto:onehouse0460@outlook.com"
              className="text-zinc-400 hover:text-primary transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-6 h-6 text-zinc-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* ==================== Projects Section ==================== */}
      <section id="projects" className="py-24 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Code2 className="w-10 h-10 text-primary" />
              Projects
            </h2>
            <p className="text-zinc-400 text-lg">
              Each project solves a real problem — from creative AI to system-level security
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onOpenModal={openModal} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== Tech Stack Section ==================== */}
      <section id="tech" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              🛠️ Integrated Tech Stack
            </h2>
            <p className="text-zinc-400 text-lg">
              A full-spectrum toolkit — from GPU shaders to encrypted storage
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techCategories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-primary/40 transition-all duration-500 overflow-hidden h-full">
                  {/* Hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Animated top border */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <motion.span
                        className="text-2xl"
                        whileHover={{ scale: 1.3, rotate: 15 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {category.icon}
                      </motion.span>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                    </div>

                    {/* Tech Items */}
                    <div className="space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: catIndex * 0.1 + itemIndex * 0.05 + 0.2 }}
                          viewport={{ once: true }}
                          whileHover={{ x: 4 }}
                          className="group/item"
                        >
                          <p className="text-sm font-semibold text-zinc-200 group-hover/item:text-primary transition-colors">
                            {item.name}
                          </p>
                          <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Shine sweep effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== Contact Section ==================== */}
      <section id="contact" className="py-24 px-4 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let&apos;s Work Together
            </h2>
            <p className="text-zinc-400 text-lg mb-12">
              Got an interesting challenge or want to build something together? Let&apos;s talk.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a
                href="mailto:onehouse0460@outlook.com"
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white rounded-full font-medium transition-all hover:scale-105"
              >
                <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Send Email
              </a>
              <a
                href="https://github.com/jiwonjae-svg"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-8 py-4 border border-zinc-700 hover:border-primary text-foreground hover:text-primary rounded-full font-medium transition-all hover:scale-105"
              >
                <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                GitHub
              </a>
            </div>

            <div className="pt-12 border-t border-zinc-800">
              <p className="text-zinc-500">
                © 2026 jiwonjae-svg. Built with Next.js & Framer Motion.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
