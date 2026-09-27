'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  getResume,
  resumeEventsUrl,
  type Resume,
  type ResumeStatus,
} from '@/lib/api';

const BADGE: Record<ResumeStatus, string> = {
  QUEUED: 'bg-gray-100 text-gray-700',
  PROCESSING: 'bg-blue-100 text-blue-700',
  DONE: 'bg-green-100 text-green-700',
  FAILED: 'bg-red-100 text-red-700',
};

type Live = {
  status: ResumeStatus;
  attempts: number;
  error: string | null;
};

export default function ResumeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [resume, setResume] = useState<Resume | null>(null);
  const [live, setLive] = useState<Live | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    getResume(id)
      .then(setResume)
      .catch((err) => setLoadError(err.message));

    const source = new EventSource(resumeEventsUrl(id));

    source.onmessage = (event) => {
      const data = JSON.parse(event.data) as {
        status: ResumeStatus;
        attempts?: number;
        error?: string | null;
      };

      setLive({
        status: data.status,
        attempts: data.attempts ?? 0,
        error: data.error ?? null,
      });

      // Terminal states carry new content in Postgres — refetch the full row
      if (data.status === 'DONE' || data.status === 'FAILED') {
        getResume(id).then(setResume).catch(() => {});
      }
    };

    source.onerror = () => {
      // EventSource reconnects on its own; nothing to do but note it
      console.warn('SSE connection interrupted, retrying…');
    };

    return () => source.close();
  }, [id]);

  if (loadError) {
    return <main className="mx-auto max-w-3xl p-8 text-red-600">{loadError}</main>;
  }

  if (!resume) {
    return <main className="mx-auto max-w-3xl p-8 text-gray-500">Loading…</main>;
  }

  const status = live?.status ?? resume.status;
  const attempts = live?.attempts ?? resume.attempts;
  const error = live?.error ?? resume.error;
  const isRetrying = status === 'PROCESSING' && attempts > 1;

  return (
    <main className="mx-auto max-w-3xl p-8">
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        ← Upload another
      </Link>

      <div className="mt-4 flex items-center gap-3">
        <h1 className="text-2xl font-medium">{resume.originalName}</h1>
        <span className={`rounded px-2 py-1 text-xs font-medium ${BADGE[status]}`}>
          {status}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
        <dt>Size</dt>
        <dd>{(resume.sizeBytes / 1024).toFixed(0)} KB</dd>
        <dt>Attempts</dt>
        <dd>{attempts}</dd>
        <dt>Uploaded</dt>
        <dd>{new Date(resume.createdAt).toLocaleString()}</dd>
      </dl>

      {status === 'QUEUED' && (
        <p className="mt-6 text-sm text-gray-500">Waiting for a worker…</p>
      )}

      {status === 'PROCESSING' && (
        <p className="mt-6 text-sm text-blue-700">
          {isRetrying ? `Retrying — attempt ${attempts} of 3` : 'Extracting text…'}
          {isRetrying && error && (
            <span className="block text-gray-500">Last error: {error}</span>
          )}
        </p>
      )}

      {status === 'FAILED' && (
        <div className="mt-6 rounded border border-red-200 bg-red-50 p-4 text-sm">
          <p className="font-medium text-red-800">
            Failed after {attempts} attempts
          </p>
          <p className="mt-1 text-red-700">{error}</p>
        </div>
      )}

      {status === 'DONE' && resume.extractedText && (
        <section className="mt-6">
          <h2 className="text-sm font-medium text-gray-700">
            Extracted text ({resume.extractedText.length} characters)
          </h2>
          <pre className="mt-2 max-h-96 overflow-auto whitespace-pre-wrap rounded bg-gray-50 p-4 text-xs text-gray-800">
            {resume.extractedText}
          </pre>
        </section>
      )}
    </main>
  );
}