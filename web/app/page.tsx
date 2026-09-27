'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { uploadResume } from '@/lib/api';

const MAX_BYTES = 5 * 1024 * 1024;

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return;
    }
    if (file.size > MAX_BYTES) {
      setError('File must be under 5 MB');
      return;
    }

    setBusy(true);
    setError(null);
    try {
      const { id } = await uploadResume(file);
      router.push(`/resumes/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
        Upload a resume
      </h1>
      <p className="mt-2 text-gray-600">
        PDF, up to 5 MB. Parsing runs in a background worker, so the upload
        returns immediately.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center transition hover:border-gray-400 hover:bg-gray-100">
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files?.[0] ?? null);
              setError(null);
            }}
          />
          {file ? (
            <>
              <span className="font-medium text-gray-900">{file.name}</span>
              <span className="mt-1 text-sm text-gray-500">
                {(file.size / 1024).toFixed(0)} KB — click to change
              </span>
            </>
          ) : (
            <>
              <span className="font-medium text-gray-900">Choose a PDF</span>
              <span className="mt-1 text-sm text-gray-500">
                or drop one here
              </span>
            </>
          )}
        </label>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!file || busy}
          className="mt-6 w-full rounded-lg bg-gray-900 px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? 'Uploading…' : 'Upload and process'}
        </button>
      </form>
    </main>
  );
}