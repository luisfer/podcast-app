import { Podcast } from '@/types';
import { ITUNES_API } from '../constants';
import { StorageService } from '../storage';
import { fetchWithError, ApiError } from './base';

export const LIMIT = 100;

export interface ItunesPodcast {
  id: { attributes: { 'im:id': string } };
  'im:name': { label: string };
  'im:artist': { label: string };
  summary?: { label: string };
  'im:image': Array<{ label: string }>;
}

export async function getTopPodcasts(limit: number = LIMIT): Promise<Podcast[]> {
  const CACHE_KEY = 'top-podcasts';
  
  // Check cache first
  const cached = StorageService.get<Podcast[]>(CACHE_KEY);
  if (cached && !StorageService.isExpired(cached.timestamp)) {
    return cached.data;
  }

  try {
    const response = await fetchWithError(ITUNES_API.TOP_PODCASTS(limit));
    const data = await response.json();
    
    const podcasts = data.feed.entry.map((entry: ItunesPodcast) => ({
      id: entry.id.attributes['im:id'],
      title: entry['im:name'].label,
      author: entry['im:artist'].label,
      description: entry.summary?.label || '',
      image: entry['im:image'][2].label
    }));

    StorageService.set(CACHE_KEY, podcasts);
    console.log(podcasts);
    return podcasts;
  } catch (error) {
    throw error instanceof ApiError 
      ? error 
      : new ApiError('Failed to fetch podcasts');
  }
}