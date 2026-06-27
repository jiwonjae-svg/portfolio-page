'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Database,
  FileCheck2,
  GitBranch,
  KeyRound,
  LockKeyhole,
  Network,
  RefreshCcw,
  ShieldCheck,
  TimerReset,
  Workflow,
  XCircle,
} from 'lucide-react';

type GateState = 'pass' | 'warn' | 'fail';

interface Gate {
  label: string;
  state: GateState;
  note: string;
}

interface ServiceNode {
  name: string;
  role: string;
  status: GateState;
  metric: string;
}

interface AuditEvent {
  actor: string;
  action: string;
  target: string;
  result: GateState;
  time: string;
}

interface PolicyCheck {
  label: string;
  threshold: string;
  current: string;
  state: GateState;
}

interface RunbookStep {
  title: string;
  owner: string;
  action: string;
  eta: string;
  state: GateState;
}

interface Scenario {
  id: string;
  label: string;
  owner: string;
  incident: string;
  risk: GateState;
  decisionReason: string;
  nextAction: string;
  reviewSummary: string;
  p95: number;
  errorBudget: number;
  queueDepth: number;
  citationCoverage: number;
  policies: PolicyCheck[];
  gates: Gate[];
  services: ServiceNode[];
  audit: AuditEvent[];
  runbook: RunbookStep[];
}

const scenarios: Scenario[] = [
  {
    id: 'steady',
    label: 'Steady release',
    owner: 'Platform QA',
    incident: 'No active incident',
    risk: 'pass',
    decisionReason: 'All blocking gates pass, citation coverage is above floor, and rollback readiness is already verified.',
    nextAction: 'Ship with standard monitoring and attach the gate snapshot to the release record.',
    reviewSummary: 'Ready to release. Keep the normal post-deploy watch window and sample source citations after rollout.',
    p95: 420,
    errorBudget: 86,
    queueDepth: 18,
    citationCoverage: 97,
    policies: [
      { label: 'Blocking gates', threshold: '0 fail', current: '0 fail', state: 'pass' },
      { label: 'Manual review', threshold: '<= 1 warning', current: '0 warnings', state: 'pass' },
      { label: 'Citation floor', threshold: '>= 95%', current: '97%', state: 'pass' },
      { label: 'Rollback readiness', threshold: 'available', current: 'verified', state: 'pass' },
    ],
    gates: [
      { label: 'API contract', state: 'pass', note: 'No breaking schema changes' },
      { label: 'Owner scope', state: 'pass', note: 'All retrieval queries include owner filters' },
      { label: 'Citation coverage', state: 'pass', note: 'Grounded answers above release threshold' },
      { label: 'Rollback plan', state: 'pass', note: 'Previous image and migration path available' },
    ],
    services: [
      { name: 'Next.js UI', role: 'Operator console', status: 'pass', metric: 'LCP 1.8s' },
      { name: 'Workflow API', role: 'Release orchestration', status: 'pass', metric: 'p95 420ms' },
      { name: 'PostgreSQL', role: 'Audit and state store', status: 'pass', metric: '18 queued' },
      { name: 'Vector Search', role: 'Grounded retrieval', status: 'pass', metric: '97% cited' },
    ],
    audit: [
      { actor: 'qa.lead', action: 'approved gate', target: 'API contract', result: 'pass', time: '09:12' },
      { actor: 'release.bot', action: 'checked policy', target: 'owner scope', result: 'pass', time: '09:13' },
      { actor: 'oncall', action: 'verified rollback', target: 'deploy-42', result: 'pass', time: '09:16' },
    ],
    runbook: [
      { title: 'Pre-release approval', owner: 'Platform QA', action: 'Attach gate snapshot and audit checksum to deploy note.', eta: 'Before deploy', state: 'pass' },
      { title: 'Post-release watch', owner: 'On-call', action: 'Watch p95 latency, queue depth, and citation coverage for regressions.', eta: '30 min', state: 'pass' },
      { title: 'Citation sample', owner: 'Release bot', action: 'Sample grounded answers and store source coverage evidence.', eta: 'After deploy', state: 'pass' },
    ],
  },
  {
    id: 'latency',
    label: 'Retrieval latency',
    owner: 'Search API',
    incident: 'Vector search latency above SLO',
    risk: 'warn',
    decisionReason: 'Authorization and API contract checks pass, but retrieval latency and queue pressure require a manual soak decision.',
    nextAction: 'Hold automatic rollout, review vector index behavior, drain the queue, then rerun the release review.',
    reviewSummary: 'Manual review required. Release can proceed only after latency returns under the SLO threshold or rollback ownership is explicitly accepted.',
    p95: 1240,
    errorBudget: 58,
    queueDepth: 74,
    citationCoverage: 93,
    policies: [
      { label: 'Blocking gates', threshold: '0 fail', current: '0 fail', state: 'pass' },
      { label: 'Latency SLO', threshold: '<= 800ms p95', current: '1240ms', state: 'warn' },
      { label: 'Citation floor', threshold: '>= 95%', current: '93%', state: 'warn' },
      { label: 'Rollback readiness', threshold: 'available', current: 'verified', state: 'pass' },
    ],
    gates: [
      { label: 'API contract', state: 'pass', note: 'Schema remains compatible' },
      { label: 'Owner scope', state: 'pass', note: 'No authorization regression detected' },
      { label: 'Citation coverage', state: 'warn', note: 'Coverage is acceptable but trending down' },
      { label: 'Rollback plan', state: 'pass', note: 'Safe rollback available' },
    ],
    services: [
      { name: 'Next.js UI', role: 'Operator console', status: 'pass', metric: 'LCP 2.1s' },
      { name: 'Workflow API', role: 'Release orchestration', status: 'warn', metric: 'p95 1240ms' },
      { name: 'PostgreSQL', role: 'Audit and state store', status: 'warn', metric: '74 queued' },
      { name: 'Vector Search', role: 'Grounded retrieval', status: 'warn', metric: '93% cited' },
    ],
    audit: [
      { actor: 'release.bot', action: 'flagged SLO', target: 'vector search', result: 'warn', time: '11:03' },
      { actor: 'qa.lead', action: 'required soak', target: 'deploy-43', result: 'warn', time: '11:06' },
      { actor: 'backend', action: 'added index review', target: 'chunk embeddings', result: 'pass', time: '11:12' },
    ],
    runbook: [
      { title: 'Index review', owner: 'Backend', action: 'Compare query plan and embedding index behavior against the previous deploy.', eta: '20 min', state: 'warn' },
      { title: 'Queue drain', owner: 'Search API', action: 'Throttle ingestion and wait until queue depth returns below 40.', eta: '30 min', state: 'warn' },
      { title: 'Soak decision', owner: 'QA lead', action: 'Approve manual rollout only if p95 latency stabilizes below threshold.', eta: 'After drain', state: 'warn' },
    ],
  },
  {
    id: 'policy',
    label: 'Policy regression',
    owner: 'Auth boundary',
    incident: 'Owner-scoped access test failed',
    risk: 'fail',
    decisionReason: 'A cross-owner fixture returned forbidden data, so privacy boundary risk blocks the release regardless of healthy latency.',
    nextAction: 'Freeze deploy, patch the Prisma query guard, rerun cross-owner fixtures, and verify rollback migration safety.',
    reviewSummary: 'Release blocked. No override path is allowed because owner-scoped data isolation is a hard release gate.',
    p95: 510,
    errorBudget: 41,
    queueDepth: 33,
    citationCoverage: 96,
    policies: [
      { label: 'Blocking gates', threshold: '0 fail', current: '1 fail', state: 'fail' },
      { label: 'Owner isolation', threshold: '100% pass', current: 'failed fixture', state: 'fail' },
      { label: 'Rollback readiness', threshold: 'verified', current: 'migration check', state: 'warn' },
      { label: 'Audit capture', threshold: 'required', current: 'captured', state: 'pass' },
    ],
    gates: [
      { label: 'API contract', state: 'pass', note: 'No schema incompatibility' },
      { label: 'Owner scope', state: 'fail', note: 'Cross-owner fixture returned one forbidden row' },
      { label: 'Citation coverage', state: 'pass', note: 'Answers remain grounded' },
      { label: 'Rollback plan', state: 'warn', note: 'Rollback requires migration verification' },
    ],
    services: [
      { name: 'Next.js UI', role: 'Operator console', status: 'pass', metric: 'LCP 1.9s' },
      { name: 'Workflow API', role: 'Release orchestration', status: 'fail', metric: '1 blocked gate' },
      { name: 'PostgreSQL', role: 'Audit and state store', status: 'warn', metric: '33 queued' },
      { name: 'Vector Search', role: 'Grounded retrieval', status: 'pass', metric: '96% cited' },
    ],
    audit: [
      { actor: 'policy.test', action: 'blocked release', target: 'owner scope', result: 'fail', time: '14:21' },
      { actor: 'backend', action: 'opened fix', target: 'Prisma query guard', result: 'warn', time: '14:27' },
      { actor: 'qa.lead', action: 'froze deploy', target: 'deploy-44', result: 'fail', time: '14:30' },
    ],
    runbook: [
      { title: 'Freeze deploy', owner: 'QA lead', action: 'Block release and notify owner of the access boundary regression.', eta: 'Immediate', state: 'fail' },
      { title: 'Patch guard', owner: 'Backend', action: 'Apply owner filter at query boundary and add a regression fixture.', eta: 'Same day', state: 'warn' },
      { title: 'Rerun policy suite', owner: 'Policy test', action: 'Rerun cross-owner retrieval, audit event, and rollback migration checks.', eta: 'After fix', state: 'warn' },
    ],
  },
];

const stateStyles: Record<GateState, { text: string; bg: string; border: string; icon: JSX.Element; label: string }> = {
  pass: {
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    icon: <CheckCircle2 className="h-4 w-4" />,
    label: 'Pass',
  },
  warn: {
    text: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    icon: <AlertTriangle className="h-4 w-4" />,
    label: 'Warn',
  },
  fail: {
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    icon: <XCircle className="h-4 w-4" />,
    label: 'Block',
  },
};

function StatusPill({ state }: { state: GateState }) {
  const style = stateStyles[state];
  return (
    <span
      aria-label={`Status: ${style.label}`}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${style.bg} ${style.border} ${style.text}`}
    >
      {style.icon}
      {style.label}
    </span>
  );
}

function MetricBar({ label, value, suffix, state }: { label: string; value: number; suffix: string; state: GateState }) {
  const style = stateStyles[state];
  return (
    <div aria-label={`${label}: ${value}${suffix}`}>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="text-zinc-500 dark:text-zinc-400">{label}</span>
        <span className={`font-semibold ${style.text}`}>
          {value}
          {suffix}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className={`h-full rounded-full ${state === 'pass' ? 'bg-emerald-500' : state === 'warn' ? 'bg-amber-500' : 'bg-rose-500'}`}
          style={{ width: `${Math.max(8, Math.min(value, 100))}%` }}
        />
      </div>
    </div>
  );
}

export default function OpsFlowCommandCenter() {
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const [reviewRunsByScenario, setReviewRunsByScenario] = useState<Record<string, number>>({});
  const scenario = useMemo(() => scenarios.find((item) => item.id === scenarioId) ?? scenarios[0], [scenarioId]);
  const blockedGates = scenario.gates.filter((gate) => gate.state === 'fail').length;
  const warningGates = scenario.gates.filter((gate) => gate.state === 'warn').length;
  const releaseDecision = blockedGates > 0 ? 'Release blocked' : warningGates > 0 ? 'Manual review required' : 'Ready for release';
  const reviewCount = reviewRunsByScenario[scenario.id] ?? 0;
  const reviewLabel = reviewCount > 0 ? `Review #${String(reviewCount).padStart(2, '0')}` : 'No review run yet';
  const reviewedScenarioCount = scenarios.filter((item) => (reviewRunsByScenario[item.id] ?? 0) > 0).length;
  const totalReviewRuns = scenarios.reduce((total, item) => total + (reviewRunsByScenario[item.id] ?? 0), 0);
  const ownerScopeGate = scenario.gates.find((gate) => gate.label === 'Owner scope');
  const rollbackGate = scenario.gates.find((gate) => gate.label === 'Rollback plan');
  const securityChecks: Array<{ label: string; state: GateState; evidence: string }> = [
    {
      label: 'Static rendering boundary',
      state: 'pass',
      evidence: 'Scenario data is local, typed, and rendered as React text. This route accepts no user-provided content.',
    },
    {
      label: 'Raw HTML injection',
      state: 'pass',
      evidence: 'OpsFlow does not use raw HTML injection; audit, policy, and runbook values remain escaped by React.',
    },
    {
      label: 'Owner-scoped access',
      state: ownerScopeGate?.state ?? scenario.risk,
      evidence: ownerScopeGate?.note ?? 'Owner boundary state is tied to the selected release scenario.',
    },
    {
      label: 'Audit and rollback trail',
      state: rollbackGate?.state ?? 'warn',
      evidence: `${scenario.audit.length} audit events are visible. Rollback gate: ${rollbackGate?.note ?? 'not specified'}.`,
    },
  ];

  const runScenarioReview = () => {
    setReviewRunsByScenario((current) => ({
      ...current,
      [scenario.id]: (current[scenario.id] ?? 0) + 1,
    }));
  };

  const resetReviews = () => {
    setReviewRunsByScenario({});
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="border-b border-zinc-800 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_32%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.14),transparent_28%)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-300">
              <ArrowLeft className="h-4 w-4" />
              Portfolio
            </Link>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">Portfolio implementation</span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">AI workflow reliability</span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">OpsFlow Command Center</p>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
                Release safety console for AI-enabled workflow systems.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
                A portfolio-built control plane that models the kind of engineering expected in senior full-stack, QA, and platform roles: release gates, SLO checks, owner-scoped policy tests, rollback readiness, and audit trails.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-2xl shadow-cyan-950/20">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Current decision</p>
                  <p className="mt-1 text-2xl font-bold text-white">{releaseDecision}</p>
                </div>
                <StatusPill state={scenario.risk} />
              </div>
              <p className="mb-5 rounded-xl border border-zinc-800 bg-zinc-950/70 p-3 text-sm leading-6 text-zinc-300">
                {scenario.decisionReason}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['p95 latency', `${scenario.p95}ms`, Clock3],
                  ['error budget', `${scenario.errorBudget}%`, TimerReset],
                  ['queue depth', String(scenario.queueDepth), Workflow],
                  ['citation coverage', `${scenario.citationCoverage}%`, FileCheck2],
                ].map(([label, value, Icon]) => (
                  <div key={label as string} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                    <Icon className="mb-3 h-5 w-5 text-cyan-300" />
                    <p className="text-xs text-zinc-500">{label as string}</p>
                    <p className="mt-1 text-xl font-bold text-white">{value as string}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap gap-3">
          {scenarios.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={scenarioId === item.id}
              onClick={() => setScenarioId(item.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                scenarioId === item.id
                  ? 'border-cyan-400 bg-cyan-400 text-zinc-950'
                  : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-cyan-400 hover:text-cyan-300'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            aria-label={`Run release review for ${scenario.label}`}
            onClick={runScenarioReview}
            className="ml-auto inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:border-emerald-400 hover:text-emerald-300"
          >
            <RefreshCcw className="h-4 w-4" />
            Run review {reviewCount > 0 ? `(${reviewCount})` : ''}
          </button>
          <button
            type="button"
            aria-label="Reset all release review runs"
            disabled={totalReviewRuns === 0}
            onClick={resetReviews}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:border-rose-400 hover:text-rose-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-zinc-700 disabled:hover:text-zinc-300"
          >
            <XCircle className="h-4 w-4" />
            Reset reviews
          </button>
        </div>

        <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Scenario review ledger</p>
              <h2 className="text-2xl font-bold text-white">Review state is scenario-scoped</h2>
            </div>
            <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-semibold text-zinc-400">
              {reviewedScenarioCount}/{scenarios.length} scenarios reviewed · {totalReviewRuns} total runs
            </span>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {scenarios.map((item) => {
              const count = reviewRunsByScenario[item.id] ?? 0;
              const active = item.id === scenario.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  aria-label={`Select ${item.label}. ${count > 0 ? `${count} review run${count > 1 ? 's' : ''}` : 'No review run'}.`}
                  onClick={() => setScenarioId(item.id)}
                  className={`rounded-xl border p-4 text-left transition ${
                    active
                      ? 'border-cyan-400 bg-cyan-400/10'
                      : 'border-zinc-800 bg-zinc-950/60 hover:border-cyan-400/60'
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="mt-1 text-xs text-zinc-500">Owner: {item.owner}</p>
                    </div>
                    <StatusPill state={item.risk} />
                  </div>
                  <p className={`text-sm font-semibold ${count > 0 ? 'text-emerald-300' : 'text-zinc-500'}`}>
                    {count > 0 ? `${count} review run${count > 1 ? 's' : ''}` : 'No review run'}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <div className="mb-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <section className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <div className="mb-5 flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-cyan-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Decision policy</p>
                <h2 className="text-2xl font-bold text-white">Explicit release thresholds</h2>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {scenario.policies.map((policy) => {
                const style = stateStyles[policy.state];
                return (
                  <div key={policy.label} className={`rounded-xl border p-4 ${style.border} ${style.bg}`}>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="font-semibold text-white">{policy.label}</h3>
                      <StatusPill state={policy.state} />
                    </div>
                    <dl className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <dt className="text-zinc-500">Threshold</dt>
                        <dd className="mt-1 text-zinc-200">{policy.threshold}</dd>
                      </div>
                      <div>
                        <dt className="text-zinc-500">Current</dt>
                        <dd className={`mt-1 font-semibold ${style.text}`}>{policy.current}</dd>
                      </div>
                    </dl>
                  </div>
                );
              })}
            </div>
          </section>

          <section aria-live="polite" className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Activity className="h-6 w-6 text-emerald-300" />
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Review packet</p>
                  <h2 className="text-2xl font-bold text-white">{reviewLabel}</h2>
                </div>
              </div>
              <StatusPill state={scenario.risk} />
            </div>
            {reviewCount === 0 ? (
              <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-950/50 p-5">
                <p className="text-sm leading-7 text-zinc-300">
                  Run a release review to generate a recruiter-visible decision packet: summary, next action, and evidence checked.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 text-sm leading-7 text-zinc-300">
                  {scenario.reviewSummary}
                </p>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Next action</p>
                  <p className="mt-2 text-sm leading-7 text-zinc-200">{scenario.nextAction}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {['Policy gates', 'SLO budget', 'Audit trail'].map((item) => (
                    <div key={item} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-3 text-sm font-semibold text-zinc-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Service map</p>
                <h2 className="mt-1 text-2xl font-bold text-white">{scenario.incident}</h2>
              </div>
              <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-400">Owner: {scenario.owner}</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {scenario.services.map((service) => {
                const style = stateStyles[service.status];
                return (
                  <div key={service.name} className={`rounded-xl border p-4 ${style.border} ${style.bg}`}>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <Network className={`h-5 w-5 ${style.text}`} />
                      <StatusPill state={service.status} />
                    </div>
                    <h3 className="text-lg font-bold text-white">{service.name}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{service.role}</p>
                    <p className={`mt-4 text-sm font-semibold ${style.text}`}>{service.metric}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">SLO snapshot</p>
            <h2 className="mt-1 text-2xl font-bold text-white">Operational budget</h2>
            <div className="mt-6 space-y-5">
              <MetricBar label="Error budget remaining" value={scenario.errorBudget} suffix="%" state={scenario.errorBudget >= 70 ? 'pass' : scenario.errorBudget >= 50 ? 'warn' : 'fail'} />
              <MetricBar label="Citation coverage" value={scenario.citationCoverage} suffix="%" state={scenario.citationCoverage >= 95 ? 'pass' : scenario.citationCoverage >= 90 ? 'warn' : 'fail'} />
              <MetricBar label="Queue pressure" value={Math.min(100, scenario.queueDepth)} suffix="" state={scenario.queueDepth <= 40 ? 'pass' : scenario.queueDepth <= 80 ? 'warn' : 'fail'} />
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <section className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <div className="mb-5 flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-emerald-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Release gates</p>
                <h2 className="text-2xl font-bold text-white">Pre-deploy checklist</h2>
              </div>
            </div>
            <div className="space-y-3">
              {scenario.gates.map((gate) => {
                const style = stateStyles[gate.state];
                return (
                  <div key={gate.label} className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-white">{gate.label}</h3>
                        <p className="mt-1 text-sm leading-6 text-zinc-400">{gate.note}</p>
                      </div>
                      <span className={`${style.text}`}>{style.icon}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
            <div className="mb-5 flex items-center gap-3">
              <Database className="h-6 w-6 text-cyan-300" />
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Audit trail</p>
                <h2 className="text-2xl font-bold text-white">Traceable decisions</h2>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full min-w-[620px] text-left text-sm">
                <caption className="sr-only">Audit trail for the selected release scenario</caption>
                <thead className="bg-zinc-950 text-xs uppercase tracking-[0.12em] text-zinc-500">
                  <tr>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Actor</th>
                    <th className="px-4 py-3">Action</th>
                    <th className="px-4 py-3">Target</th>
                    <th className="px-4 py-3">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {scenario.audit.map((event) => (
                    <tr key={`${event.time}-${event.action}`} className="bg-zinc-900/60">
                      <td className="px-4 py-3 font-mono text-zinc-400">{event.time}</td>
                      <td className="px-4 py-3 text-white">{event.actor}</td>
                      <td className="px-4 py-3 text-zinc-300">{event.action}</td>
                      <td className="px-4 py-3 text-zinc-400">{event.target}</td>
                      <td className="px-4 py-3"><StatusPill state={event.result} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <section className="mt-6 min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
          <div className="mb-5 flex items-center gap-3">
            <GitBranch className="h-6 w-6 text-amber-300" />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Operational runbook</p>
              <h2 className="text-2xl font-bold text-white">Scenario-specific remediation</h2>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {scenario.runbook.map((step) => {
              const style = stateStyles[step.state];
              return (
                <article key={step.title} className={`rounded-xl border p-4 ${style.border} ${style.bg}`}>
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-white">{step.title}</h3>
                      <p className="mt-1 text-xs text-zinc-500">Owner: {step.owner}</p>
                    </div>
                    <StatusPill state={step.state} />
                  </div>
                  <p className="text-sm leading-6 text-zinc-300">{step.action}</p>
                  <p className={`mt-4 text-xs font-semibold ${style.text}`}>ETA: {step.eta}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-6 min-w-0 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
          <div className="mb-5 flex items-center gap-3">
            <LockKeyhole className="h-6 w-6 text-cyan-300" />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Security inspection</p>
              <h2 className="text-2xl font-bold text-white">Attack surface and hard gates</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {securityChecks.map((check) => {
              const style = stateStyles[check.state];
              return (
                <article key={check.label} className={`rounded-xl border p-4 ${style.border} ${style.bg}`}>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-white">{check.label}</h3>
                    <StatusPill state={check.state} />
                  </div>
                  <p className="text-sm leading-6 text-zinc-300">{check.evidence}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: <LockKeyhole className="h-5 w-5" />,
              title: 'Access boundary',
              body: 'Every risky action is modeled as owner-scoped and auditable before it can pass a release gate.',
            },
            {
              icon: <GitBranch className="h-5 w-5" />,
              title: 'Rollback thinking',
              body: 'The console treats migrations, image rollback, and blocked releases as first-class delivery states.',
            },
            {
              icon: <KeyRound className="h-5 w-5" />,
              title: 'AI output control',
              body: 'AI workflow health is judged through citation coverage, retrieval policy, and grounded-answer checks.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{item.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5">
          <div className="mb-5 flex items-center gap-3">
            <Activity className="h-6 w-6 text-emerald-300" />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Engineering evidence</p>
              <h2 className="text-2xl font-bold text-white">Why this belongs in the portfolio</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <p className="text-sm leading-7 text-zinc-300">
              This project keeps the practical-tool identity of the portfolio while adding a senior-level systems angle: release safety, operational health, auditability, and policy enforcement around AI-enabled workflows.
            </p>
            <p className="text-sm leading-7 text-zinc-300">
              It is intentionally presented as a portfolio implementation, not as a production claim. The goal is to make the engineering judgment visible to hiring teams without inventing company-scale metrics or employment history.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
