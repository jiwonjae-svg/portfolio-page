'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Code2,
  Database,
  Github,
  Globe2,
  Mail,
  Menu,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from 'lucide-react';

const navItems = [
  { label: 'Evidence', href: '#recruiter-snapshot' },
  { label: 'Projects', href: '#featured-projects' },
  { label: 'Japan', href: '#japan-readiness' },
  { label: 'Contact', href: '#contact' },
];

const heroWords = [
  ['TypeScript', 'full-stack'],
  ['systems', 'with', 'proof.'],
];

const revealContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const revealItem: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: 'blur(14px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function GalaxyFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#020207]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(34,211,238,0.24),transparent_28%),radial-gradient(circle_at_72%_18%,rgba(163,230,53,0.16),transparent_24%),linear-gradient(135deg,#020207_0%,#07111f_42%,#020207_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px]" />
    </div>
  );
}

function HeroBackground() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <GalaxyFallback />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(to right, rgba(0, 0, 0, 0.88), transparent 34%, transparent 68%, rgba(0, 0, 0, 0.8)),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.28), transparent 42%, rgba(0, 0, 0, 0.96)),
            radial-gradient(circle at 16% 50%, rgba(34, 211, 238, 0.14), transparent 38%)
          `,
        }}
      />
    </div>
  );
}

const candidateFacts = [
  {
    label: 'Target role',
    value: 'TypeScript / Next.js full-stack · internal tools & AI workflow',
  },
  {
    label: 'Career stage',
    value: 'Software career transition · 4+ years professional engineering experience',
  },
  { label: 'Current location', value: 'Korea-based' },
  { label: 'Relocation', value: 'Japan after visa process · remote start possible' },
  { label: 'Visa', value: 'Work visa sponsorship required' },
  {
    label: 'Interview language',
    value: 'English preferred · basic Japanese introduction and Q&A available',
  },
] as const;

function CandidateFacts() {
  return (
    <dl
      data-testid="candidate-facts"
      className="mt-4 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 backdrop-blur-md sm:grid-cols-3"
    >
      {candidateFacts.map((fact) => (
        <div key={fact.label} className="min-w-0 bg-black/65 px-3 py-2">
          <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-200">
            {fact.label}
          </dt>
          <dd className="mt-1 text-[11px] leading-4 text-slate-200">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-30 border-b border-white/10 bg-[#05070b]/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <a href="#" className="group flex items-center gap-3" aria-label="Back to top">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/30 bg-white/5 text-cyan-200 transition-colors group-hover:border-cyan-200">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-slate-200">
            WONJIP CHOI
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <a
            href="https://github.com/jiwonjae-svg"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 bg-black/30 p-2 text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition-colors hover:bg-cyan-300/15"
          >
            <Mail className="h-4 w-4" />
            Contact
          </a>
        </div>

        <button
          type="button"
          className="rounded-full border border-white/10 bg-black/30 p-2 text-white lg:hidden"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden border-t border-white/10 bg-[#05070b]/85 backdrop-blur-xl transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto grid max-w-7xl gap-2 px-4 py-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function HeroContent() {
  return (
    <motion.div
      className="max-w-4xl px-4 pt-14 text-left text-white md:px-6 lg:pt-10"
      initial="hidden"
      animate="visible"
      variants={revealContainer}
    >
      <motion.div className="mb-4 hidden flex-wrap items-center gap-2 sm:flex" variants={revealContainer}>
        {['TypeScript', 'Next.js', 'Internal tools', 'AI workflow'].map((tag) => (
          <motion.span
            key={tag}
            className="rounded-full border border-white/10 bg-black/35 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-300 backdrop-blur-md"
            variants={fadeInUp}
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>

      <motion.h1
        className="max-w-4xl py-1 text-4xl font-black leading-[1.08] tracking-normal text-white sm:text-6xl md:text-6xl xl:text-7xl 2xl:text-8xl"
        aria-label="TypeScript full-stack systems with proof."
        variants={revealContainer}
      >
        {heroWords.map((line, lineIndex) => (
          <span
            key={line.join('-')}
            className={lineIndex === 1 ? 'block text-cyan-200' : 'block'}
            aria-hidden="true"
          >
            {line.map((word, wordIndex) => (
              <React.Fragment key={word}>
                <motion.span className="inline-block align-baseline" variants={revealItem}>
                  {word}
                </motion.span>
                {wordIndex < line.length - 1 ? ' ' : null}
              </React.Fragment>
            ))}
          </span>
        ))}
      </motion.h1>

      <motion.p
        className="mt-4 max-w-2xl text-base leading-6 text-slate-300 md:leading-7"
        variants={fadeInUp}
      >
        Korea-based candidate focused on TypeScript and Next.js full-stack development for internal
        tools and AI-enabled workflows. The strongest evidence is project-based implementation with
        PostgreSQL, access control, automated testing, release gates, and documented operational scope.
      </motion.p>

      <motion.div variants={fadeInUp}>
        <CandidateFacts />
      </motion.div>

      <motion.div className="mt-4 flex flex-col gap-3 sm:flex-row" variants={fadeInUp}>
        <motion.a
          href="#featured-projects"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-200/40 bg-cyan-200 px-6 py-3 text-sm font-bold text-[#03111c] transition-colors hover:bg-white"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          View hiring evidence
          <ArrowDown className="h-4 w-4" />
        </motion.a>
        <motion.a
          href="#recruiter-snapshot"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-black/45 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Start review path
          <ArrowRight className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

function CandidatePreviewPanel() {
  const proofItems = [
    { label: 'DocuMind', value: 'RAG + citations', icon: Database },
    { label: 'OpsFlow', value: 'release gates', icon: ShieldCheck },
    { label: 'Career context', value: '4+ yrs engineering', icon: Code2 },
    { label: 'Japan signal', value: 'visa support required', icon: Globe2 },
  ];

  return (
    <div className="mx-4 w-full max-w-md rounded-xl border border-cyan-200/20 bg-[#05070b]/62 p-4 text-white shadow-2xl shadow-cyan-950/30 backdrop-blur-xl md:mx-6">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-cyan-200" />
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Candidate Console
          </p>
        </div>
        <span className="font-mono text-[11px] text-lime-200">v2026.07</span>
      </div>

      <pre className="overflow-hidden rounded-lg border border-white/10 bg-black/60 p-4 text-[11px] leading-5 text-slate-300">
        <code>{`const candidate = {
  role: 'TS / Next.js full-stack',
  focus: ['internal tools', 'AI workflow'],
  stack: ['Next.js', 'PostgreSQL'],
  proof: ['tests', 'audit logs', 'release gates'],
  career: 'transitioning from 4+ yrs engineering',
  japan: 'relocation + visa sponsorship required'
};`}</code>
      </pre>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {proofItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <Icon className="mb-2 h-4 w-4 text-cyan-200" />
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-200">{item.label}</p>
              <p className="mt-1 text-xs text-slate-300">{item.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EvidenceScreenshot({ screenshotRef }: { screenshotRef: React.RefObject<HTMLDivElement> }) {
  return (
    <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-4 md:-mt-12 md:px-6">
      <div
        ref={screenshotRef}
        className="overflow-hidden rounded-xl border border-white/10 bg-[#07111f]/95 shadow-2xl shadow-black/50"
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-black/35 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-lime-300" />
          <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
            Hiring evidence preview
          </span>
        </div>

        <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-200">Review path</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
              Start with DocuMind and OpsFlow, then inspect browser performance work.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              The portfolio keeps the strongest hiring evidence above the fold: TypeScript/Next.js
              workflow systems, PostgreSQL, tests, release gates, and Japan readiness. WebGL remains
              supporting evidence.
            </p>
          </div>

          <div className="grid gap-3 p-6 sm:grid-cols-2">
            {[
              ['AI workflow', 'RAG search, citations, audit logs'],
              ['QA automation', '55 DocuMind test files / 339 tests'],
              ['Career context', '4+ years professional ship-design engineering'],
              ['Japan signal', 'Working holiday, conversational Japanese, visa support required'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime-200">{label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function GalaxyInteractiveHeroSection() {
  const screenshotRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;

        if (screenshotRef.current) {
          screenshotRef.current.style.transform = `translateY(-${Math.min(scrollPosition * 0.18, 96)}px)`;
        }

        if (heroContentRef.current) {
          const opacity = 1 - Math.min(scrollPosition / 520, 0.82);
          heroContentRef.current.style.opacity = opacity.toString();
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-black">
      <Navbar />

      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <HeroBackground />
        </div>

        <div
          ref={heroContentRef}
          className="pointer-events-none absolute inset-0 z-10 flex items-center"
        >
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_440px]">
            <div className="pointer-events-auto">
              <HeroContent />
            </div>
            <div className="pointer-events-auto hidden justify-end lg:flex">
              <CandidatePreviewPanel />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-black pb-16">
        <EvidenceScreenshot screenshotRef={screenshotRef} />
      </div>
    </div>
  );
}
