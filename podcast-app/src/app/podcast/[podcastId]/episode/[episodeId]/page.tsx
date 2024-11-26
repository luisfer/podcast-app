import { EpisodeDetail } from '@/app/components/EpisodeDetail';

interface EpisodeDetailPageProps {
  params: {
    podcastId: string;
    episodeId: string;
  }
}

export default function EpisodeDetailPage({ params }: EpisodeDetailPageProps) {
  return (
    <EpisodeDetail 
      podcastId={params.podcastId} 
      episodeId={params.episodeId} 
    />
  );
}