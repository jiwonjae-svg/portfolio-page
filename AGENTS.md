# AGENTS.md

## Project Goal

This repository is a personal software engineering portfolio for roles in Japan, with emphasis on full-stack development, mobile-adjacent product work, AI automation, and frontend performance.

Edits should make the portfolio easier for recruiters and hiring teams to evaluate quickly. Prioritize clear information architecture, evidence-backed project descriptions, responsive UI, accessibility, and accurate claims.

## Content Principles

- Write English first. Add selected Japanese copy only where it directly supports Japan readiness.
- Keep the tone professional, concise, and hiring-focused.
- Do not use exaggerated claims, vague hype, or inflated seniority language.
- Do not invent certifications, employment history, metrics, shipped-user counts, company names, awards, or language proficiency.
- Preserve all existing project links unless the user explicitly asks to change or remove them.
- Every skill claim should connect to concrete project evidence in `data/projects.ts` or visible project copy.
- Prefer specific implementation evidence over broad labels. Example: "MediaPipe hand tracking with GPU particle rendering" is stronger than "AI expert."
- Treat metrics as claims. Use only values already present in the project data or explicitly provided by the user.

## Japan Readiness Copy

Include a Japan-readiness section when improving portfolio structure or copy. Base it only on:

- Working holiday experience in Japan.
- Conversational Japanese ability.
- Interest in software engineering roles in Japan.

Allowed framing:

- "Japan-ready profile"
- "Working holiday experience in Japan"
- "Conversational Japanese"
- "Interested in contributing to engineering teams in Japan"
- Japanese support copy such as: `日本でのワーキングホリデー経験と日常会話レベルの日本語力を活かし、日本の開発チームで成長しながら貢献したいと考えています。`

Do not describe the owner as fluent, native-level, business-level, JLPT-certified, or professionally experienced in Japan unless the user explicitly provides that information.

## Information Architecture

Improve structure before visual redesign. Hiring readers should be able to answer these questions quickly:

- What roles is this portfolio targeting?
- Which projects prove full-stack, mobile/product, AI automation, and frontend performance skill?
- What was the technical challenge?
- What did the owner build personally?
- Where are the GitHub and live/release links?
- What is the Japan readiness signal?

Recommended page order:

1. Hiring-focused hero with target roles and concise value proposition.
2. Role-fit summary connecting skill areas to projects.
3. Featured projects with preserved links.
4. Technical evidence grouped by role theme.
5. Japan readiness.
6. Contact.

## Project Data Rules

- Treat `data/projects.ts` as the source of truth for project titles, descriptions, tech stacks, links, periods, screenshots, and metrics.
- Keep all existing `githubUrl`, `liveUrl`, image paths, and release links unless explicitly instructed otherwise.
- When adding or revising skills, update project evidence nearby so the claim can be traced to a project.
- Do not delete project records, screenshots, or assets unless the user explicitly asks.
- If existing copy contains unclear or over-broad claims, tighten it rather than removing useful evidence.

## UI And Accessibility

- Keep the UI responsive across mobile, tablet, and desktop.
- Use semantic HTML where practical and preserve keyboard access for interactive elements.
- Maintain readable contrast in both theme states.
- Respect reduced-motion preferences for heavy animation.
- Avoid visual changes that make hiring content harder to scan.
- Keep buttons, links, filters, modals, and forms accessible by keyboard and screen readers.
- Ensure counters render meaningful fallback values. They must not remain at animated `0` when JavaScript animation, viewport detection, or reduced-motion behavior prevents animation.

## Engineering Guidelines

- Prefer local patterns in `app/`, `components/`, `hooks/`, and `data/`.
- Keep changes scoped. Do not refactor unrelated files or rewrite styling systems without a direct reason.
- Use TypeScript types rather than untyped data shapes.
- Preserve Next.js App Router conventions.
- Preserve existing public assets under `public/` and source assets under `assets/`.
- Do not commit generated build output such as `.next/`.

## Verification

After code or content changes, run:

```bash
npm run lint
npm run build
```

Report any failures with the failing command and the relevant error summary. If a failure appears unrelated to the current change, say so clearly and do not hide it.
