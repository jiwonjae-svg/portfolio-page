# WONJIP CHOI — Software Engineering Portfolio

A hiring-focused portfolio for TypeScript / Next.js full-stack, AI workflow, internal tooling, QA automation, and reliability-oriented roles in Japan.

[Live portfolio](https://jiwonjae-portfolio.vercel.app) · [GitHub profile](https://github.com/jiwonjae-svg)

## What recruiters can review

- A recruiter snapshot and role-specific review paths
- Japan relocation, visa, and practical communication context
- Four featured projects: DocuMind, OpsFlow Command Center, ParticleVerse, and SVG Converter
- Five supporting projects across desktop, mobile, security, AI utilities, and browser tooling
- Evidence separated into implemented, verified, and future scope
- Project screenshots, metrics, architecture notes, source links, and live demos where available
- Keyboard-accessible project dialogs, responsive navigation, and reduced-motion support
- A contact form backed by a Next.js route and Resend

## Main technical evidence

| Project | Evidence shown in this portfolio |
| --- | --- |
| [DocuMind](https://github.com/jiwonjae-svg/DocuMind) | TypeScript full-stack RAG workflow, Auth.js, PostgreSQL/pgvector, owner-scoped retrieval, citations, audit logs, agent-ready APIs, and automated tests |
| [OpsFlow Command Center](https://opsflow-sable.vercel.app) | Local-first release review workspace, deterministic release gates, SLO signals, evidence notes, JSON audit packets, persistence, and Playwright E2E |
| [ParticleVerse](https://github.com/jiwonjae-svg/particle-verse) | Three.js, React Three Fiber, GLSL shaders, MediaPipe hand tracking, and GPU-oriented interaction work |
| [SVG Converter](https://github.com/jiwonjae-svg/svg-converter) | Privacy-first browser conversion with the Canvas API, client-side validation, two-pass grid sampling, and SVG output optimization |

All nine project records and their claims live in [`data/projects.ts`](data/projects.ts). OpsFlow is implemented in this repository; its main component is [`components/OpsFlowCommandCenter.tsx`](components/OpsFlowCommandCenter.tsx).

## Stack

- Next.js 14 App Router, React 18, and TypeScript
- Tailwind CSS and Framer Motion
- Playwright for portfolio E2E coverage
- Resend for the contact endpoint
- Vercel for deployment

## Local development

Prerequisite: Node.js 20 and npm.

```bash
git clone https://github.com/jiwonjae-svg/portfolio-page.git
cd portfolio-page
npm ci
npm run dev
```

Open <http://localhost:3000>.

The portfolio renders without email credentials. To send messages through the contact form, add this to `.env.local`:

```bash
RESEND_API_KEY=your_resend_api_key
```

## Verification

```bash
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

The GitHub Actions workflow runs lint, a production build, and Chromium E2E tests for pull requests and pushes to `main`.

## Repository structure

```text
app/
  api/contact/route.ts       Contact API route
  page.tsx                   Hiring-focused portfolio page
components/
  ContactForm.tsx            Accessible contact form
  ProjectCard.tsx            Featured project summary
  ProjectModal.tsx           Detailed project evidence dialog
  OpsFlowCommandCenter.tsx   OpsFlow prototype source
data/projects.ts             Typed project records and evidence
tests/portfolio.spec.ts      Recruiter-path and accessibility E2E checks
```

## Scope and accuracy

This is a personal portfolio. Project descriptions distinguish personal implementation and verification from production team deployment, and they avoid claiming unverified performance or Lighthouse scores.

## License

[MIT](LICENSE)
