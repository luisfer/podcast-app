'use client';

import { useState, useEffect } from 'react';
import { Podcast } from '@/types';
import { getTopPodcasts } from '@/lib/api/podcasts';

interface UsePodcastsResult {
  podcasts: Podcast[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function usePodcasts(): UsePodcastsResult {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function fetchPodcasts() {
    try {
      setLoading(true);
      setError(null);
      const data = await getTopPodcasts();
      setPodcasts(data);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPodcasts();
  }, []);

  return {
    podcasts,
    loading,
    error,
    refetch: fetchPodcasts
  };
}