export const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
export const ITUNES_API = {
  TOP_PODCASTS: 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
  PODCAST_DETAILS: (id: string) => 
    `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
};