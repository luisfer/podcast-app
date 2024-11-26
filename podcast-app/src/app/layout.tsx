import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/app/components/Header';
import './styles/variables.css';
import './globals.css';
import { Suspense } from 'react';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Podcaster',
  description: 'Listen to your favorite podcasts',
  applicationName: 'Podcaster',
  authors: [{ name: 'Luisfer Romero Calero' }],
  keywords: ['podcast', 'audio', 'streaming', 'episodes'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <main className="main">
            {children}
          </main>
        </Suspense>
      </body>
    </html>
  );
}