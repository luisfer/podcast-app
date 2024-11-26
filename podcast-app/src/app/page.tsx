'use client';

import { PodcastList } from '@/app/components/PodcastList';
import { LIMIT } from '@/lib/constants';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { getTopPodcasts } from '@/lib/api/podcasts';
import { ReactQueryClientProvider } from '@/app/components/ReactQueryClientProvider';
import Loading from '@/app/components/Loading/Loading';

function HomePage() {
  return (
    <ReactQueryClientProvider>
      <main>
        <Suspense fallback={<Loading />}>
          <PodcastList />
        </Suspense>
      </main>
    </ReactQueryClientProvider>
  );
}

export default HomePage;
