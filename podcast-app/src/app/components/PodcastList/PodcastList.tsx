// src/components/PodcastList/PodcastList.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTopPodcasts } from '@/hooks/useQueries';
import styles from './PodcastList.module.css';
import { Podcast } from '@/types';

export async function PodcastList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: podcasts, isLoading } = useTopPodcasts();

  const filteredPodcasts = useMemo(() => {
    if (!searchTerm.trim()) return podcasts;

    const searchLower = searchTerm.toLowerCase();
    return podcasts?.filter(
      podcast =>
        podcast.title.toLowerCase().includes(searchLower) ||
        podcast.author.toLowerCase().includes(searchLower)
    );
  }, [podcasts, searchTerm]);

  if (isLoading) return <div>Loading podcasts...</div>;
  
  return (
    <div className="container">
      <div className={styles.filterSection}>
        <span className={styles.counter}>
          {filteredPodcasts?.length}
        </span>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Filter podcasts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Filter podcasts"
        />
      </div>

      <div className={styles.grid}>
        {filteredPodcasts?.map((podcast) => (
          <Link
            key={podcast.id}
            href={`/podcast/${podcast.id}`}
            className={styles.card}
          >
            <img
              src={podcast.image}
              alt={`${podcast.title} cover`}
              className={styles.image}
            />
            <div className={styles.content}>
              <h2 className={styles.title}>{podcast.title}</h2>
              <p className={styles.author}>Author: {podcast.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}