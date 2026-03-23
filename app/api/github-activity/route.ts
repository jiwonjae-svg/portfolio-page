import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

interface GitHubEvent {
  type: string;
  repo: { name: string };
  payload: { commits?: { message: string }[] };
  created_at: string;
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch('https://api.github.com/users/jiwonjae-svg/events/public', {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) return NextResponse.json([]);

    const events: GitHubEvent[] = await res.json();
    const filtered = events
      .filter((e) => e.type === 'PushEvent')
      .slice(0, 6)
      .map((e) => ({
        repo: e.repo.name.replace('jiwonjae-svg/', ''),
        message: e.payload.commits?.[0]?.message?.split('\n')[0] ?? '(no message)',
        date: e.created_at,
      }));

    return NextResponse.json(filtered);
  } catch {
    return NextResponse.json([]);
  }
}
