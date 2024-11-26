import { Suspense } from 'react';
import { PodcastDetail } from '@/app/components/PodcastDetail';
import { use } from 'react';

type Params = Promise<{ podcastId: string }>;

export default function PodcastDetailPage({
  params,
}: {
  params: Params;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PodcastDetail 
        podcastId={use(params).podcastId}
      />
    </Suspense>
  );
}