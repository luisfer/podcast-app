'use client';

import { PodcastList } from '@/app/components/PodcastList';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <PodcastList />
      </Suspense>
    </main>
  );
}
