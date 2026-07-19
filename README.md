# WONJIP CHOI - Ship Design & Manufacturing DX Portfolio

A hiring-focused portfolio connecting 4+ years of professional ship-design delivery with independent manufacturing DX, engineering-systems, full-stack, and QA evidence for roles in Japan.

[Live portfolio](https://jiwonjae-portfolio.vercel.app) · [GitHub profile](https://github.com/jiwonjae-svg)

## What recruiters can review

- A domain-first recruiter snapshot and role-specific review paths
- Japan relocation, visa, and practical communication context
- Four featured case studies: DrawingFlow, DocuMind, OpsFlow Command Center, and ParticleVerse
- Six supporting projects across browser tooling, desktop, mobile, security, AI utilities, and games
- Evidence separated into implemented, verified, and future scope
- Project screenshots, metrics, architecture notes, source links, and live demos
- Keyboard-accessible project dialogs, responsive navigation, and reduced-motion support
- Downloadable English and Japanese DX application documents

## Main technical evidence

| Project | Evidence shown in this portfolio |
| --- | --- |
| [DrawingFlow](https://github.com/jiwonjae-svg/drawing-revision-impact-tracker) | Ship-design revision control, downstream impact evidence, independent review, project-scoped RBAC, PostgreSQL audit immutability, CSV/PDM boundaries, notification outbox, and browser verification |
| [DocuMind](https://github.com/jiwonjae-svg/DocuMind) | TypeScript full-stack RAG workflow, Auth.js, PostgreSQL/pgvector, owner-scoped retrieval, citations, audit logs, agent-ready APIs, and 339 tests |
| [OpsFlow Command Center](https://opsflow-sable.vercel.app) | Local-first release review workspace, deterministic release gates, SLO signals, evidence notes, JSON audit packets, persistence, and Playwright E2E |
| [ParticleVerse](https://github.com/jiwonjae-svg/particle-verse) | Three.js, React Three Fiber, GLSL shaders, MediaPipe hand tracking, and GPU-oriented interaction work |

All ten project records and their claims live in [`data/projects.ts`](data/projects.ts). OpsFlow is implemented in this repository; DrawingFlow and the other featured systems link to their own source and deployments.

## Positioning

- **Domain-first:** ship-design experience, drawing analysis, construction coordination, schedule recovery, and delivery responsibility
- **DX-oriented:** drawing-change control, technical-document retrieval, workflow traceability, quality gates, and operational review
- **Evidence-backed:** architecture, tests, metrics, source, and live links distinguish implemented, verified, and future scope
- **Scope-explicit:** independent projects contain no employer drawings, customer information, or production data

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
app/                         Next.js routes, metadata, and portfolio sections
components/                  Recruiter UI, project cards/dialogs, and OpsFlow
data/projects.ts             Typed evidence and architecture for all projects
public/images/               Project screenshots
public/resume/               Downloadable DX application documents
tests/portfolio.spec.ts      Recruiter-path, accessibility, and layout checks
```

## Scope note

Portfolio case studies are independent implementations. They were not deployed at an employer and contain no employer drawings, customer information, vessel records, or production data.
