import { Suspense } from 'react';
import { EpisodeDetail } from '@/app/components/EpisodeDetail';
import { use } from 'react';

type Params = Promise<{ podcastId: string, episodeId: string }>

export default function EpisodeDetailPage({
  params,
}: {
  params: Params;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EpisodeDetail 
        podcastId={use(params).podcastId}
        episodeId={use(params).episodeId}
      />
    </Suspense>
  );
}