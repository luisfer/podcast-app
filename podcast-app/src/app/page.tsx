'use client';

import { PodcastList } from '@/app/components/PodcastList';
import { Suspense } from 'react';
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
