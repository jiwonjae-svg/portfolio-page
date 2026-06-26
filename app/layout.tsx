import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import ScrollProgress from '@/components/ScrollProgress'
import MagneticCursor from '@/components/MagneticCursor'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jiwonjae | Full-Stack & Mobile Developer',
  description:
    'Portfolio of Jiwonjae — building AI-enabled workflow tools, release-safety dashboards, GPU shader experiences, encrypted desktop utilities, and cross-platform mobile apps with React Native, Next.js, TypeScript, Python, and Firebase.',
  keywords: [
    'developer', 'portfolio', 'Next.js', 'React', 'TypeScript', 'Three.js',
    'Python', 'React Native', 'Expo', 'Firebase', 'mobile', 'full-stack',
    'GLSL', 'shader', 'encryption', 'security', 'QA', 'SLO', 'audit logs',
  ],
  authors: [{ name: 'Jiwonjae-svg' }],
  metadataBase: new URL('https://jiwonjae-portfolio.vercel.app'),
  openGraph: {
    title: 'Jiwonjae | Full-Stack & Mobile Developer',
    description:
      'Projects spanning AI-enabled workflow systems, release safety, 3D graphics, system security, and cross-platform mobile.',
    type: 'website',
    locale: 'en_US',
    url: 'https://jiwonjae-portfolio.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jiwonjae | Full-Stack & Mobile Developer',
    description:
      'Projects spanning AI-enabled workflow systems, release safety, 3D graphics, system security, and mobile.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jiwonjae',
  url: 'https://jiwonjae-portfolio.vercel.app',
  sameAs: ['https://github.com/jiwonjae-svg'],
  jobTitle: 'Full-Stack & Mobile Developer',
  knowsAbout: ['React Native', 'Next.js', 'Three.js', 'Firebase', 'Python', 'TypeScript', 'QA automation', 'AI workflow systems'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
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
      <body className="font-inter">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ScrollProgress />
          <MagneticCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
