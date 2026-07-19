'use client';

import { motion } from 'framer-motion';
import { Github, Mail, Code2, Sparkles, Layers, Package, Download, Globe, TrendingUp, BookOpen, Target, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import TableOfContents from '@/components/TableOfContents';
import ContactForm from '@/components/ContactForm';
import CountUp from '@/components/CountUp';
import { GalaxyInteractiveHeroSection } from '@/components/ui/galaxy-interactive-hero-section';
import { projects, Project } from '@/data/projects';
import { useRef, useState } from 'react';

const SectionTypewriter = dynamic(() => import('@/components/SectionTypewriter'), {
  ssr: false,
  loading: () => <span className="invisible">&#8203;</span>,
});

const ScrambleText = dynamic(() => import('@/components/ScrambleText'), {
  ssr: false,
  loading: () => <span className="invisible">&#8203;</span>,
});

// Compact, evidence-based domain and software skill groups for the hiring-focused homepage.
const techCategories = [
  {
    icon: <Package className="w-6 h-6" />,
    title: 'Shipbuilding / Engineering',
    technologies: ['Structural drawing analysis', 'Basic & detailed design', 'Construction sequencing', 'Bottleneck diagnosis', 'Schedule recovery'],
    usedIn: ['4+ years of professional ship-design and engineering delivery'],
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Frontend',
    technologies: ['React 18', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
    usedIn: ['DrawingFlow', 'DocuMind', 'ParticleVerse', 'SVG Converter', 'DailyGlow'],
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Backend / Cloud',
    technologies: ['Auth.js', 'PostgreSQL / Prisma', 'Neon', 'pgvector', 'Firebase', 'Docker', 'Vercel'],
    usedIn: ['DrawingFlow', 'OpsFlow Command Center', 'DocuMind', 'DailyGlow', 'Word Cube', 'SVG Converter'],
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: 'Quality / Reliability',
    technologies: ['Release gates', 'Project-scoped RBAC', 'DB audit protection', 'Decision policies', 'SLO budgets', 'Runbooks'],
    usedIn: ['DrawingFlow', 'OpsFlow Command Center', 'DocuMind', 'Paste Guardian'],
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
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Mobile',
    technologies: ['React Native', 'Expo SDK 54', 'Expo Router', 'ML Kit OCR', 'TTS', 'EAS Build'],
    usedIn: ['DailyGlow'],
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
      'Japanese: Conversational, working holiday experience, JLPT not acquired',
      'English: Technical documentation and development resources',
      'Product i18n: KO / EN / JA / ZH / ES',
    ],
    usedIn: ['DailyGlow', 'Croquis', 'Color Palette Generator'],
  },
];

const featuredProjectIds = [10, 8, 9, 3];
const moreProjectIds = [4, 5, 7, 2, 1, 6];

const featuredProjectCardCopy: Record<number, string> = {
  10: 'Ship-design DX workflow for revision impact evidence, independent review, controlled issue, production acknowledgement, project-scoped authorization, and database-enforced audit history.',
  8: 'Independent engineering knowledge and traceability case study for controlled technical-document retrieval, source evidence, access boundaries, audit logs, and validation.',
  9: 'Independent workflow review and release-control case study with explicit gates, operational evidence, rollback readiness, and exportable audit packets.',
  7: 'Mobile product in testing built with React Native, Firebase, i18n, offline/online quote data, and Japanese language support.',
  3: 'Interactive WebGL experience using Three.js, custom GLSL shaders, and real-time hand tracking with performance-focused GPU rendering.',
  4: 'Privacy-first browser utility that converts images client-side with Canvas API, 2-pass sampling, and SVG output optimization.',
  5: 'Local-only clipboard security utility using Win32 APIs, encrypted local storage, singleton control, and race-condition prevention.',
};

const moreProjectCardCopy: Record<number, string> = {
  4: 'Privacy-first browser utility with Canvas-based 2-pass sampling, client-side validation, and optimized SVG output.',
  5: 'Local clipboard security utility with Win32 APIs, encrypted storage, singleton control, and adaptive polling.',
  7: 'React Native product in testing with Firebase, multilingual quote data, offline/online data flow, and mobile learning modes.',
  2: 'PyQt6 drawing-practice timer with encrypted local history, heatmap tracking, and Windows installer packaging.',
  1: 'Python desktop color tool using Gemini API, K-Means extraction, Delta E color comparison, and encrypted presets.',
  6: 'Three.js word puzzle with Firebase auth, real-time leaderboard, Trie search, and mobile touch support.',
};

const professionalStats = [
  { value: 4, label: 'Years in Ship Design', icon: <BookOpen className="w-6 h-6" /> },
  { value: 3, label: 'Design & Delivery Stages', icon: <Layers className="w-6 h-6" /> },
  { value: 10, label: 'Project Team Members', icon: <Package className="w-6 h-6" /> },
  { value: 0, label: 'Delivery Delay in Recovery Case', icon: <ShieldCheck className="w-6 h-6" /> },
];

const recruiterSnapshot = [
  {
    label: 'Professional foundation',
    title: 'Ship design across drawings, construction, and delivery',
    detail: '4+ years of professional experience supporting basic design, detailed design, structural drawing analysis, and construction-process coordination in shipbuilding.',
  },
  {
    label: 'Operational judgment',
    title: 'Constraints translated into executable priorities',
    detail: 'When equipment failures and adverse weather threatened the schedule, I rebuilt the remaining sequence and resource priorities and completed the project without a delivery delay.',
  },
  {
    label: 'Digital implementation',
    title: 'Independent DX systems backed by working software',
    detail: 'DrawingFlow, DocuMind, and OpsFlow demonstrate drawing-change control, technical-document retrieval, access boundaries, audit evidence, release review, and automated verification. They are personal case studies, not employer deployments.',
  },
];

const targetRoles = [
  {
    tier: 'Primary target',
    title: 'Ship Design / Marine Engineering',
    evidence: 'Structural drawing analysis, basic and detailed design support, construction sequencing, bottleneck diagnosis, and delivery responsibility.',
    proof: '4+ years at Manmul Joseon',
    icon: <Package className="w-6 h-6" />,
  },
  {
    tier: 'Primary target',
    title: 'Shipbuilding / Manufacturing DX',
    evidence: 'Domain knowledge combined with document retrieval, traceability, workflow controls, quality gates, and process-improvement implementation.',
    proof: 'Professional experience + DrawingFlow',
    icon: <Layers className="w-6 h-6" />,
  },
  {
    tier: 'Primary target',
    title: 'Engineering Systems / CAD·PLM Support',
    evidence: 'Technical-document structures, access boundaries, source evidence, change communication, data validation, and user-verifiable workflows.',
    proof: 'Drawing workflow experience + DrawingFlow + DocuMind',
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    tier: 'Adjacent target',
    title: 'Technical Operations / Process Improvement',
    evidence: 'Constraint analysis, schedule and resource reprioritization, issue documentation, decision ownership, and repeatable operational checks.',
    proof: 'Schedule recovery case + DrawingFlow + OpsFlow',
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    tier: 'Adjacent target',
    title: 'Internal Tools / Workflow Automation',
    evidence: 'Next.js and PostgreSQL systems for controlled information retrieval, operational review, audit packets, and workflow-focused interfaces.',
    proof: 'DrawingFlow + DocuMind + OpsFlow',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    tier: 'Supporting capability',
    title: 'QA Automation / Reliability',
    evidence: 'Automated tests, validation, ownership checks, deterministic release decisions, regression coverage, and deployment hygiene.',
    proof: 'DrawingFlow 12 unit / 4 E2E + 339 DocuMind tests',
    icon: <ShieldCheck className="w-6 h-6" />,
  },
];

const reviewPaths = [
  {
    key: 'shipbuilding-dx',
    label: 'Shipbuilding / Manufacturing DX',
    fit: 'Professional experience -> DrawingFlow -> DocuMind',
    headline: 'Connect shipbuilding-domain judgment with traceable digital workflows.',
    detail:
      'Best for teams improving technical-document access, engineering workflow visibility, quality controls, and process traceability in manufacturing environments.',
    evidence: [
      'Professional work: drawing analysis, construction coordination, schedule recovery, and delivery ownership',
      'DrawingFlow: revision impacts, independent review, controlled issue, production acknowledgement, and project-scoped audit evidence',
      'DocuMind: controlled technical-document retrieval, citations, access boundaries, and audit logs',
    ],
  },
  {
    key: 'engineering-systems',
    label: 'Engineering Systems / CAD·PLM',
    fit: 'Professional experience -> DrawingFlow -> DocuMind',
    headline: 'Lead with technical information, drawing workflows, and user-verifiable outputs.',
    detail:
      'Best for application support or engineering-system roles requiring domain communication, document structures, validation, access control, and reliable technical-file handling.',
    evidence: [
      'Professional work: structural drawings, design constraints, change communication, and construction actions',
      'DrawingFlow: structured drawing registers, revision control, impact links, CSV validation, and a typed PDM adapter boundary',
      'DocuMind: owner-scoped document data, source citations, auditability, and PostgreSQL modeling',
    ],
  },
  {
    key: 'workflow-reliability',
    label: 'Workflow / Reliability',
    fit: 'DrawingFlow -> OpsFlow -> Professional delivery',
    headline: 'Show release safety, operational judgment, and maintainable controls.',
    detail:
      'Best for internal tooling, QA-minded, platform-adjacent, or reliability-oriented product engineering roles.',
    evidence: [
      'DrawingFlow: role-separated workflow gates, durable notifications, database audit protection, and deployment verification',
      'OpsFlow: deterministic deploy decision states and JSON audit packets',
      'Professional delivery: reprioritization under equipment, weather, and schedule constraints',
    ],
  },
  {
    key: 'software-support',
    label: 'Software / Technical Support',
    fit: 'DrawingFlow -> DocuMind -> ParticleVerse',
    headline: 'Review the software implementation after the engineering context is clear.',
    detail:
      'Best for internal tools, technical support engineering, QA-minded development, and software roles that value domain learning and production-minded implementation.',
    evidence: [
      'DrawingFlow: TypeScript, Next.js, PostgreSQL, Auth.js, RBAC, transactional workflows, and Playwright E2E',
      'DocuMind: TypeScript, Next.js, PostgreSQL, pgvector, Auth.js, and automated tests',
      'ParticleVerse: WebGL performance, shaders, and real-time browser interaction',
    ],
  },
] as const;

const resumeDownloads = [
  {
    label: 'English DX CV',
    format: 'PDF',
    href: '/resume/WONJIP_CHOI_Ship_Design_Manufacturing_DX_CV.pdf',
  },
  {
    label: 'Japanese Career History',
    format: 'DOCX',
    href: '/resume/WONJIP_CHOI_JP_Career_History_DX.docx',
  },
  {
    label: 'Manufacturing DX Project Sheet',
    format: 'DOCX',
    href: '/resume/WONJIP_CHOI_JP_Manufacturing_DX_Project_Sheet.docx',
  },
] as const;

const testingEvidence = [
  {
    title: 'DrawingFlow workflow and access verification',
    project: 'DrawingFlow',
    detail: '12 Vitest checks cover workflow, CSV, export, and PDM rules; 4 Playwright scenarios cover multi-role completion, project isolation, import, and mobile usability; a database check confirms append-only audit enforcement.',
  },
  {
    title: 'DocuMind core logic tests',
    project: 'DocuMind',
    detail: '55 Vitest files and 339 tests cover document chunking, validation, ownership checks, search validation, citation formatting, bounded JSON bodies, rate limits, request-origin checks, embedding retries, QA release gates, and deployment hygiene.',
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
    title: 'Drawing changes as a controlled workflow',
    project: 'DrawingFlow',
    accent: {
      border: 'border-cyan-500/30',
      dot: 'bg-cyan-500',
      icon: 'text-cyan-500',
    },
    problem: 'A revised drawing can change fabrication sequence, work-package readiness, materials, inspection scope, schedule, and field execution, but those impacts are easy to lose in informal communication.',
    action: 'Modeled a role-separated Draft-to-Closed workflow with structured impact evidence, project-scoped authorization, controlled issue, production acknowledgement, transactional notifications, and a database-protected audit trail.',
    result: 'Delivered and deployed a synthetic-data system that connects ship-design domain reasoning to a verifiable manufacturing DX workflow, with unit, database, desktop, and mobile checks.',
    lesson: 'Engineering DX becomes credible when domain consequences, authorization boundaries, release gates, and audit evidence are represented together rather than as isolated screens.',
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
  const [activeReviewPath, setActiveReviewPath] = useState<(typeof reviewPaths)[number]['key']>('shipbuilding-dx');
  const modalTriggerRef = useRef<HTMLElement | null>(null);

  const featuredProjects = featuredProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));
  const moreProjects = moreProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));
  const selectedReviewPath = reviewPaths.find((path) => path.key === activeReviewPath) ?? reviewPaths[0];

  const openModal = (project: Project) => {
    modalTriggerRef.current = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
        returnFocusRef={modalTriggerRef}
      />

      {/* ==================== Hero Section ==================== */}
      <GalaxyInteractiveHeroSection />

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
            <p className="section-kicker">Professional foundation</p>
            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <h2 className="section-title">
                Ship-design delivery is the foundation. Digital implementation extends it.
              </h2>
              <p className="section-copy lg:ml-auto">
                Professional experience and independent portfolio work are kept separate. The common thread is turning drawings, constraints, evidence, and review decisions into actions people can verify and execute.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {recruiterSnapshot.map((item) => (
              <article
                key={item.label}
                className="console-panel rounded-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4 text-primary">
                  <CheckCircle2 className="w-5 h-5" />
                  <p className="text-xs uppercase tracking-wider font-semibold">{item.label}</p>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Resume downloads">
            {resumeDownloads.map((document) => (
              <a
                key={document.href}
                href={document.href}
                download
                className="console-panel flex items-center justify-between gap-4 rounded-lg p-4 transition-colors hover:border-primary/50"
              >
                <span>
                  <span className="block text-sm font-semibold text-foreground">{document.label}</span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                    {document.format}
                  </span>
                </span>
                <Download className="h-5 w-5 shrink-0 text-primary" />
              </a>
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
              <SectionTypewriter text="Role fit backed by professional delivery and independent implementation evidence" speed={20} />
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {professionalStats.map((metric) => (
              <div
                key={metric.label}
                className="console-panel rounded-lg p-6 text-center transition-colors hover:border-primary/40 group"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-md bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  {metric.icon}
                </div>
                <CountUp
                  target={metric.value}
                  className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors"
                />
                <p className="text-sm text-slate-400 mt-1">{metric.label}</p>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="console-panel rounded-lg p-5 mb-8"
          >
            <div className="review-path-grid grid gap-5">
              <div>
                <p className="console-label mb-3">Review path</p>
                <h3 className="text-2xl font-bold text-foreground">Choose the engineering lens before reviewing the evidence.</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  The same experience is relevant to different teams. These paths keep shipbuilding-domain work first and reorder the independent case studies by role.
                </p>
              </div>

              <div>
                <div
                  role="tablist"
                  aria-label="Portfolio review paths"
                  className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4"
                >
                  {reviewPaths.map((path) => (
                    <button
                      key={path.key}
                      id={`review-path-tab-${path.key}`}
                      type="button"
                      role="tab"
                      aria-selected={activeReviewPath === path.key}
                      aria-controls="review-path-panel"
                      onClick={() => setActiveReviewPath(path.key)}
                      className={`rounded-md border px-3 py-2.5 text-left transition-colors ${
                        activeReviewPath === path.key
                          ? 'border-primary bg-primary text-[#03111c]'
                          : 'border-[#163042]/80 bg-[#07111f]/80 text-slate-400 hover:border-primary/50 hover:text-slate-200'
                      }`}
                    >
                      <span className="block text-xs font-bold">{path.label}</span>
                      <span className="mt-1 block text-[11px] opacity-80">{path.fit}</span>
                    </button>
                  ))}
                </div>

                <div
                  id="review-path-panel"
                  role="tabpanel"
                  aria-label={selectedReviewPath.label}
                  aria-labelledby={`review-path-tab-${selectedReviewPath.key}`}
                  className="mt-4 rounded-md border border-[#163042]/80 bg-[#03070d]/70 p-4"
                >
                  <p className="text-lg font-bold text-foreground">{selectedReviewPath.headline}</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-secondary">
                    Recommended order: {selectedReviewPath.fit}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{selectedReviewPath.detail}</p>
                  <ul className="mt-4 grid gap-2 text-sm text-slate-300 md:grid-cols-3">
                    {selectedReviewPath.evidence.map((item) => (
                      <li key={item} className="flex gap-2 rounded-md border border-[#163042]/70 bg-[#07111f]/70 p-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {targetRoles.map((role) => (
              <article
                key={role.title}
                className="console-panel rounded-lg p-6 transition-colors hover:border-primary/40"
              >
                <div className="w-12 h-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {role.icon}
                </div>
                <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                  {role.tier}
                </p>
                <h3 className="text-xl font-bold text-foreground mb-3">{role.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {role.evidence}
                </p>
                <p className="text-xs font-medium text-primary">
                  Proof: {role.proof}
                </p>
              </article>
            ))}
          </div>
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
            <p className="section-kicker">Independent implementation</p>
            <h2 className="section-title flex items-center gap-3">
              <Code2 className="w-10 h-10 text-primary" />
              <ScrambleText text="DX Case Studies" tag="span" speed={40} />
            </h2>
            <p className="section-copy">
              <SectionTypewriter text="Technical-document traceability and operational review, followed by supporting software evidence" speed={20} />
            </p>
          </motion.div>

          <div className="mb-8 border-l-2 border-primary bg-primary/[0.06] px-5 py-4 text-sm leading-6 text-slate-300">
            These are independent portfolio case studies. They were not deployed at Manmul Joseon and contain no employer drawings, customer information, or production data.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="h-full">
                <ProjectCard
                  project={project}
                  index={index}
                  onOpenModal={openModal}
                  cardSummary={featuredProjectCardCopy[project.id]}
                />
              </div>
            ))}
          </div>
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
            {moreProjects.map((project) => {
              const isRelease = project.liveUrl?.includes('/releases');
              const LiveIcon = isRelease ? Download : Globe;
              const liveLabel = isRelease ? 'Download' : 'Live Demo';

              return (
                <article
                  key={project.id}
                  className="console-panel rounded-lg p-5 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">
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
                </article>
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
            {testingEvidence.map((item) => (
              <article
                key={item.title}
                className="console-panel rounded-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4 text-primary">
                  <CheckCircle2 className="w-5 h-5" />
                  <p className="text-xs uppercase tracking-wider font-semibold">{item.project}</p>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.detail}</p>
              </article>
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
            {techCategories.map((category) => (
              <article
                key={category.title}
                className="group relative"
              >
                <div className="relative console-panel rounded-lg p-6 hover:border-primary/40 transition-colors duration-200 overflow-hidden h-full">
                  <div className="relative z-10">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center"
                      >
                        {category.icon}
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                    </div>

                    {/* Tech Items */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {category.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-[#07111f]/80 text-slate-300 border border-[#163042]/80 rounded-md text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[#163042]/80">
                      <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Used in:</p>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {category.usedIn.join(', ')}
                      </p>
                    </div>
                  </div>

                </div>
              </article>
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
              <SectionTypewriter text="Shipbuilding-domain experience with practical Japan communication context" speed={20} />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="console-panel rounded-lg p-6 md:p-8"
          >
            <dl className="grid gap-px overflow-hidden rounded-md border border-[#163042]/80 bg-[#163042]/80 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['Location / visa', 'Korea-based · work visa sponsorship required'],
                ['Relocation timing', 'After visa process · remote start possible if supported'],
                ['Japanese', 'Conversational / basic workplace communication · JLPT not acquired'],
                ['Interview', 'English preferred · basic Japanese introduction and Q&A available'],
              ].map(([label, value]) => (
                <div key={label} className="bg-[#07111f] p-4">
                  <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {label}
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-200">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">English</p>
                <p className="text-base text-slate-200 leading-7">
                  During a working holiday in Japan, I handled daily life and basic workplace communication in Japanese. I do not yet hold JLPT certification. English is preferred for technical interviews; I can handle self-introductions, basic Q&amp;A, and everyday communication in Japanese while continuing to study technical and business terms.
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Japanese</p>
                <p lang="ja" className="text-base text-slate-200 leading-7">
                  日本でのワーキングホリデー中、日本語で日常生活および基本的な業務コミュニケーションを経験しました。JLPTは未取得です。技術面接は英語を希望しますが、日本語での自己紹介・基本的な質疑応答・日常的なコミュニケーションに対応できます。就労ビザのサポートが必要で、ビザ手続き後の日本移住を希望しています。
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-[#163042]/80 pt-6">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Japanese profile summary</p>
              <p lang="ja" className="text-base text-slate-200 leading-7">
                造船設計分野で4年以上、構造図面の分析、基本・詳細設計、建造工程の調整、納期対応に携わっています。個人開発ではTypeScript、Next.js、PostgreSQL、AI、自動テストを用い、技術文書検索、アクセス制御、監査ログ、業務レビューの仕組みを実装しています。造船・製造現場の制約を理解し、確認可能で追跡可能なDX業務フローへつなげることを目指しています。
              </p>
            </div>
          </motion.div>
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
            {caseStudies.map((study) => (
              <article
                key={study.title}
                className={`relative pl-8 border-l-2 ${study.accent.border}`}
              >
                <div className={`absolute -left-[9px] top-0 w-4 h-4 ${study.accent.dot} rounded-full`} />
                <div className="console-panel rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-5">
                    <div className="flex items-center gap-2 min-w-0">
                      <Target className={`w-5 h-5 shrink-0 ${study.accent.icon}`} />
                      <h3 className="text-lg font-bold text-foreground">{study.title}</h3>
                    </div>
                    <span className="text-xs text-slate-400 sm:ml-auto">{study.project}</span>
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
              </article>
            ))}
          </div>
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

          <p className="mb-4 text-sm leading-6 text-slate-400">
            A résumé and detailed work history can be provided on request.
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-start mb-12">
            <a
              href="mailto:onehouse0460@outlook.com?subject=Resume%20request%20%2F%20%E8%81%B7%E5%8B%99%E7%B5%8C%E6%AD%B4%E6%9B%B8%E3%81%AE%E3%81%94%E4%BE%9D%E9%A0%BC"
              className="group flex items-center gap-3 px-6 py-3 border border-primary/50 hover:border-primary text-primary rounded-md text-sm font-medium transition-all hover:scale-[1.02]"
            >
              <BookOpen className="w-4 h-4 group-hover:rotate-6 transition-transform" />
              Request résumé / 職務経歴書
            </a>
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
            <p className="text-slate-400 text-sm">
              © 2026 WONJIP CHOI. Built with Next.js & Framer Motion.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
