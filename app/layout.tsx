import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio | Creative Developer',
  description: 'A creative developer portfolio showcasing projects in web development, 3D graphics, AI integration, desktop applications, and security tools.',
  keywords: ['developer', 'portfolio', 'Next.js', 'React', 'TypeScript', 'Three.js', 'Python', 'full-stack'],
  authors: [{ name: 'jiwonjae-svg' }],
  openGraph: {
    title: 'Portfolio | Creative Developer',
    description: 'Crafting digital experiences through code — from AI-powered tools to interactive 3D worlds.',
    type: 'website',
    locale: 'en_US',
  },
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
      </head>
      <body className="font-inter">{children}</body>
    </html>
  )
}
