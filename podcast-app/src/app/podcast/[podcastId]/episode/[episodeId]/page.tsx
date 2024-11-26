import { Suspense } from 'react';
import { EpisodeDetail } from '@/app/components/EpisodeDetail';

interface EpisodeDetailPageProps {
  params: {
    podcastId: string;
    episodeId: string;
  }
}

export default async function EpisodeDetailPage({ params }: EpisodeDetailPageProps) {
  const podcastId = await Promise.resolve(params.podcastId);
  const episodeId = await Promise.resolve(params.episodeId);
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EpisodeDetail 
        podcastId={podcastId}
        episodeId={episodeId}
      />
    </Suspense>
  );
}