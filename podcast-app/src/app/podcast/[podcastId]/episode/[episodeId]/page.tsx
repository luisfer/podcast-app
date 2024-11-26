import { Suspense } from 'react';
import { PodcastDetail } from '@/app/components/PodcastDetail';

interface PodcastDetailPageProps {
  params: {
    podcastId: string;
  }
}

export default async function PodcastDetailPage({ params }: PodcastDetailPageProps) {
  const podcastId = await Promise.resolve(params.podcastId);
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PodcastDetail podcastId={podcastId} />
    </Suspense>
  );
}