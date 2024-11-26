import Link from 'next/link';
import { Episode } from '@/types';
import styles from './EpisodesList.module.css';

interface EpisodesListProps {
  episodes: Episode[];
  podcastId: string;
}

export function EpisodesList({ episodes, podcastId }: EpisodesListProps) {
  return (
    <div className={styles.container}>
      <div className={styles.episodeCount}>
        <h2>Episodes: {episodes.length}</h2>
      </div>
      
      <div className={styles.episodesTable}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Title</th>
              <th className={styles.tableHeader}>Date</th>
              <th className={styles.tableHeader}>Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode) => (
              <tr key={episode.id} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <Link
                    href={`/podcast/${podcastId}/episode/${episode.id}`}
                    className={styles.titleCell}
                  >
                    {episode.title}
                  </Link>
                </td>
                <td className={`${styles.tableCell} ${styles.dateCell}`}>
                  {episode.publishDate}
                </td>
                <td className={`${styles.tableCell} ${styles.durationCell}`}>
                  {episode.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}