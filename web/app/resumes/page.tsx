'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { listResumes, type ResumeListItem, type ResumeStatus } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

const BADGE: Record<ResumeStatus, string> = {
  QUEUED: 'bg-gray-100 text-gray-700',
  PROCESSING: 'bg-blue-100 text-blue-700',
  DONE: 'bg-green-100 text-green-700',
  FAILED: 'bg-red-100 text-red-700',
};

export default function ResumeListPage() {
  const [resumes, setResumes] = useState<ResumeListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listResumes()
      .then(setResumes)
      .catch((err) => setError(err.message));

    const source = new EventSource(`${API_URL}/resumes/events`);

    source.onmessage = (event) => {
      const data = JSON.parse(event.data) as {
        resumeId: string;
        status: ResumeStatus;
        attempts?: number;
        error?: string | null;
      };

      setResumes((current) => {
        if (!current) return current;

        const known = current.some((r) => r.id === data.resumeId);
        if (!known) {
          listResumes().then(setResumes).catch(() => {});
          return current;
        }

        return current.map((r) =>
          r.id === data.resumeId
            ? {
                ...r,
                status: data.status,
                attempts: data.attempts ?? r.attempts,
                error: data.error ?? r.error,
                updatedAt: new Date().toISOString(),
              }
            : r,
        );
      });
    };

    return () => source.close();
  }, []);

  if (error) {
    return <main className="mx-auto max-w-4xl px-6 py-12 text-red-600">{error}</main>;
  }

  if (!resumes) {
    return <main className="mx-auto max-w-4xl px-6 py-12 text-gray-500">Loading…</main>;
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Resumes</h1>
        <Link
          href="/"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Upload
        </Link>
      </div>

      {resumes.length === 0 ? (
        <p className="mt-10 text-gray-500">Nothing uploaded yet.</p>
      ) : (
        <table className="mt-8 w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="pb-3 font-medium">File</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Attempts</th>
              <th className="pb-3 font-medium">Uploaded</th>
            </tr>
          </thead>
          <tbody>
            {resumes.map((resume) => (
              <tr key={resume.id} className="border-t border-gray-100">
                <td className="py-3">
                  <Link
                    href={`/resumes/${resume.id}`}
                    className="font-medium text-gray-900 hover:underline"
                  >
                    {resume.originalName}
                  </Link>
                  {resume.error && (
                    <span className="block text-xs text-gray-500">{resume.error}</span>
                  )}
                </td>
                <td className="py-3">
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${BADGE[resume.status]}`}
                  >
                    {resume.status}
                  </span>
                </td>
                <td className="py-3 text-gray-600">{resume.attempts}</td>
                <td className="py-3 text-gray-600">
                  {new Date(resume.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}