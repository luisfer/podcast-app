'use client';

import { PodcastSidebar } from '@/app/components/PodcastSidebar';
import { usePodcastDetails } from '@/hooks/usePodcastDetail';
import styles from './PodcastDetail.module.css';

interface PodcastDetailProps {
  podcastId: string;
}

export function PodcastDetail({ podcastId }: PodcastDetailProps) {
  const { podcast, episodes, loading, error } = usePodcastDetails(podcastId);

  if (error) {
    return <div className="container">Error: {error.message}</div>;
  }

  return (
    <div className={styles.layout}>
      <PodcastSidebar
        id={podcastId}
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
          </div>
        )}
      </div>
    </div>
  );
}