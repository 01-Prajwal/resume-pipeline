'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { listResumes, retryResume, type ResumeListItem } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export default function FailedPage() {
  const [resumes, setResumes] = useState<ResumeListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState<Set<string>>(new Set());
  const [rowErrors, setRowErrors] = useState<Record<string, string>>({});

  const refresh = useCallback(() => {
    listResumes('FAILED')
      .then(setResumes)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    refresh();

    const source = new EventSource(`${API_URL}/resumes/events`);

    // Any status change can add or remove a row here — always refetch
    source.onmessage = () => refresh();

    return () => source.close();
  }, [refresh]);

  async function handleRetry(id: string) {
    setRetrying((current) => new Set(current).add(id));
    setRowErrors((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });

    try {
      await retryResume(id);
      refresh();
    } catch (err) {
      setRowErrors((current) => ({
        ...current,
        [id]: err instanceof Error ? err.message : 'Retry failed',
      }));
      setRetrying((current) => {
        const next = new Set(current);
        next.delete(id);
        return next;
      });
    }
  }

  if (error) {
    return <main className="mx-auto max-w-4xl px-6 py-12 text-red-600">{error}</main>;
  }

  if (!resumes) {
    return <main className="mx-auto max-w-4xl px-6 py-12 text-gray-500">Loading…</main>;
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Failed jobs
          </h1>
          <p className="mt-2 text-gray-600">
            Gave up after 3 attempts. Still in the dead-letter queue, so they can
            be replayed.
          </p>
        </div>
        <Link
          href="/resumes"
          className="shrink-0 text-sm text-gray-500 hover:underline"
        >
          All resumes →
        </Link>
      </div>

      {resumes.length === 0 ? (
        <p className="mt-10 text-gray-500">Nothing has failed. Good.</p>
      ) : (
        <ul className="mt-8 space-y-3">
          {resumes.map((resume) => (
            <li
              key={resume.id}
              className="rounded-xl border border-red-200 bg-red-50 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <Link
                    href={`/resumes/${resume.id}`}
                    className="font-medium text-gray-900 hover:underline"
                  >
                    {resume.originalName}
                  </Link>
                  <p className="mt-1 text-sm text-red-700">{resume.error}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {resume.attempts} attempts ·{' '}
                    {new Date(resume.updatedAt).toLocaleString()}
                  </p>
                  {rowErrors[resume.id] && (
                    <p className="mt-2 text-xs font-medium text-red-800">
                      {rowErrors[resume.id]}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  disabled={retrying.has(resume.id)}
                  onClick={() => handleRetry(resume.id)}
                  className="shrink-0 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {retrying.has(resume.id) ? 'Retrying…' : 'Retry'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}