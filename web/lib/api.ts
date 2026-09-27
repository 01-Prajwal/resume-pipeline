const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export type ResumeStatus = 'QUEUED' | 'PROCESSING' | 'DONE' | 'FAILED';

export type ResumeListItem = {
  id: string;
  originalName: string;
  status: ResumeStatus;
  attempts: number;
  error: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Resume = ResumeListItem & {
  filePath: string;
  sizeBytes: number;
  extractedText: string | null;
  summary: unknown | null;
};

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export async function uploadResume(file: File) {
  const body = new FormData();
  body.append('file', file);
  const res = await fetch(`${API_URL}/resumes`, { method: 'POST', body });
  return handle<{ id: string; status: ResumeStatus }>(res);
}
export async function retryResume(id: string) {
  const res = await fetch(`${API_URL}/resumes/${id}/retry`, { method: 'POST' });
  return handle<{ id: string; status: ResumeStatus }>(res);
}
export async function listResumes(status?: ResumeStatus) {
  const query = status ? `?status=${status}` : '';
  const res = await fetch(`${API_URL}/resumes${query}`, { cache: 'no-store' });
  return handle<ResumeListItem[]>(res);
}

export async function getResume(id: string) {
  const res = await fetch(`${API_URL}/resumes/${id}`, { cache: 'no-store' });
  return handle<Resume>(res);
}

export function resumeEventsUrl(id: string) {
  return `${API_URL}/resumes/${id}/events`;
}