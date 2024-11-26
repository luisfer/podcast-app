import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/app/components/Header';
import './styles/variables.css';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Podcaster',
  description: 'Listen to your favorite podcasts',
  applicationName: 'Podcaster',
  authors: [{ name: 'Podcaster Team' }],
  keywords: ['podcast', 'audio', 'streaming', 'episodes'],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  themeColor: '#ffffff',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    title: 'Podcaster',
    description: 'Listen to your favorite podcasts',
    siteName: 'Podcaster'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
          <Header />
          <main className="main">
            {children}
          </main>
      </body>
    </html>
  );
}