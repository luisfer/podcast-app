import { usePodcastDetails } from "./usePodcastDetails";

interface Breadcrumb {
    label: string | undefined;
    path: string;
  }
  
export function useBreadcrumbs(pathname: string) {
    

    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: Breadcrumb[] = [{ label: 'Home', path: '/' }];
  
    // Extract IDs from pathname
    const podcastIdMatch = pathname.match(/\/podcast\/([^\/]+)/);
    const podcastId = podcastIdMatch ? podcastIdMatch[1] : '';
    const episodeIdMatch = pathname.match(/\/episode\/([^\/]+)/);
    const episodeId = episodeIdMatch ? episodeIdMatch[1] : '';

    const { podcast: podcastDetails, episodes } = usePodcastDetails(podcastId || '');
    const episodeLabel = episodeId ? episodes?.find(ep => ep.id === episodeId)?.title : '';

  
    let currentPath = '';
    for (const segment of paths) {
      currentPath += `/${segment}`;
      
      // Skip the 'episode' segment but keep processing
      if (segment === 'episode') continue;
      if (segment === 'podcast') continue;
      
      let label = segment;
      
      if (segment === podcastId && podcastDetails) {
        label = podcastDetails.title || 'Loading...';
      } else if (segment === episodeId && episodeLabel) {
        label = episodeLabel;
      } else {
        label = segment
          .replace(/^\[|\]$/g, '')
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase());
      }
  
      breadcrumbs.push({ label, path: currentPath });
    }
  
    return breadcrumbs;
}