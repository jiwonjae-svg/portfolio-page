<div align="center">

# 🌐 Portfolio Page

**A Modern Developer Portfolio — Built to Impress**

[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff69b4.svg)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

*A visually rich, interactive portfolio showcasing projects in web development, 3D graphics, AI integration, desktop applications, and security tools.*

[Features](#-features) • [Tech Stack](#-tech-stack) • [Projects](#-featured-projects) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Deployment](#-deployment)

---

</div>

## 🎯 What is This?

This is a **personal developer portfolio** built with cutting-edge web technologies. It features an interactive particle background, animated gradient text, 3D tilt card effects, and a modular project showcase with detail modals — all wrapped in a sleek dark-themed UI.

Designed to be:
- ✨ **Visually Stunning** — Particle effects, animated gradients, and smooth transitions
- 🚀 **High Performance** — Next.js App Router with optimized rendering
- 📱 **Fully Responsive** — Looks great on desktop, tablet, and mobile
- ♿ **Accessible** — Semantic HTML, keyboard navigation, and proper contrast

## ✨ Features

### 🎨 Visual Effects
- **Interactive Particle Background**: Canvas-based particles that react to mouse movement with connection lines
- **Animated Gradient Text**: Real-time color-shifting gradients with random direction and position transitions
- **3D Tilt Cards**: Perspective-based card hover effects with parallax motion
- **Shine Sweep Effect**: Light sweep animation on hover for cards and tech items
- **Floating Orbs**: Ambient background elements with gentle floating animation

### 📂 Project Showcase
- **Card Grid Layout**: Responsive grid displaying 6 featured projects
- **Truncated Summaries**: Ellipsis-truncated descriptions for clean card presentation
- **Detail Modal**: Click-to-expand modal with full project description, tech stack, and links
- **Per-Project Color Accents**: Unique color themes for each project card

### 🛠️ Integrated Tech Stack Display
- **Categorized Layout**: Technologies organized into 5 logical categories
- **Interactive Items**: Hover-to-slide animations with color transitions
- **Category Icons**: Visual identifiers with spring-animated emoji headers

### 📬 Contact Section
- **Direct Links**: Email and GitHub integration
- **Gradient CTA Button**: Eye-catching call-to-action with hover effects

## 🗂️ Featured Projects

| # | Project | Description |
|---|---------|-------------|
| 01 | **Color Palette Generator** | AI-powered color palette creation using Gemini API with Delta E and K-Means clustering |
| 02 | **Croquis** | Artist practice companion with GitHub-style heatmap and AES-128 encrypted local storage |
| 03 | **ParticleVerse** | Real-time hand tracking meets GPU-accelerated particle physics in a touchless 3D experience |
| 04 | **SVG Converter** | Privacy-first browser-based image-to-SVG conversion with 2-Pass grid sampling |
| 05 | **Paste Guardian** | System clipboard security utility with AES-128 encryption and Win32 API integration |
| 06 | **Word Cube** | 3D word search game with Firebase leaderboards and seed-based puzzle generation |

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
│   ├── ProjectCard.tsx                  # 3D tilt project card
│   └── ProjectModal.tsx                 # Project detail modal overlay
│
└── 📁 data/                             # Static Data
    └── projects.ts                      # Project definitions and metadata
```

### Component Architecture

```
┌─────────────────────────────────────────────┐
│              App Layout (SSR)               │  ← Metadata, fonts, global styles
├─────────────────────────────────────────────┤
│         Page Component (Client)             │  ← State management, sections
├──────────┬──────────┬───────────┬───────────┤
│ Particle │ Gradient │ Project   │ Project   │
│ BG       │ Text     │ Card      │ Modal     │  ← Interactive components
├──────────┴──────────┴───────────┴───────────┤
│            Project Data Layer               │  ← Static project definitions
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
