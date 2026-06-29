'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Github, Mail, ArrowDown, ArrowRight, Code2, Sparkles, Layers, Package, Download, Globe, TrendingUp, BookOpen, Target, Smartphone, Clock, ShieldCheck, CheckCircle2, Activity, Terminal, Database } from 'lucide-react';
import dynamic from 'next/dynamic';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import ParticleBackground from '@/components/ParticleBackground';
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
    technologies: ['Release gates', 'Decision policies', 'SLO budgets', 'Audit trails', 'Runbooks', 'Owner-scoped tests'],
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

const featuredProjectIds = [8, 9, 3, 4];
const moreProjectIds = [5, 7, 2, 1, 6];

const featuredProjectCardCopy: Record<number, string> = {
  8: 'RAG-based internal knowledge search with Auth.js, PostgreSQL, pgvector, owner-scoped retrieval, source-cited answers, audit logs, and agent-ready API routes.',
  9: 'Local-first release review workspace for AI-enabled workflow systems with deployment gates, operational metrics, JSON audit packets, and production verification.',
  7: 'Mobile product in testing built with React Native, Firebase, i18n, offline/online quote data, and Japanese language support.',
  3: 'Interactive WebGL experience using Three.js, custom GLSL shaders, and real-time hand tracking with performance-focused GPU rendering.',
  4: 'Privacy-first browser utility that converts images client-side with Canvas API, 2-pass sampling, and SVG output optimization.',
  5: 'Local-only clipboard security utility using Win32 APIs, encrypted local storage, singleton control, and race-condition prevention.',
};

const moreProjectCardCopy: Record<number, string> = {
  5: 'Local clipboard security utility with Win32 APIs, encrypted storage, singleton control, and adaptive polling.',
  7: 'React Native product in testing with Firebase, multilingual quote data, offline/online data flow, and mobile learning modes.',
  2: 'PyQt6 drawing-practice timer with encrypted local history, heatmap tracking, and Windows installer packaging.',
  1: 'Python desktop color tool using Gemini API, K-Means extraction, Delta E color comparison, and encrypted presets.',
  6: 'Three.js word puzzle with Firebase auth, real-time leaderboard, Trie search, and mobile touch support.',
};

const portfolioStats = [
  { value: 9, label: 'Portfolio Projects', icon: <Code2 className="w-6 h-6" /> },
  { value: 2, label: 'AI Workflow Systems', icon: <Sparkles className="w-6 h-6" /> },
  { value: 5, label: 'Live Web Services', icon: <Globe className="w-6 h-6" /> },
  { value: 29, label: 'DocuMind Test Files', icon: <ShieldCheck className="w-6 h-6" /> },
];

const recruiterSnapshot = [
  {
    label: 'Primary fit',
    title: 'AI-enabled full-stack / internal tools',
    detail: 'DocuMind and OpsFlow show RAG knowledge search, owner-scoped retrieval, release review workflows, audit logs, and agent-ready API design.',
  },
  {
    label: 'Frontend proof',
    title: 'Interactive UI plus performance work',
    detail: 'ParticleVerse and SVG Converter show WebGL, Canvas processing, GPU rendering, browser performance work, and responsive product surfaces.',
  },
  {
    label: 'Japan signal',
    title: 'Japan-ready communication context',
    detail: 'Working holiday experience in Japan, conversational Japanese, and product work with multilingual data and Japanese support.',
  },
];

const targetRoles = [
  {
    title: 'AI-Enabled Full-Stack',
    evidence: 'RAG search, source-cited answers, owner-scoped access, audit logs, and TypeScript/Next.js product surfaces.',
    projects: 'DocuMind, OpsFlow Command Center',
    icon: <Layers className="w-6 h-6" />,
  },
  {
    title: 'Internal Tools / Workflow',
    evidence: 'Release gates, deployment decision policies, JSON review packets, operational metrics, and workflow-focused UI state.',
    projects: 'OpsFlow Command Center, DocuMind',
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    title: 'Frontend / WebGL',
    evidence: 'GPU shader rendering, Canvas image processing, adaptive mobile rendering, and real-time interaction optimization.',
    projects: 'ParticleVerse, SVG Converter, Word Cube',
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    title: 'Security / Reliability',
    evidence: 'Validation, request-origin checks, rate limits, encrypted local storage, audit formatting, and deployment hygiene.',
    projects: 'DocuMind, Paste Guardian, SVG Converter',
    icon: <Sparkles className="w-6 h-6" />,
  },
];

const testingEvidence = [
  {
    title: 'DocuMind core logic tests',
    project: 'DocuMind',
    detail: '29 Vitest files cover document chunking, document validation, ownership checks, search validation, audit formatting, bounded JSON bodies, rate limits, request-origin checks, embedding retries, and deployment hygiene.',
  },
  {
    title: 'OpsFlow release review QA',
    project: 'OpsFlow Command Center',
    detail: 'Playwright E2E verifies the main release-review flow, localStorage persistence, generated review decisions, mobile overflow, and console health before the Vercel production link is used.',
  },
  {
    title: 'Browser tooling reliability',
    project: 'SVG Converter / Paste Guardian',
    detail: 'Client-side validation, XSS/CSRF-oriented checks, local-only processing, encrypted clipboard history, singleton control, and adaptive polling are documented in project challenge notes.',
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
    action: 'Built an interactive release console that models SLO budgets, explicit decision thresholds, review packets, remediation runbooks, rollback readiness, and audit events across three deterministic scenarios.',
    result: 'Moved the release-safety evidence into a standalone page so the platform/QA reliability signal can be reviewed outside the main portfolio flow.',
    lesson: 'A small project can still show senior engineering thinking when failure modes, decision thresholds, response ownership, and audit boundaries are explicit.',
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
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThemeToggle />
      <ParticleBackground />

      {/* Project Detail Modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />

      {/* ==================== Hero Section ==================== */}
      <section className="relative min-h-screen px-4 py-14 md:py-16 overflow-hidden">
        <div className="relative z-10 mx-auto grid max-w-7xl gap-6 lg:grid-cols-[240px_minmax(0,1fr)_360px] lg:items-center">
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden space-y-4 lg:block"
          >
            <div className="console-panel rounded-lg p-5">
              <p className="console-label mb-5">System Overview</p>
              {[
                ['Primary fit', 'AI workflow systems'],
                ['Backend', 'PostgreSQL / pgvector'],
                ['Frontend', 'Next.js / TypeScript'],
                ['Quality', '29 DocuMind test files'],
              ].map(([label, value]) => (
                <div key={label} className="border-t border-[#163042]/70 py-3 first:border-t-0 first:pt-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-200">{value}</p>
                </div>
              ))}
            </div>

            <div className="console-panel rounded-lg p-5">
              <p className="console-label mb-4">Japan Signal</p>
              <div className="space-y-3 text-sm leading-6 text-slate-400">
                <p>Working holiday experience in Japan.</p>
                <p>Conversational Japanese and active technical communication practice.</p>
              </div>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="min-w-0"
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="console-chip text-secondary">
                <Activity className="h-3.5 w-3.5" />
                operational
              </span>
              <span className="console-chip">RAG search</span>
              <span className="console-chip">release gates</span>
              <span className="console-chip">WebGL performance</span>
            </div>

            <h1 className="max-w-4xl break-words text-3xl font-black leading-[1.04] tracking-normal text-foreground sm:text-4xl md:text-6xl xl:text-7xl">
              AI-enabled full-stack engineer for
              <span className="block text-secondary">working systems.</span>
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-400 md:text-lg">
              Korea-based developer targeting Japan IT roles with evidence in RAG knowledge search,
              owner-scoped access control, release-review workflows, Next.js/TypeScript,
              PostgreSQL/pgvector, WebGL performance, and secure local utilities.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#featured-projects"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold text-[#03111c] transition-colors hover:bg-primary/80"
              >
                View Hiring Evidence
                <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-primary/50 px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary/10"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
              {portfolioStats.map((metric) => (
                <div key={metric.label} className="console-panel rounded-lg p-4">
                  <div className="mb-3 text-primary">{metric.icon}</div>
                  <CountUp target={metric.value} className="text-2xl font-black text-foreground" />
                  <p className="mt-1 text-xs leading-5 text-slate-500">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="console-panel-strong rounded-lg"
          >
            <div className="flex items-center justify-between border-b border-[#163042]/80 px-5 py-4">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                <p className="console-label">Candidate Console</p>
              </div>
              <span className="font-mono text-[11px] text-secondary">v2026.06</span>
            </div>
            <div className="space-y-5 p-5">
              <pre className="overflow-x-auto rounded-md border border-[#163042]/80 bg-[#03070d] p-4 text-xs leading-6 text-slate-300">
                <code>{`const candidate = {
  role: 'AI-enabled full-stack',
  systems: ['DocuMind', 'OpsFlow'],
  stack: ['Next.js', 'PostgreSQL', 'pgvector'],
  proof: ['citations', 'audit logs', 'tests'],
  japan: 'working holiday + conversational JA'
};`}</code>
              </pre>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ['DocuMind', 'RAG + citations'],
                  ['OpsFlow', 'release review'],
                  ['ParticleVerse', 'WebGL / GLSL'],
                  ['SVG Converter', 'client-side tool'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md border border-[#163042]/80 bg-[#07111f]/80 p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">{label}</p>
                    <p className="mt-1 text-xs text-slate-400">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between rounded-md border border-secondary/25 bg-secondary/10 px-4 py-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-secondary">Review path</p>
                  <p className="mt-1 text-sm font-semibold text-slate-200">Start with featured evidence</p>
                </div>
                <Database className="h-5 w-5 text-secondary" />
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* ==================== Table of Contents ==================== */}
      <TableOfContents />

      {/* ==================== Recruiter Snapshot Section ==================== */}
      <section id="recruiter-snapshot" className="section-band">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="section-kicker">Recruiter snapshot</p>
            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <h2 className="section-title">
                Fast evidence path for AI-enabled full-stack roles in Japan.
              </h2>
              <p className="section-copy lg:ml-auto">
                Start with DocuMind and OpsFlow, then review WebGL, browser tooling, security, and Japan readiness evidence. The page is ordered for hiring review rather than project chronology.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {recruiterSnapshot.map((item, index) => (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="console-panel rounded-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4 text-primary">
                  <CheckCircle2 className="w-5 h-5" />
                  <p className="text-xs uppercase tracking-wider font-semibold">{item.label}</p>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== Target Roles Section ==================== */}
      <section id="target-roles" className="section-band">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="section-kicker">Role Fit</p>
            <h2 className="section-title flex items-center gap-3">
              <Target className="w-10 h-10 text-primary" />
              <ScrambleText text="Target Roles" tag="span" speed={40} />
            </h2>
            <p className="section-copy">
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
                className="console-panel rounded-lg p-6 text-center transition-all hover:border-primary/40 group"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-md bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  {metric.icon}
                </div>
                <CountUp
                  target={metric.value}
                  className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors"
                />
                <p className="text-sm text-slate-500 mt-1">{metric.label}</p>
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
                className="console-panel rounded-lg p-6 transition-all hover:border-primary/40"
              >
                <div className="w-12 h-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {role.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{role.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
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
      <section id="japan-readiness" className="section-band">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="section-kicker">Relocation Signal</p>
            <h2 className="section-title flex items-center gap-3">
              <Globe className="w-10 h-10 text-primary" />
              <ScrambleText text="Japan Readiness" tag="span" speed={40} />
            </h2>
            <p className="section-copy">
              <SectionTypewriter text="Engineering focus with practical Japan communication context" speed={20} />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="console-panel rounded-lg p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">English</p>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Open to engineering roles in Japan. Working holiday experience in Japan, conversational Japanese, and continued technical communication practice.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Japanese</p>
                <p lang="ja" className="text-lg text-slate-300 leading-relaxed">
                  日本でのワーキングホリデー経験と日常会話レベルの日本語力を活かし、日本の開発チームで成長しながら貢献したいと考えています。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== Featured Projects Section ==================== */}
      <section id="featured-projects" className="section-band">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="section-kicker">Case Files</p>
            <h2 className="section-title flex items-center gap-3">
              <Code2 className="w-10 h-10 text-primary" />
              <ScrambleText text="Featured Projects" tag="span" speed={40} />
            </h2>
            <p className="section-copy">
              <SectionTypewriter text="DocuMind and OpsFlow first, followed by WebGL performance and browser tooling evidence" speed={20} />
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
      <section id="more-projects" className="section-band">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="section-kicker">Supporting Work</p>
            <h2 className="section-title flex items-center gap-3">
              <Package className="w-10 h-10 text-primary" />
              <ScrambleText text="More Projects" tag="span" speed={40} />
            </h2>
            <p className="section-copy">
              <SectionTypewriter text="Supporting security, mobile, desktop, AI utility, and game projects kept below the main hiring evidence" speed={20} />
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
                  className="console-panel rounded-lg p-5 transition-all hover:border-primary/40"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">
                        #{String(project.id).padStart(2, '0')} / {project.category}
                      </span>
                      <h3 className="text-lg font-bold text-foreground mt-1">{project.title}</h3>
                    </div>
                    {project.status && (
                      <span className="px-2.5 py-1 text-[11px] rounded-md bg-secondary/10 text-secondary border border-secondary/20 capitalize">
                        {project.status}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                    {moreProjectCardCopy[project.id] ?? project.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech.name} className="px-2.5 py-1 text-[11px] bg-[#07111f]/80 text-slate-300 border border-[#163042]/80 rounded-md">
                        {tech.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => openModal(project)}
                      className="px-3 py-1.5 bg-primary hover:bg-primary/80 text-[#03111c] rounded-md text-xs font-semibold transition-colors"
                    >
                      Details
                    </button>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#07111f] hover:bg-[#0e1b2c] text-foreground rounded-md border border-[#163042]/80 text-xs font-medium transition-colors"
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
                        className="flex items-center gap-2 px-3 py-1.5 border border-primary/50 text-primary hover:bg-primary/10 rounded-md text-xs font-medium transition-colors"
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

      {/* ==================== Testing Evidence Section ==================== */}
      <section id="testing-evidence" className="section-band">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="section-kicker">Quality Signals</p>
            <h2 className="section-title flex items-center gap-3">
              <ShieldCheck className="w-10 h-10 text-primary" />
              <ScrambleText text="Testing Evidence" tag="span" speed={40} />
            </h2>
            <p className="section-copy">
              <SectionTypewriter text="Concrete quality signals for companies that care about maintainability, automation, and release safety" speed={20} />
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {testingEvidence.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="console-panel rounded-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4 text-primary">
                  <CheckCircle2 className="w-5 h-5" />
                  <p className="text-xs uppercase tracking-wider font-semibold">{item.project}</p>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== Technical Strengths Section ==================== */}
      <section id="technical-strengths" className="section-band">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="section-kicker">Stack Evidence</p>
            <h2 className="section-title">
              <ScrambleText text="Technical Strengths" tag="span" speed={40} />
            </h2>
            <p className="section-copy">
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
                <div className="relative console-panel rounded-lg p-6 hover:border-primary/40 transition-all duration-500 overflow-hidden h-full">
                  {/* Hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Animated top border */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <motion.div
                        className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center"
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
                          className="px-3 py-1.5 bg-[#07111f]/80 text-slate-300 border border-[#163042]/80 rounded-md text-xs font-medium"
                        >
                          {tech}
                        </motion.div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[#163042]/80">
                      <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Used in:</p>
                      <p className="text-sm text-slate-300 leading-relaxed">
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
      <section id="case-studies" className="section-band">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="section-kicker">Engineering Notes</p>
            <h2 className="section-title flex items-center gap-3">
              <BookOpen className="w-10 h-10 text-primary" />
              <ScrambleText text="Case Studies" tag="span" speed={40} />
            </h2>
            <p className="section-copy">
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
                <div className="console-panel rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-5">
                    <div className="flex items-center gap-2 min-w-0">
                      <Target className={`w-5 h-5 shrink-0 ${study.accent.icon}`} />
                      <h3 className="text-lg font-bold text-foreground">{study.title}</h3>
                    </div>
                    <span className="text-xs text-slate-500 sm:ml-auto">{study.project}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      ['Problem', study.problem],
                      ['Action', study.action],
                      ['Result', study.result],
                      ['Lesson', study.lesson],
                    ].map(([label, body]) => (
                      <div key={label} className="rounded-md border border-[#163042]/80 bg-[#07111f]/80 p-4">
                        <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">{label}</p>
                        <p className="text-sm text-slate-300 leading-relaxed">{body}</p>
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
      <section id="timeline" className="section-band">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="section-kicker">Build Sequence</p>
            <h2 className="section-title flex items-center gap-3">
              <Clock className="w-10 h-10 text-primary" />
              <ScrambleText text="Project Timeline" tag="span" speed={40} />
            </h2>
            <p className="section-copy">
              <SectionTypewriter text="A chronological journey through each project's evolution" speed={20} />
            </p>
          </motion.div>

          <ProjectTimeline projects={projects} />
        </div>
      </section>

      {/* ==================== Contact Section ==================== */}
      <section id="contact" className="section-band">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="section-kicker">Contact</p>
            <h2 className="section-title">
              <ScrambleText text="Let's Work Together" tag="span" speed={40} />
            </h2>
            <p className="section-copy">
              <SectionTypewriter text="Got an interesting challenge or want to build something together? Let's talk." speed={25} />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="console-panel rounded-lg p-8 mb-8"
          >
            <ContactForm />
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 items-start mb-12">
            <a
              href="mailto:onehouse0460@outlook.com"
              className="group flex items-center gap-3 px-6 py-3 border border-border hover:border-primary text-slate-400 hover:text-primary rounded-md text-sm font-medium transition-all hover:scale-[1.02]"
            >
              <Mail className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              onehouse0460@outlook.com
            </a>
            <a
              href="https://github.com/jiwonjae-svg"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 border border-border hover:border-primary text-slate-400 hover:text-primary rounded-md text-sm font-medium transition-all hover:scale-[1.02]"
            >
              <Github className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              GitHub
            </a>
          </div>

          <div className="pt-8 border-t border-border text-left">
            <p className="text-slate-500 text-sm">
              © 2026 jiwonjae-svg. Built with Next.js & Framer Motion.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
