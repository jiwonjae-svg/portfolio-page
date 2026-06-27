import type { Metadata } from 'next';
import OpsFlowCommandCenter from '@/components/OpsFlowCommandCenter';

export const metadata: Metadata = {
  title: 'OpsFlow Command Center | Release Safety Console',
  description:
    'A standalone release safety console for AI-enabled workflow systems, covering release gates, SLO checks, audit trails, rollback readiness, and owner-scoped policy tests.',
  keywords: [
    'OpsFlow',
    'release safety',
    'AI workflow reliability',
    'SLO',
    'audit trail',
    'release gates',
    'owner-scoped access',
    'rollback readiness',
  ],
  openGraph: {
    title: 'OpsFlow Command Center | Release Safety Console',
    description:
      'Standalone release safety console for AI-enabled workflow systems with release gates, SLO checks, audit trails, rollback readiness, and owner-scoped policy tests.',
    type: 'website',
    url: 'https://jiwonjae-portfolio.vercel.app/opsflow',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpsFlow Command Center | Release Safety Console',
    description:
      'Standalone release safety console for AI-enabled workflow systems with explicit release gates, SLO checks, and audit trails.',
  },
};

export default function OpsFlowPage() {
  return <OpsFlowCommandCenter />;
}
