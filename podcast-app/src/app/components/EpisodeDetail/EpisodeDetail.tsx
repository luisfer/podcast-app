'use client';

import { usePodcastDetails } from '@/hooks/usePodcastDetails';
import { PodcastSidebar } from '@/app/components/PodcastSidebar';
import styles from './EpisodeDetail.module.css';

interface EpisodeDetailProps {
  podcastId: string;
  episodeId: string;
}

export function EpisodeDetail({ podcastId, episodeId }: EpisodeDetailProps) {
  const { podcast, episodes, loading, error } = usePodcastDetails(podcastId);

  if (error) {
    return <div className="container">Error: {error.message}</div>;
  }

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  const episode = episodes.find(ep => ep.id === episodeId);

  if (!episode) {
    return <div className="container">Episode not found</div>;
  }

  return (
    <div className={styles.layout}>
      <PodcastSidebar
        id={podcastId}
        title={podcast?.title ?? ''}
        author={podcast?.author ?? ''}
        image={podcast?.image ?? ''}
        description={podcast?.description ?? ''}
      />
      <div className={styles.main}>
        <div className={styles.episodeCard}>
          <h1 className={styles.title}>{episode.title}</h1>
          <div 
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: episode.description }}
          />
          <audio 
            className={styles.audioPlayer}
            controls
            src={episode.audioUrl}
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
}