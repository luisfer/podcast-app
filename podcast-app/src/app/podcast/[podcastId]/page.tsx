import { PodcastDetail } from '@/app/components/PodcastDetail';

interface PodcastDetailPageProps {
  params: {
    podcastId: string;
  }
}

export default function PodcastDetailPage({ params }: PodcastDetailPageProps) {
  return <PodcastDetail podcastId={params.podcastId} />;
}