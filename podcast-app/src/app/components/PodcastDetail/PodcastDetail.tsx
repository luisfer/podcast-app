'use client';

import { PodcastSidebar } from '@/app/components/PodcastSidebar';
import { EpisodesList } from '@/app/components/EpisodesList';
import { usePodcastDetails } from '@/hooks/usePodcastDetails';
import styles from '../../podcast/[podcastId]/styles.module.css';
import Loading from '@/app/components/Loading/Loading';

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
        image={podcast?.image || null}
        description={podcast?.description ?? 'Loading...'}
      />    
      <div className={styles.main}>
        {loading ? (
          <Loading />
        ) : (
          <EpisodesList 
            episodes={episodes} 
            podcastId={podcastId} 
          />
        )}
      </div>
    </div>
  );
}