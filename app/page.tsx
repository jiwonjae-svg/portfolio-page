'use client';

import { motion } from 'framer-motion';
import { Github, Mail, ArrowDown, Code2, Sparkles, Cpu, Layers, Shield, Package, Download, Globe, CheckCircle2, TrendingUp, AlertTriangle, BookOpen, Target, ChevronRight } from 'lucide-react';
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
        name: 'Python 3.10~3.12',
        desc: 'Used for complex system logic, encryption pipelines, AI API integration, and data processing automation. Proficient in low-level libraries including colorsys, cryptography, and psutil.',
      },
      {
        name: 'TypeScript 5 & JavaScript (ES6+)',
        desc: 'Ensuring type safety for large-scale web apps. Preventing runtime errors at compile time with generics, union types, and interface design. Experience modeling complex types for Zustand stores, shader uniforms, and more.',
      },
      {
        name: 'GLSL (Vertex/Fragment Shader)',
        desc: 'Writing custom shaders that execute directly on the GPU. Achieved 60fps by parallel-processing particle position transforms, color interpolation, and effect computations without CPU involvement.',
      },
    ],
  },
  {
    icon: '💻',
    title: 'Frontend & UI Framework',
    items: [
      {
        name: 'Next.js 14 (App Router) & React 18',
        desc: 'Building high-performance web services with SSR/ISR. Bundle optimization via Dynamic Import, minimized initial loading by separating Server/Client Components. Applied in ParticleVerse, portfolio, and more.',
      },
      {
        name: 'PyQt6 & CustomTkinter',
        desc: 'Python-based desktop GUI frameworks. Experience with signal-slot event architecture, QResource system, and dark-mode theme customization. Built 3 shipped desktop applications.',
      },
      {
        name: 'Tailwind CSS & Framer Motion',
        desc: 'Rapidly building responsive UIs with utility-first CSS, and implementing interactive UX such as scroll triggers, spring physics, and page transitions with declarative animation APIs.',
      },
      {
        name: 'Zustand (State Management)',
        desc: 'Lightweight global state management library. 90% less boilerplate than Redux. Local storage sync with persist middleware, preventing unnecessary re-renders with selector patterns.',
      },
    ],
  },
  {
    icon: '🎨',
    title: '3D Graphics & AI',
    items: [
      {
        name: 'Three.js & React Three Fiber (R3F)',
        desc: 'Designing WebGL-based 3D rendering pipelines. Custom rendering with BufferGeometry and ShaderMaterial. Raycaster-based 3D object interaction and OrbitControls camera control.',
      },
      {
        name: '@react-three/postprocessing',
        desc: 'Cinematic visual effects with Bloom, Vignette, and other post-processing. Auto-adjusting effect intensity on mobile to balance performance and quality.',
      },
      {
        name: 'MediaPipe Hands',
        desc: 'Touchless interaction by extracting 21 real-time hand landmarks → Zustand → GLSL uniform delivery. Adaptive camera resolution scaling to minimize mobile latency.',
      },
      {
        name: 'Google Gemini API',
        desc: 'Natural language → visual data conversion. Stable AI integration with multi-stage regex parsing pipelines and fallback logic for free-form responses.',
      },
      {
        name: 'Canvas API & Image Processing (Pillow)',
        desc: 'Pixel-level image analysis: getImageData, 2-Pass Grid Sampling, Luminance filtering, K-Means clustering. Image processing experience on both browser and desktop.',
      },
    ],
  },
  {
    icon: '🔒',
    title: 'Security & System',
    items: [
      {
        name: 'Fernet (AES-128) Encryption',
        desc: 'Symmetric encryption design for local data protection. Device-specific unique key generation, external key file separation, and data re-encryption pipeline on key changes. Applied across 3 projects.',
      },
      {
        name: 'Win32 API (clipboard, gui, process)',
        desc: 'OS-level system control: clipboard hooking (OpenClipboard/CloseClipboard), system tray residence, process monitoring (psutil), multi-instance prevention (Named Mutex).',
      },
      {
        name: 'Web Security (XSS/CSRF/Clickjacking Prevention)',
        desc: 'File upload validation, input sanitization, and Content Security Policy enforcement. Designed reusable security utility modules applied across multiple projects.',
      },
      {
        name: 'Firebase (Auth, Firestore, Security Rules)',
        desc: 'Serverless authentication (anonymous/Google OAuth) + real-time DB. Server-side data validation and anti-cheat logic via Firestore Security Rules.',
      },
    ],
  },
  {
    icon: '📦',
    title: 'Infrastructure & DevOps',
    items: [
      {
        name: 'Vercel (Edge Deployment)',
        desc: 'Zero-downtime deployment for Next.js/Vite projects. Global low-latency serving via Edge Network, automatic deployment testing per PR with Preview Deployments.',
      },
      {
        name: 'PyInstaller + Inno Setup',
        desc: 'Packaging Python apps into single .exe files and building Windows installers. Managing resources/hiddenimports in spec files, with data preservation logic for install/upgrade/uninstall scenarios.',
      },
      {
        name: 'Firebase Hosting',
        desc: 'SPA deployment and custom domain setup. Global accessibility through CDN-based static asset serving.',
      },
      {
        name: 'i18n (Multilingual Support)',
        desc: 'Designing systems supporting up to 4 languages (KO/EN/JA/ZH). Experience with CSV-based translation management (Croquis), modular locale files (SVG Converter), and LanguageManager classes (Color Palette).',
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
              Security & Graphics:
              <br />
              A Developer Breaking Technical Boundaries
            </AnimatedGradientText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-zinc-400 mb-12 leading-relaxed"
          >
            From GPU shaders to AES-128 encryption —<br className="hidden md:block" />
            A full-stack engineer bridging AI, 3D graphics, and system security
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
              Featured Projects
            </h2>
            <p className="text-zinc-400 text-lg">
              Click any project card to deep-dive into technical challenges, solutions, and system architecture
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
              🛠️ Skill & Tech Stack
            </h2>
            <p className="text-zinc-400 text-lg">
              From GPU shaders to encrypted storage — the real value each technology delivers
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

      {/* ==================== Proof of Performance Section ==================== */}
      <section id="performance" className="py-24 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <TrendingUp className="w-10 h-10 text-primary" />
              Proof of Performance
            </h2>
            <p className="text-zinc-400 text-lg">
              Technical achievements proven by quantitative metrics and verification results
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-6 mb-16">
            {[
              { value: '6', label: 'Completed Projects', icon: '🚀' },
              { value: '3', label: 'Shipped Desktop Apps', icon: '💻' },
              { value: '3', label: 'Live Web Services', icon: '🌐' },
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-primary/40 transition-all group"
              >
                <motion.span
                  className="text-3xl block mb-2"
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {metric.icon}
                </motion.span>
                <p className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {metric.value}
                </p>
                <p className="text-sm text-zinc-500 mt-1">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Security & Quality Verification */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Security Verification */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <div className="flex items-center gap-3 mb-5">
                <Shield className="w-6 h-6 text-emerald-400" />
                <h3 className="text-lg font-bold text-foreground">Security Verification</h3>
              </div>
              <div className="space-y-3">
                {[
                  'AES-128 (Fernet) Encryption — Protecting settings, history, and palette data',
                  'External encryption key separation (secret.key) — No hardcoding',
                  'Built-in XSS / CSRF / Clickjacking prevention utilities',
                  'Firestore Security Rules — Server-side data validation',
                  'Win32 API atomic clipboard access (race condition resolved)',
                  'OS Mutex pattern — Multi-instance prevention',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-zinc-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Performance Optimization */}
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <div className="flex items-center gap-3 mb-5">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
                <h3 className="text-lg font-bold text-foreground">Performance Optimization</h3>
              </div>
              <div className="space-y-3">
                {[
                  'GLSL shader GPU computation — 50,000+ particles at 60fps',
                  '2-Pass Grid Sampling — O(W×H) → O(n/g²) complexity reduction',
                  'Trie dictionary search — O(n) → O(m) real-time word verification',
                  'Adaptive polling (200ms~1000ms) — Minimized CPU load',
                  'SVG element merging — 60%+ output size reduction',
                  'Mobile adaptive DPR/Bloom — Cross-device optimization',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-zinc-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Unit Test CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-400 mt-1 shrink-0" />
              <div>
                <h4 className="text-base font-bold text-foreground mb-2">Upcoming: Unit Test Integration</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Currently preparing to introduce unit tests for core logic in each project (color algorithms, encryption modules, particle generation, etc.).
                  Plan to add test coverage reports based on pytest (Python) and Vitest/Jest (TypeScript) to this section.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== Professional Experience & Retro Section ==================== */}
      <section id="experience" className="py-24 px-4">
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
              Experience & Retrospective
            </h2>
            <p className="text-zinc-400 text-lg">
              Lessons learned from failures, transformed into technical growth
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* Retrospective 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-primary/30"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full" />
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">Redesigning Security Architecture</h3>
                  <span className="text-xs text-zinc-500 ml-auto">Color Palette Generator v1.0.0 → v1.0.1</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  In v1.0.0, I made the critical mistake of hardcoding the encryption key in the source code.
                  If the code had been uploaded to a public repository, all user data would have been exposed — a severe security vulnerability.
                </p>
                <div className="flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                  <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-zinc-300">
                    <span className="font-semibold text-emerald-400">Lesson:</span> Separated the key into an external file (secret.key), configured .gitignore, and built a data re-encryption pipeline.
                    This experience taught me the principle that &quot;security must come first, not later.&quot;
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Retrospective 2 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-secondary/30"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-secondary rounded-full" />
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-secondary" />
                  <h3 className="text-lg font-bold text-foreground">CPU vs GPU — Discovering Parallel Processing</h3>
                  <span className="text-xs text-zinc-500 ml-auto">ParticleVerse</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  In the initial version, updating 50,000 particle positions every frame in JavaScript resulted in a dismal 10fps.
                  I temporarily gave up, thinking &quot;this many particles is impossible on the web.&quot;
                </p>
                <div className="flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                  <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-zinc-300">
                    <span className="font-semibold text-emerald-400">Lesson:</span> After learning GLSL custom shaders and offloading computation to the GPU, I achieved 60fps.
                    The realization that &quot;it&apos;s not impossible — the approach was wrong&quot; taught me that understanding hardware architecture is the key to software performance.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Retrospective 3 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-primary/30"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full" />
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">Cross-Platform Data Migration Dilemma</h3>
                  <span className="text-xs text-zinc-500 ml-auto">Croquis</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  When pushing an installer upgrade via Inno Setup, changing the encryption key caused all previously saved practice history 
                  to become undecryptable. Users who upgraded lost their entire practice streak data with no way to recover it.
                </p>
                <div className="flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                  <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-zinc-300">
                    <span className="font-semibold text-emerald-400">Lesson:</span> Documented an Export → Re-import workflow in the release notes as an immediate fix, and planned an automatic 
                    migration script for future versions. Learned that &quot;data compatibility across versions must be a first-class design concern, not an afterthought.&quot;
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Retrospective 4 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-emerald-500/30"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-emerald-500 rounded-full" />
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-lg font-bold text-foreground">Taming Unpredictable AI Responses</h3>
                  <span className="text-xs text-zinc-500 ml-auto">Color Palette Generator</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  The Gemini API returned free-form text with wildly inconsistent formats — sometimes valid JSON, sometimes markdown, sometimes 
                  plain text with embedded HEX codes. A single parsing strategy could never handle all variants, and the app crashed frequently 
                  during demo scenarios.
                </p>
                <div className="flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                  <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-zinc-300">
                    <span className="font-semibold text-emerald-400">Lesson:</span> Built a multi-stage fallback pipeline (JSON parse → Regex HEX extraction → default colors) 
                    that gracefully degrades instead of crashing. Realized &quot;never trust external API output — always design for the worst-case response.&quot;
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Retrospective 5 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-amber-500/30"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-amber-500 rounded-full" />
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg font-bold text-foreground">The Main Thread Freeze Incident</h3>
                  <span className="text-xs text-zinc-500 ml-auto">SVG Converter</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  When a user uploaded a 4000×3000px photo, the single-pass pixel traversal blocked the main thread for over 8 seconds. 
                  The browser showed &quot;Page Unresponsive&quot; — a terrible UX for an app that promises client-side speed.
                </p>
                <div className="flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                  <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-zinc-300">
                    <span className="font-semibold text-emerald-400">Lesson:</span> Redesigned the algorithm into a 2-Pass Grid Sampling approach, reducing complexity from O(W×H) to a fraction. 
                    Combined with Luminance-based background removal and adjacent region merging, cut output SVG size by 60%+. 
                    &quot;Brute-force may work in dev, but always design for real-world input sizes.&quot;
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Retrospective 6 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-rose-500/30"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-rose-500 rounded-full" />
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-rose-500" />
                  <h3 className="text-lg font-bold text-foreground">Race Conditions in Clipboard Monitoring</h3>
                  <span className="text-xs text-zinc-500 ml-auto">Paste Guardian</span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  During testing, running two instances of Paste Guardian simultaneously caused corrupted clipboard history — both instances 
                  were writing to the same encrypted file without coordination, and polling at fixed 200ms intervals kept CPU usage constantly high.
                </p>
                <div className="flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                  <ChevronRight className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-zinc-300">
                    <span className="font-semibold text-emerald-400">Lesson:</span> Implemented OS-level named mutex for single-instance enforcement, Win32 OpenClipboard/CloseClipboard 
                    for atomic access, and adaptive polling (200ms active → 1000ms idle) to cut CPU usage. 
                    &quot;System-level apps demand system-level thinking — OS primitives exist for a reason.&quot;
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Future Direction */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l-2 border-primary/30"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full" />
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold text-foreground">Future Technical Direction</h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  Building on my experience creating both desktop security tools and web graphics,
                  I aim to expand my technical scope into the following areas.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { title: 'Testing & CI/CD', desc: 'Test automation with pytest/Vitest and building GitHub Actions pipelines' },
                    { title: 'WebGPU & Compute', desc: 'Next-gen browser parallel computation using WebGPU Compute Shaders' },
                    { title: 'Rust / WASM', desc: 'Native-level performance through Rust → WASM compilation for performance-critical modules' },
                  ].map((goal, i) => (
                    <div key={i} className="p-4 bg-zinc-800/60 rounded-xl border border-zinc-700/50">
                      <p className="text-sm font-semibold text-foreground mb-1">{goal.title}</p>
                      <p className="text-xs text-zinc-500">{goal.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
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
