import type { Metadata } from 'next';
import { Header } from '@/app/components/Header';
import './styles/variables.css';
import './styles/global.css';

export const metadata: Metadata = {
  title: 'Podcaster',
  description: 'Listen to your favorite podcasts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="main">
          {children}
        </main>
      </body>
    </html>
  );
}