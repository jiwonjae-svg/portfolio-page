<div align="center">

# 🌐 Portfolio Page

**AI-Enabled Full-Stack Portfolio for Japan IT Roles**

[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff69b4.svg)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

*A hiring-focused portfolio centered on RAG internal knowledge search, release-review workflows, WebGL performance, browser tooling, secure local utilities, and Japan-ready communication context.*

[Features](#-features) • [Tech Stack](#-tech-stack) • [Projects](#-featured-projects) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Deployment](#-deployment)

---

</div>

## 🎯 What is This?

This is a **personal software engineering portfolio** built to help recruiters quickly evaluate fit for AI-enabled full-stack, internal tooling, workflow automation, frontend/WebGL, and reliability-oriented roles in Japan.

Designed to be:
- **Hiring-Focused** — DocuMind and OpsFlow are surfaced first as the strongest role-fit evidence
- **Evidence-Backed** — Project claims connect to concrete architecture, tests, metrics, and live links
- **Responsive** — Recruiters can scan the page on desktop, tablet, and mobile
- **Japan-Ready** — Includes working holiday experience and conversational Japanese context without overstating language level

## ✨ Features

### 🎨 Visual Effects
- **Interactive Particle Background**: Canvas-based particles that react to mouse movement with connection lines
- **Animated Gradient Text**: Real-time color-shifting gradients with random direction and position transitions
- **3D Tilt Cards**: Perspective-based card hover effects with parallax motion
- **Shine Sweep Effect**: Light sweep animation on hover for cards and tech items
- **Floating Orbs**: Ambient background elements with gentle floating animation

### 📂 Project Showcase
- **Card Grid Layout**: Responsive grid displaying 6 featured projects
- **Category-Colored Tech Tags**: Tech stack items color-coded by category (language, framework, library, tool, API, infrastructure)
- **Metrics Preview**: Key project metrics displayed on each card
- **Deep-Dive Modal**: 3-tab system (Overview / Technical Challenge / System Architecture) with full project details
- **Truncated Summaries**: Ellipsis-truncated descriptions for clean card presentation

### 🛠️ Integrated Tech Stack Display
- **5 Categories**: Languages & Core, Frontend & UI, 3D Graphics & AI, Security & System, Infrastructure & DevOps
- **Detailed Descriptions**: Each technology includes real-world usage context
- **Interactive Items**: Hover-to-slide animations with color transitions
- **Category Icons**: Visual identifiers with spring-animated emoji headers

### 📊 Proof of Quality
- **Testing Evidence**: DocuMind Vitest coverage, OpsFlow Playwright E2E, lint/build/audit checks
- **Security Signals**: Owner-scoped retrieval, audit logs, encrypted local storage, XSS/CSRF-oriented validation
- **Performance Signals**: GPU shaders, Canvas processing, algorithmic complexity reduction, adaptive polling
- **Deployment Evidence**: Live Vercel services and production verification where applicable

### 📝 Experience & Retrospective
- **Timeline Layout**: Chronological retrospectives with color-coded borders
- **Lessons Learned**: Security architecture redesign, CPU vs GPU parallel processing
- **Future Direction**: Testing & CI/CD, WebGPU, Rust/WASM goals

### 📬 Contact Section
- **Direct Links**: Email and GitHub integration
- **Gradient CTA Button**: Eye-catching call-to-action with hover effects

## 🗂️ Featured Projects

| # | Project | Description |
|---|---------|-------------|
| 01 | **DocuMind** | RAG-based internal knowledge search with Auth.js, PostgreSQL/pgvector, owner-scoped retrieval, source-cited answers, audit logs, and agent-ready APIs |
| 02 | **OpsFlow Command Center** | Local-first release review workspace with deployment gates, operational metrics, JSON audit packets, and Playwright-verified review flow |
| 03 | **ParticleVerse** | Real-time hand tracking meets GPU-accelerated particle physics in a touchless WebGL experience |
| 04 | **SVG Converter** | Privacy-first browser image-to-SVG conversion with Canvas API, 2-pass grid sampling, and client-side validation |
| 05 | **Paste Guardian** | Clipboard security utility with encrypted local storage, singleton control, adaptive polling, and Win32 API integration |
| 06 | **DailyGlow** | React Native product in testing with Firebase, multilingual quote data, offline/online data flow, and mobile learning modes |

## 🔧 Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | Next.js 14 (App Router) | Server-side rendering, routing, and optimization |
| **UI Library** | React 18 | Component-based user interface |
| **Language** | TypeScript 5 | Type-safe development |
| **Styling** | Tailwind CSS 3.4 | Utility-first responsive design |
| **Animation** | Framer Motion 11 | Declarative animations and gestures |
| **Icons** | Lucide React | Consistent, customizable icon set |
| **Deployment** | Vercel | Optimized hosting with edge functions |

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.17 or higher
- **npm**, **yarn**, or **pnpm**

### Quick Start

```bash
# Clone the repository
git clone https://github.com/jiwonjae-svg/portfolio-page.git
cd portfolio-page

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

## 🏗️ Architecture

```
Portfolio-Page/
│
├── 📄 package.json                      # Dependencies and scripts
├── 📄 tailwind.config.ts                # Tailwind CSS configuration
├── 📄 tsconfig.json                     # TypeScript configuration
├── 📄 next.config.mjs                   # Next.js configuration
│
├── 📁 app/                              # Next.js App Router
│   ├── layout.tsx                       # Root layout with metadata
│   ├── page.tsx                         # Main page component
│   └── globals.css                      # Global styles and animations
│
├── 📁 components/                       # Reusable UI Components
│   ├── AnimatedGradientText.tsx         # Real-time animated gradient text
│   ├── ParticleBackground.tsx           # Canvas-based particle system
│   ├── ProjectCard.tsx                  # 3D tilt project card with category tags
│   └── ProjectModal.tsx                 # 3-tab deep-dive modal (Overview/Challenge/Architecture)
│
└── 📁 data/                             # Static Data
    └── projects.ts                      # Project definitions with TechDetail[], challenges, metrics
```

### Component Architecture

```
┌─────────────────────────────────────────────┐
│              App Layout (SSR)               │  ← Metadata, fonts, global styles
├─────────────────────────────────────────────┤
│         Page Component (Client)             │  ← State, 6 sections
│  Hero │ Projects │ Tech Stack │ Performance │
│       │          │ Experience │ Contact     │
├──────────┬──────────┬───────────┬───────────┤
│ Particle │ Gradient │ Project   │ Project   │
│ BG       │ Text     │ Card      │ Modal     │  ← Interactive components
│          │          │ (3D tilt) │ (3-tab)   │
├──────────┴──────────┴───────────┴───────────┤
│      Project Data Layer (TechDetail[])      │  ← Typed project definitions
└─────────────────────────────────────────────┘
```

### Key Design Decisions

- **Client Components**: Interactive features use `'use client'` for browser APIs (Canvas, requestAnimationFrame)
- **Animation Performance**: Framer Motion for declarative animations with automatic GPU acceleration
- **Type Safety**: Full TypeScript with strict typing for props and data models
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints (`md:`, `lg:`)

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect the GitHub repository directly on [vercel.com](https://vercel.com) for automatic deployments.

### Static Export

```bash
# Build static export
npm run build

# Output in .next/ directory
```

## ⚡ Performance

- **Lighthouse Score**: 95+ across all categories
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: Optimized with Next.js automatic code splitting

### Optimizations
- Dynamic imports for heavy components
- Canvas particle system with efficient rendering loop
- CSS-based animations where possible (reduces JS overhead)
- Font preloading for Inter typeface
- Image-free design (SVG noise texture, CSS gradients)

## 📜 License

This project is licensed under the **MIT License** — free for personal, educational, and commercial use with attribution.

## 🙏 Acknowledgments

Built with these amazing open-source projects:
- [Next.js](https://nextjs.org/) — The React framework for production
- [Framer Motion](https://www.framer.com/motion/) — Production-ready animations
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [Lucide](https://lucide.dev/) — Beautiful, consistent icons

---

<div align="center">

**Portfolio Page** — Code Meets Creativity 🎨

Made with ❤️ by jiwonjae-svg

[⬆ Back to Top](#-portfolio-page)

</div>
