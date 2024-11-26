'use client';

import { PodcastSidebar } from '@/app/components/PodcastSidebar';
import { usePodcastDetails } from '@/hooks/usePodcastDetail';
import styles from './layout.module.css';

interface PodcastDetailProps {
  params: {
    podcastId: string;
  }
}

export default function PodcastDetailPage({ params }: PodcastDetailProps) {
  const { podcast, episodes, loading, error } = usePodcastDetails(params.podcastId);

  if (error) {
    return <div className="container">Error: {error.message}</div>;
  }

  return (
    <div className={styles.layout}>
      <PodcastSidebar
        id={params.podcastId}
        title={podcast?.title ?? 'Loading...'}
        author={podcast?.author ?? 'Loading...'}
        image={podcast?.image ?? ''}
        description={podcast?.description ?? 'Loading...'}
      />
      <div className={styles.main}>
        {loading ? (
          <p>Loading episodes...</p>
        ) : (
          <div>
            <h2>Episodes: {episodes.length}</h2>
            {/* Episodes list component will go here */}
          </div>
        )}
      </div>
    </div>
  );
}