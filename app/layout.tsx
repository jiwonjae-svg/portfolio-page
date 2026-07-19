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
  title: 'WONJIP CHOI | Ship Design & Manufacturing DX Engineer',
  description:
    'Portfolio of WONJIP CHOI, a ship design engineer with 4+ years of professional experience combining shipbuilding-domain knowledge with manufacturing DX, technical-document retrieval, workflow automation, and software quality.',
  keywords: [
    'ship design', 'shipbuilding', 'manufacturing DX', 'engineering systems',
    'CAD PLM support', 'technical operations', 'workflow automation', 'Next.js',
    'TypeScript', 'PostgreSQL', 'RAG', 'pgvector', 'internal tools', 'QA automation',
    'audit logs', 'technical document retrieval', 'process improvement',
  ],
  authors: [{ name: 'WONJIP CHOI' }],
  metadataBase: new URL('https://jiwonjae-portfolio.vercel.app'),
  openGraph: {
    title: 'WONJIP CHOI | Ship Design & Manufacturing DX Engineer',
    description:
      '4+ years of ship design experience combined with independent manufacturing DX case studies in technical-document retrieval, workflow traceability, testing, and release review.',
    type: 'website',
    locale: 'en_US',
    url: 'https://jiwonjae-portfolio.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WONJIP CHOI | Ship Design & Manufacturing DX Engineer',
    description:
      'Ship design experience and independent manufacturing DX evidence across engineering workflows, technical documents, testing, and traceability.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'WONJIP CHOI',
  url: 'https://jiwonjae-portfolio.vercel.app',
  sameAs: ['https://github.com/jiwonjae-svg'],
  jobTitle: 'Ship Design & Manufacturing DX Engineer',
  knowsAbout: ['Ship design', 'Shipbuilding', 'Basic design', 'Detailed design', 'Construction workflow coordination', 'Manufacturing DX', 'Engineering systems', 'Next.js', 'TypeScript', 'PostgreSQL', 'RAG', 'QA automation', 'Audit logs'],
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
