import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio | Creative Developer',
  description: 'A creative developer portfolio showcasing projects in web development, 3D graphics, AI integration, desktop applications, and security tools.',
  keywords: ['developer', 'portfolio', 'Next.js', 'React', 'TypeScript', 'Three.js', 'Python', 'full-stack'],
  authors: [{ name: 'Jiwon Jae' }],
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
      </head>
      <body className="font-inter">{children}</body>
    </html>
  )
}
