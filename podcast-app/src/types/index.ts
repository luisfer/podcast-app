export interface Podcast {
    id: string;
    title: string;
    author: string;
    description: string;
    image: string;
}
  
export interface Episode {
    id: string;
    title: string;
    description: string;
    audioUrl: string;
    publishDate: string;
    duration: string;
}

export interface ItunesPodcast {
    id: { attributes: { 'im:id': string } };
    'im:name': { label: string };
    'im:artist': { label: string };
    summary?: { label: string };
    'im:image': Array<{ label: string }>;
  }
  export interface ItunesEpisode {
    trackId: number;
    trackName: string;
    description: string;
    previewUrl: string;
    releaseDate: string;
    trackTimeMillis: number;
  }
  
  export interface ItunesPodcastResponse {
    results: Array<{
      collectionName: string;
      artistName: string;
      artworkUrl600: string;
      description?: string;
    } | ItunesEpisode>;
  }