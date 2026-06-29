'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Globe, Layers, Package, BookOpen, Mail, ChevronRight, Menu, X, Clock, Target, CheckCircle2, ShieldCheck } from 'lucide-react';

const tocItems = [
  { href: '#recruiter-snapshot', label: 'Snapshot', icon: <CheckCircle2 className="w-4 h-4" /> },
  { href: '#target-roles', label: 'Target Roles', icon: <Target className="w-4 h-4" /> },
  { href: '#japan-readiness', label: 'Japan Readiness', icon: <Globe className="w-4 h-4" /> },
  { href: '#featured-projects', label: 'Featured Projects', icon: <Code2 className="w-4 h-4" /> },
  { href: '#more-projects', label: 'More Projects', icon: <Package className="w-4 h-4" /> },
  { href: '#testing-evidence', label: 'Testing Evidence', icon: <ShieldCheck className="w-4 h-4" /> },
  { href: '#technical-strengths', label: 'Technical Strengths', icon: <Layers className="w-4 h-4" /> },
  { href: '#case-studies', label: 'Case Studies', icon: <BookOpen className="w-4 h-4" /> },
  { href: '#timeline', label: 'Timeline', icon: <Clock className="w-4 h-4" /> },
  { href: '#contact', label: "Let's Work Together", icon: <Mail className="w-4 h-4" /> },
];

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasUsed, setHasUsed] = useState(false);

  useEffect(() => {
    const sectionIds = tocItems.map((item) => item.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-20% 0px -60% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    // Track hero section to show/hide desktop sidebar
    const heroObserver = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    const heroEl = document.querySelector('section');
    if (heroEl) heroObserver.observe(heroEl);

    return () => {
      observers.forEach((o) => o.disconnect());
      heroObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* ===== Desktop sticky sidebar ===== */}
      <AnimatePresence>
        {pastHero && (
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-1 group/sidebar"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-md dark:shadow-none p-2 transition-all duration-300 w-12 group-hover/sidebar:w-52 overflow-hidden">
              {/* Pulsing hint border — appears when nav first shows, fades on hover or after first use */}
              <motion.div
                key={pastHero ? 'on' : 'off'}
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ boxShadow: '0 0 0 4px #6366f1' }}
                animate={(isHovered || hasUsed) ? { opacity: 0 } : { opacity: [0, 1, 0] }}
                transition={
                  (isHovered || hasUsed)
                    ? { duration: 0.4 }
                    : { duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }
                }
              />
              {tocItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setHasUsed(true)}
                    className={`flex items-center gap-3 px-2 py-2 rounded-xl transition-all whitespace-nowrap ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-zinc-500 dark:text-zinc-500 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    <span className="text-xs font-medium opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300">
                      {item.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ===== Mobile inline TOC (collapsible) ===== */}
      <section className="py-12 px-4 bg-zinc-100/80 dark:bg-zinc-950/50 lg:hidden">
        <div className="max-w-3xl mx-auto">
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/90 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm dark:shadow-none overflow-hidden"
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-between p-4 text-sm font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider"
            >
              <span>Table of Contents</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </motion.span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {tocItems.map((item, i) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-primary hover:bg-primary/5 transition-all group"
                      >
                        <span className="text-zinc-500 dark:text-zinc-600 group-hover:text-primary transition-colors">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        </div>
      </section>
    </>
  );
}
