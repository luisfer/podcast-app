'use client';

import { useQuery } from '@tanstack/react-query';
import { getTopPodcasts } from '@/lib/api/podcasts';
import { Podcast } from '@/types';
import { CACHE_DURATION, LIMIT } from '@/lib/constants';

export function useTopPodcasts() {
  return useQuery<Podcast[]>({
    queryKey: ['podcasts', LIMIT],
    queryFn: () => getTopPodcasts(LIMIT),
    staleTime: CACHE_DURATION,
    gcTime: CACHE_DURATION,
  });
}