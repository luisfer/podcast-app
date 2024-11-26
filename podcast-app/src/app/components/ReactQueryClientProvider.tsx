'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { CACHE_DURATION } from '@/lib/constants'

export const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: CACHE_DURATION,
            gcTime: CACHE_DURATION
          },
        },
      })
  )
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}