'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Github, Mail, ArrowDown, Code2, Sparkles, Layers, Package, Download, Globe, TrendingUp, BookOpen, Target, Smartphone, Clock, ShieldCheck } from 'lucide-react';
import dynamic from 'next/dynamic';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import ParticleBackground from '@/components/ParticleBackground';
import AnimatedGradientText from '@/components/AnimatedGradientText';
import TableOfContents from '@/components/TableOfContents';
import ProjectTimeline from '@/components/ProjectTimeline';
import ContactForm from '@/components/ContactForm';
import ThemeToggle from '@/components/ThemeToggle';
import CountUp from '@/components/CountUp';
import { projects, Project } from '@/data/projects';
import { useState } from 'react';

const SectionTypewriter = dynamic(() => import('@/components/SectionTypewriter'), {
  ssr: false,
  loading: () => <span className="invisible">&#8203;</span>,
});

const ScrambleText = dynamic(() => import('@/components/ScrambleText'), {
  ssr: false,
  loading: () => <span className="invisible">&#8203;</span>,
});

// Compact, evidence-based skill groups for the hiring-focused homepage.
const techCategories = [
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Frontend',
    technologies: ['React 18', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
    usedIn: ['DocuMind', 'ParticleVerse', 'SVG Converter', 'DailyGlow'],
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Mobile',
    technologies: ['React Native', 'Expo SDK 54', 'Expo Router', 'ML Kit OCR', 'TTS', 'EAS Build'],
    usedIn: ['DailyGlow'],
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Backend / Cloud',
    technologies: ['Auth.js', 'PostgreSQL / Prisma', 'pgvector', 'Firebase', 'Docker', 'Vercel'],
    usedIn: ['OpsFlow Command Center', 'DocuMind', 'DailyGlow', 'Word Cube', 'SVG Converter'],
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Quality / Reliability',
    technologies: ['Release gates', 'SLO budgets', 'Audit trails', 'Owner-scoped tests', 'Rollback plans', 'API contracts'],
    usedIn: ['OpsFlow Command Center', 'DocuMind', 'Paste Guardian'],
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'AI / Data',
    technologies: ['OpenAI embeddings', 'RAG with citations', 'Google Gemini API', 'Weighted selection', 'K-Means clustering', 'i18n data'],
    usedIn: ['DocuMind', 'DailyGlow', 'Color Palette Generator'],
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Graphics / Performance',
    technologies: ['Three.js', 'React Three Fiber', 'GLSL shaders', 'MediaPipe Hands', 'Canvas API', 'Trie search'],
    usedIn: ['ParticleVerse', 'SVG Converter', 'Word Cube'],
  },
  {
    icon: <Package className="w-6 h-6" />,
    title: 'Desktop / System',
    technologies: ['Python', 'PyQt6', 'CustomTkinter', 'Win32 API', 'Fernet AES-128', 'PyInstaller / Inno Setup'],
    usedIn: ['Croquis', 'Paste Guardian', 'Color Palette Generator'],
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Languages / Communication',
    technologies: [
      'Korean: Native',
      'Japanese: Conversational, working holiday experience in Japan',
      'English: Technical documentation and development resources',
      'Product i18n: KO / EN / JA / ZH / ES',
    ],
    usedIn: ['DailyGlow', 'Croquis', 'Color Palette Generator'],
  },
];

const featuredProjectIds = [9, 8, 7, 3];
const moreProjectIds = [4, 5, 2, 1, 6];

const featuredProjectCardCopy: Record<number, string> = {
  9: 'Release safety console for AI-enabled workflow systems with SLO checks, release gates, rollback readiness, audit trails, and owner-scoped policy tests.',
  8: 'Full-stack RAG MVP for Japanese and Korean teams using Next.js, Auth.js, PostgreSQL, pgvector, OpenAI embeddings, citations, and scoped tool APIs.',
  7: 'Mobile product in testing built with React Native, Firebase, i18n, offline/online quote data, and Japanese language support.',
  3: 'Interactive WebGL experience using Three.js, custom GLSL shaders, and real-time hand tracking with performance-focused GPU rendering.',
  4: 'Privacy-first browser utility that converts images client-side with Canvas API, 2-pass sampling, and SVG output optimization.',
  5: 'Local-only clipboard security utility using Win32 APIs, encrypted local storage, singleton control, and race-condition prevention.',
};

const moreProjectCardCopy: Record<number, string> = {
  5: 'Local clipboard security utility with Win32 APIs, encrypted storage, singleton control, and adaptive polling.',
  2: 'PyQt6 drawing-practice timer with encrypted local history, heatmap tracking, and Windows installer packaging.',
  1: 'Python desktop color tool using Gemini API, K-Means extraction, Delta E color comparison, and encrypted presets.',
  6: 'Three.js word puzzle with Firebase auth, real-time leaderboard, Trie search, and mobile touch support.',
};

const portfolioStats = [
  { value: 9, label: 'Portfolio Projects', icon: <Code2 className="w-6 h-6" /> },
  { value: 3, label: 'Shipped Desktop Apps', icon: <Package className="w-6 h-6" /> },
  { value: 5, label: 'Live Web Services', icon: <Globe className="w-6 h-6" /> },
  { value: 1, label: 'Mobile App in Testing', icon: <Smartphone className="w-6 h-6" /> },
];

const targetRoles = [
  {
    title: 'Full-Stack Web',
    evidence: 'Next.js/Vite frontends with authenticated APIs, Prisma/PostgreSQL, Firebase, and deployed live services.',
    projects: 'DocuMind, DailyGlow, Word Cube, SVG Converter',
    icon: <Layers className="w-6 h-6" />,
  },
  {
    title: 'Workflow / QA Reliability',
    evidence: 'Release gates, SLO budgets, audit trails, owner-scoped tests, rollback readiness, and API/data validation.',
    projects: 'OpsFlow Command Center, DocuMind',
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    title: 'AI-Enabled Tools',
    evidence: 'OpenAI embeddings, grounded answers with citations, citation coverage checks, Gemini parsing fallbacks, and curated data pipelines.',
    projects: 'DocuMind, OpsFlow Command Center, Color Palette Generator, DailyGlow',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    title: 'Frontend Performance',
    evidence: 'GPU shader rendering, Canvas image processing, adaptive mobile rendering, and real-time interaction optimization.',
    projects: 'ParticleVerse, SVG Converter, Word Cube',
    icon: <TrendingUp className="w-6 h-6" />,
  },
];

const caseStudies = [
  {
    title: 'Release safety as a product surface',
    project: 'OpsFlow Command Center',
    accent: {
      border: 'border-cyan-500/30',
      dot: 'bg-cyan-500',
      icon: 'text-cyan-500',
    },
    problem: 'Senior-leaning roles need evidence of operational judgment, not only feature delivery or attractive UI work.',
    action: 'Built an interactive release console that models SLO budgets, policy gates, rollback readiness, and audit events across three deterministic scenarios.',
    result: 'Added a clear platform/QA reliability signal while keeping the portfolio honest by labeling the project as a portfolio implementation.',
    lesson: 'A small project can still show senior engineering thinking when the failure modes, decision gates, and audit boundaries are explicit.',
  },
  {
    title: 'Security architecture redesign',
    project: 'Color Palette Generator',
    accent: {
      border: 'border-primary/30',
      dot: 'bg-primary',
      icon: 'text-primary',
    },
    problem: 'Local palette and settings data needed stronger protection than an embedded encryption key could provide.',
    action: 'Moved the key into an external secret.key file, kept it out of source control, and added a data re-encryption path.',
    result: 'Improved the local security model while preserving encrypted user settings and palette storage.',
    lesson: 'Security-sensitive storage should be designed as part of the application architecture, not treated as a packaging detail.',
  },
  {
    title: 'CPU to GPU performance optimization',
    project: 'ParticleVerse',
    accent: {
      border: 'border-secondary/30',
      dot: 'bg-secondary',
      icon: 'text-secondary',
    },
    problem: 'Updating tens of thousands of particle positions on the CPU created a visible frame-rate bottleneck.',
    action: 'Moved particle transforms, color interpolation, and effect logic into custom GLSL shaders running on the GPU.',
    result: 'Enabled smooth real-time interaction for 50,000+ particles with hand-tracking input and visual effects.',
    lesson: 'For graphics-heavy interaction, the implementation model matters as much as the algorithm itself.',
  },
  {
    title: 'Data migration compatibility',
    project: 'Croquis',
    accent: {
      border: 'border-primary/30',
      dot: 'bg-primary',
      icon: 'text-primary',
    },
    problem: 'Installer upgrades and encryption-key changes created compatibility risk for existing practice-history data.',
    action: 'Documented an export and re-import workflow for users and planned migration handling for future version changes.',
    result: 'Made the upgrade path clearer while identifying migration as a first-class requirement for encrypted local data.',
    lesson: 'Desktop apps that store user data need compatibility planning across install, upgrade, and uninstall flows.',
  },
  {
    title: 'Unpredictable AI response handling',
    project: 'Color Palette Generator',
    accent: {
      border: 'border-emerald-500/30',
      dot: 'bg-emerald-500',
      icon: 'text-emerald-500',
    },
    problem: 'Gemini responses could arrive as JSON, markdown, plain text, or embedded HEX values.',
    action: 'Built a staged parser with JSON parsing, regex HEX extraction, and safe default color fallback behavior.',
    result: 'Reduced dependency on a single response format and made the AI feature more resilient during normal use.',
    lesson: 'AI integrations need defensive parsing and graceful fallback paths because model output is probabilistic.',
  },
  {
    title: 'Main thread freeze optimization',
    project: 'SVG Converter',
    accent: {
      border: 'border-amber-500/30',
      dot: 'bg-amber-500',
      icon: 'text-amber-500',
    },
    problem: 'Large image uploads could block the browser while Canvas processed pixels with a single-pass approach.',
    action: 'Redesigned conversion around 2-pass grid sampling, luminance filtering, and adjacent-region merging.',
    result: 'Improved responsiveness for practical browser-based conversion and reduced generated SVG output size.',
    lesson: 'Client-side tools must be designed around real input sizes, not only development-sized test images.',
  },
  {
    title: 'Race condition prevention',
    project: 'Paste Guardian',
    accent: {
      border: 'border-rose-500/30',
      dot: 'bg-rose-500',
      icon: 'text-rose-500',
    },
    problem: 'Clipboard monitoring required reliable coordination around local encrypted storage and OS-level clipboard access.',
    action: 'Added singleton enforcement, atomic Win32 clipboard access, retry handling, and adaptive polling intervals.',
    result: 'Reduced duplicate-instance conflicts and improved resource usage while keeping clipboard history local and encrypted.',
    lesson: 'System utilities need explicit coordination around shared OS resources and local persistence.',
  },
  {
    title: 'Curated data pipeline over pure AI generation',
    project: 'DailyGlow',
    accent: {
      border: 'border-cyan-500/30',
      dot: 'bg-cyan-500',
      icon: 'text-cyan-500',
    },
    problem: 'Pure AI quote generation was not consistent enough for predictable multilingual product behavior.',
    action: 'Shifted to curated copyright-safe quote data, multilingual translation, category weights, and recency-aware selection.',
    result: 'Created a more stable offline/online quote experience for a React Native app with internationalization support.',
    lesson: 'AI can support product workflows, but curated data and deterministic selection often provide better user-facing reliability.',
  },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredProjects = featuredProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));
  const moreProjects = moreProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));

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
      <ThemeToggle />
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

        <div className="relative z-10 max-w-5xl mx-auto text-center">
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
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            <AnimatedGradientText>
              Full-Stack / Mobile Developer building AI-enabled tools, interactive web apps, and mobile products.
            </AnimatedGradientText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            Korea-based developer targeting Japan IT roles with project evidence across React Native, Next.js, Firebase, Python desktop tools, AI APIs, and frontend performance work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-4 justify-center mb-16"
          >
            <a
              href="#featured-projects"
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

      {/* ==================== Table of Contents ==================== */}
      <TableOfContents />

      {/* ==================== Target Roles Section ==================== */}
      <section id="target-roles" className="py-24 px-4 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Target className="w-10 h-10 text-primary" />
              <ScrambleText text="Target Roles" tag="span" speed={40} />
            </h2>
            <p className="text-zinc-400 text-lg">
              <SectionTypewriter text="Role fit backed by project evidence, not broad claims" speed={20} />
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {portfolioStats.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-primary/40 transition-all group"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  {metric.icon}
                </div>
                <CountUp
                  target={metric.value}
                  className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors"
                />
                <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {targetRoles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-primary/40 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {role.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{role.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  {role.evidence}
                </p>
                <p className="text-xs font-medium text-primary">
                  Evidence: {role.projects}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== Japan Readiness Section ==================== */}
      <section id="japan-readiness" className="py-24 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Globe className="w-10 h-10 text-primary" />
              <ScrambleText text="Japan Readiness" tag="span" speed={40} />
            </h2>
            <p className="text-zinc-400 text-lg">
              <SectionTypewriter text="Engineering focus with practical Japan communication context" speed={20} />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">English</p>
                <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Korea-based developer open to Japan opportunities. Japanese conversational communication through working holiday experience.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Japanese</p>
                <p lang="ja" className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  韓国を拠点とし、日本での機会に関心があります。ワーキングホリデー経験を通じて、日常会話レベルの日本語コミュニケーションが可能です。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== Featured Projects Section ==================== */}
      <section id="featured-projects" className="py-24 px-4 bg-zinc-50 dark:bg-zinc-950">
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
              <ScrambleText text="Featured Projects" tag="span" speed={40} />
            </h2>
            <p className="text-zinc-400 text-lg">
              <SectionTypewriter text="Four projects selected for full-stack AI, mobile product, WebGL performance, and browser tooling evidence" speed={20} />
            </p>
          </motion.div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <AnimatePresence mode="popLayout">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    onOpenModal={openModal}
                    cardSummary={featuredProjectCardCopy[project.id]}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ==================== More Projects Section ==================== */}
      <section id="more-projects" className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Package className="w-10 h-10 text-primary" />
              <ScrambleText text="More Projects" tag="span" speed={40} />
            </h2>
            <p className="text-zinc-400 text-lg">
              <SectionTypewriter text="Additional evidence kept compact so the main positioning stays clear" speed={20} />
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {moreProjects.map((project, index) => {
              const isRelease = project.liveUrl?.includes('/releases');
              const LiveIcon = isRelease ? Download : Globe;
              const liveLabel = isRelease ? 'Download' : 'Live Demo';

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-white/80 dark:bg-zinc-900/70 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <span className="text-xs font-mono text-zinc-500 dark:text-zinc-600">
                        #{String(project.id).padStart(2, '0')} / {project.category}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mt-1">{project.title}</h3>
                    </div>
                    {project.status && (
                      <span className="px-2.5 py-1 text-[11px] rounded-full bg-primary/10 text-primary border border-primary/20 capitalize">
                        {project.status}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-500 leading-relaxed line-clamp-2 mb-4">
                    {moreProjectCardCopy[project.id] ?? project.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech.name} className="px-2.5 py-1 text-[11px] bg-zinc-100/80 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 border border-zinc-300/50 dark:border-zinc-700/50 rounded-full">
                        {tech.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => openModal(project)}
                      className="px-3 py-1.5 bg-primary hover:bg-primary/80 text-white rounded-lg text-xs font-medium transition-colors"
                    >
                      Details
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-foreground rounded-lg text-xs font-medium transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 border border-primary text-primary hover:bg-primary hover:text-white rounded-lg text-xs font-medium transition-colors"
                      >
                        <LiveIcon className="w-4 h-4" />
                        {liveLabel}
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== Technical Strengths Section ==================== */}
      <section id="technical-strengths" className="py-24 px-4 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <ScrambleText text="Technical Strengths" tag="span" speed={40} />
            </h2>
            <p className="text-zinc-400 text-lg">
              <SectionTypewriter text="Compact skill groups tied to project evidence" speed={20} />
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:border-primary/40 transition-all duration-500 overflow-hidden h-full">
                  {/* Hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Animated top border */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <motion.div
                        className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center"
                        whileHover={{ scale: 1.3, rotate: 15 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {category.icon}
                      </motion.div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                    </div>

                    {/* Tech Items */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {category.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: catIndex * 0.1 + techIndex * 0.04 + 0.2 }}
                          viewport={{ once: true }}
                          className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/50 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </motion.div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <p className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-600 mb-2">Used in:</p>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {category.usedIn.join(', ')}
                      </p>
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

      {/* ==================== Case Studies Section ==================== */}
      <section id="case-studies" className="py-24 px-4 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <BookOpen className="w-10 h-10 text-primary" />
              <ScrambleText text="Case Studies" tag="span" speed={40} />
            </h2>
            <p className="text-zinc-400 text-lg">
              <SectionTypewriter text="Problem, action, result, and lesson notes from selected projects" speed={20} />
            </p>
          </motion.div>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className={`relative pl-8 border-l-2 ${study.accent.border}`}
              >
                <div className={`absolute -left-[9px] top-0 w-4 h-4 ${study.accent.dot} rounded-full`} />
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-5">
                    <div className="flex items-center gap-2 min-w-0">
                      <Target className={`w-5 h-5 shrink-0 ${study.accent.icon}`} />
                      <h3 className="text-lg font-bold text-foreground">{study.title}</h3>
                    </div>
                    <span className="text-xs text-zinc-500 sm:ml-auto">{study.project}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      ['Problem', study.problem],
                      ['Action', study.action],
                      ['Result', study.result],
                      ['Lesson', study.lesson],
                    ].map(([label, body]) => (
                      <div key={label} className="p-4 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700/50">
                        <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">{label}</p>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== Project Timeline Section ==================== */}
      <section id="timeline" className="py-24 px-4 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Clock className="w-10 h-10 text-primary" />
              <ScrambleText text="Project Timeline" tag="span" speed={40} />
            </h2>
            <p className="text-zinc-400 text-lg">
              <SectionTypewriter text="A chronological journey through each project's evolution" speed={20} />
            </p>
          </motion.div>

          <ProjectTimeline projects={projects} />
        </div>
      </section>

      {/* ==================== Contact Section ==================== */}
      <section id="contact" className="py-24 px-4 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <ScrambleText text="Let's Work Together" tag="span" speed={40} />
            </h2>
            <p className="text-zinc-400 text-lg">
              <SectionTypewriter text="Got an interesting challenge or want to build something together? Let's talk." speed={25} />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 mb-8"
          >
            <ContactForm />
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="mailto:onehouse0460@outlook.com"
              className="group flex items-center gap-3 px-6 py-3 border border-zinc-700 hover:border-primary text-zinc-400 hover:text-primary rounded-full text-sm font-medium transition-all hover:scale-105"
            >
              <Mail className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              onehouse0460@outlook.com
            </a>
            <a
              href="https://github.com/jiwonjae-svg"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 border border-zinc-700 hover:border-primary text-zinc-400 hover:text-primary rounded-full text-sm font-medium transition-all hover:scale-105"
            >
              <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              GitHub
            </a>
          </div>

          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center">
            <p className="text-zinc-500 text-sm">
              © 2026 jiwonjae-svg. Built with Next.js & Framer Motion.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
