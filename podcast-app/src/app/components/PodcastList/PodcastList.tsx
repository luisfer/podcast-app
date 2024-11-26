// src/components/PodcastList/PodcastList.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useTopPodcasts } from '@/hooks/useQueries';
import styles from './PodcastList.module.css';

export function PodcastList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: podcasts, isLoading } = useTopPodcasts();

  const [filteredPodcasts, setFilteredPodcasts] = useState(podcasts || []);

  useEffect(() => {
    if (!podcasts) {
      setFilteredPodcasts([]);
      return;
    }
    if (!searchTerm.trim()) {
      setFilteredPodcasts(podcasts);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = podcasts.filter(
      podcast =>
        podcast.title.toLowerCase().includes(searchLower) ||
        podcast.author.toLowerCase().includes(searchLower)
    );
    setFilteredPodcasts(filtered);
  }, [podcasts, searchTerm]);

  return (
    <div className={styles.container}>
      <div className={styles.filterSection}>
        <span className={styles.counter}>
          {filteredPodcasts?.length || 0}
        </span>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Filter podcasts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Filter podcasts"
          disabled={isLoading}
        />
      </div>

      {isLoading ? (
        <div>Loading podcasts...</div>
      ) : (
        <div className={styles.grid}>
          {filteredPodcasts.map((podcast) => (
            <Link
              key={podcast.id}
              href={`/podcast/${podcast.id}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={podcast.image}
                  alt={`${podcast.title} cover`}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <h2 className={styles.title}>{podcast.title}</h2>
                <p className={styles.author}>Author: {podcast.author}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}