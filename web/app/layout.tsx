import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Resume pipeline',
  description: 'Async PDF resume processing with a job queue',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="border-b border-gray-200">
          <div className="mx-auto flex max-w-4xl gap-6 p-4 text-sm">
            <Link href="/" className="hover:underline">
              Upload
            </Link>
            <Link href="/resumes" className="hover:underline">
              Resumes
            </Link>
            <Link href="/failed" className="hover:underline">
              Failed
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}