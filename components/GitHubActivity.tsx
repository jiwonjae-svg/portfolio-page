'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitCommit } from 'lucide-react';

interface Activity {
  repo: string;
  message: string;
  date: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000);
  const mins = Math.floor(diff / 60000);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${mins}m ago`;
}

export default function GitHubActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github-activity')
      .then((r) => r.json())
      .then((data) => {
        setActivities(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!loading && activities.length === 0) return null;

  return (
    <div className="bg-zinc-900 dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-800 col-span-1 md:col-span-2 lg:col-span-1">
      <div className="flex items-center gap-3 mb-5">
        <GitCommit className="w-6 h-6 text-violet-400" />
        <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
        <a
          href="https://github.com/jiwonjae-svg"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-500 hover:text-primary transition-colors ml-auto"
        >
          GitHub →
        </a>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 bg-zinc-800/50 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="font-mono text-xs space-y-2">
          {activities.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex items-start gap-2 p-2.5 rounded-lg bg-zinc-800/30 hover:bg-zinc-800/60 transition-colors group"
            >
              <span className="text-violet-400 shrink-0 mt-0.5 group-hover:text-violet-300 transition-colors">›</span>
              <div className="min-w-0 flex-1">
                <span className="text-emerald-400">{a.repo}</span>
                <span className="text-zinc-600 mx-1">—</span>
                <span className="text-zinc-300 break-all">{a.message}</span>
              </div>
              <span className="text-zinc-600 shrink-0 ml-2 whitespace-nowrap">{timeAgo(a.date)}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
