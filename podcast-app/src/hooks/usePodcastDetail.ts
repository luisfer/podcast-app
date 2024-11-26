// src/hooks/usePodcastDetails.ts
'use client';

import { useState, useEffect } from 'react';
import { Podcast, Episode, ItunesEpisode } from '@/types';

interface PodcastDetails {
  podcast: Podcast | null;
  episodes: Episode[];
  loading: boolean;
  error: Error | null;
}

const corsProxy = 'https://api.allorigins.win/get?url=';
const podcastApi = 'https://itunes.apple.com/lookup?id=';
const params = '&media=podcast&entity=podcastEpisode&limit=20';

export function usePodcastDetails(podcastId: string): PodcastDetails {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    async function fetchPodcastDetails() {
      try {
        setLoading(true);
        setError(null);

        // First, check if we have cached data
        const cachedData = localStorage.getItem(`podcast-${podcastId}`);
        const cachedTimestamp = localStorage.getItem(`podcast-${podcastId}-timestamp`);

        if (cachedData && cachedTimestamp) {
          const timestamp = parseInt(cachedTimestamp, 10);
          const now = Date.now();
          
          // If cache is less than 24 hours old
          if (now - timestamp < 24 * 60 * 60 * 1000) {
            const parsed = JSON.parse(cachedData);
            setPodcast(parsed.podcast);
            setEpisodes(parsed.episodes);
            setLoading(false);
            return;
          }
        }

        // Fetch podcast details using allorigins to avoid CORS issues
        const response = await fetch(
          `${corsProxy}${encodeURIComponent(
            `${podcastApi}${podcastId}${params}`
          )}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch podcast details');
        }

        const data = await response.json();
        const parsed = JSON.parse(data.contents);

        if (!parsed.results?.length) {
          throw new Error('Podcast not found');
        }

        const [podcastData, ...episodesData] = parsed.results;

        const podcastInfo: Podcast = {
          id: podcastId,
          title: podcastData.collectionName,
          author: podcastData.artistName,
          image: podcastData.artworkUrl600,
          description: podcastData.description || 'No description available'
        };

        const episodesList: Episode[] = episodesData.map((episode: ItunesEpisode) => ({
          id: episode.trackId.toString(),
          title: episode.trackName,
          description: episode.description || 'No description available',
          audioUrl: episode.previewUrl,
          publishDate: new Date(episode.releaseDate).toLocaleDateString(),
          duration: new Date(episode.trackTimeMillis).toISOString().substr(11, 8)
        }));

        // Cache the data
        localStorage.setItem(`podcast-${podcastId}`, JSON.stringify({
          podcast: podcastInfo,
          episodes: episodesList
        }));
        localStorage.setItem(`podcast-${podcastId}-timestamp`, Date.now().toString());

        setPodcast(podcastInfo);
        setEpisodes(episodesList);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    }

    fetchPodcastDetails();
  }, [podcastId]);

  return { podcast, episodes, loading, error };
}