'use client';

import { PodcastList } from '@/app/components/PodcastList';
import { LIMIT } from '@/lib/constants';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { getTopPodcasts } from '@/lib/api/podcasts';
import { ReactQueryClientProvider } from '@/app/components/ReactQueryClientProvider';

function HomePage() {
  return (
    <ReactQueryClientProvider>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <PodcastList />
        </Suspense>
      </main>
    </ReactQueryClientProvider>
  );
}

export default HomePage;
