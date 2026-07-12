import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import ScrollProgress from '@/components/ScrollProgress'
import MagneticCursor from '@/components/MagneticCursor'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'WONJIP CHOI | TypeScript Full-Stack + AI Workflow Engineer',
  description:
    'Portfolio of WONJIP CHOI — Korea-based TypeScript and Next.js full-stack candidate focused on internal tools and AI workflow systems, with project evidence in PostgreSQL, testing, access control, and release review.',
  keywords: [
    'developer', 'portfolio', 'Next.js', 'React', 'TypeScript', 'Three.js',
    'Python', 'React Native', 'Expo', 'Firebase', 'full-stack', 'RAG',
    'pgvector', 'internal tools', 'workflow automation', 'GLSL', 'shader',
    'encryption', 'security', 'QA', 'SLO', 'audit logs', 'runbooks',
  ],
  authors: [{ name: 'WONJIP CHOI' }],
  metadataBase: new URL('https://jiwonjae-portfolio.vercel.app'),
  openGraph: {
    title: 'WONJIP CHOI | TypeScript Full-Stack + AI Workflow Engineer',
    description:
      'TypeScript and Next.js full-stack portfolio focused on internal tools, AI workflow systems, PostgreSQL, testing, access control, and production-minded project scope.',
    type: 'website',
    locale: 'en_US',
    url: 'https://jiwonjae-portfolio.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WONJIP CHOI | TypeScript Full-Stack + AI Workflow Engineer',
    description:
      'TypeScript and Next.js full-stack portfolio focused on internal tools, AI workflow systems, PostgreSQL, testing, access control, and production-minded project scope.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'WONJIP CHOI',
  url: 'https://jiwonjae-portfolio.vercel.app',
  sameAs: ['https://github.com/jiwonjae-svg'],
  jobTitle: 'TypeScript Full-Stack + AI Workflow Engineer',
  knowsAbout: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'pgvector', 'RAG', 'AI workflow systems', 'QA automation', 'release runbooks', 'Three.js', 'Python', 'Firebase'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Plausible Analytics — privacy-respecting, no cookies */}
        <script
          defer
          data-domain="jiwonjae-portfolio.vercel.app"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className={`${inter.variable} font-inter`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ScrollProgress />
          <MagneticCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
