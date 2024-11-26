import { Suspense } from 'react';
import { PodcastDetail } from '@/app/components/PodcastDetail';
import { use } from 'react';
import Loading from '@/app/components/Loading/loading';

type Params = Promise<{ podcastId: string }>;

export default function PodcastDetailPage({
  params,
}: {
  params: Params;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <PodcastDetail 
        podcastId={use(params).podcastId}
      />
    </Suspense>
  );
}