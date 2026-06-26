import type { Metadata } from 'next';
import OpsFlowCommandCenter from '@/components/OpsFlowCommandCenter';

export const metadata: Metadata = {
  title: 'OpsFlow Command Center | Jiwonjae Portfolio',
  description:
    'A portfolio implementation of a release safety console for AI-enabled workflow systems, covering release gates, SLO checks, audit trails, rollback readiness, and owner-scoped policy tests.',
};

export default function OpsFlowCommandCenterPage() {
  return <OpsFlowCommandCenter />;
}
