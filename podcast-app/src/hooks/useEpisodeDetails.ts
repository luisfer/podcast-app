import { ApiError, fetchWithError } from "@/lib/api/base";
import { StorageService } from "@/lib/storage";
import { ITUNES_API } from "@/lib/constants";

export interface ItunesEpisode {
    trackId: number;
    trackName: string;
    description?: string;
    previewUrl: string;
    releaseDate: string;
  trackTimeMillis: number;
}
  
export async function getPodcastEpisodes(podcastId: string) {
    const CACHE_KEY = `podcast-${podcastId}`;
  
    // Check cache first
    const cached = StorageService.get(CACHE_KEY);
    if (cached && !StorageService.isExpired(cached.timestamp)) {
      return cached.data;
    }
  
    try {
      const response = await fetchWithError(ITUNES_API.PODCAST_DETAILS(podcastId));
      const data = await response.json();
  
      if (!data.results?.length) {
        throw new ApiError('Podcast episodes not found');
      }
  
      const [podcastData, ...episodesData] = data.results;
  
      const episodes = episodesData.map((episode: ItunesEpisode) => ({
        id: episode.trackId.toString(),
        title: episode.trackName,
        description: episode.description || 'No description available',
        audioUrl: episode.previewUrl,
        publishDate: new Date(episode.releaseDate).toLocaleDateString(),
        duration: new Date(episode.trackTimeMillis).toISOString().substr(11, 8)
      }));
  
      StorageService.set(CACHE_KEY, episodes);
      return episodes;
    } catch (error) {
      throw error instanceof ApiError
        ? error
        : new ApiError('Failed to fetch podcast episodes');
    }
  }