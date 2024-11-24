export class ApiError extends Error {
    constructor(
      message: string,
      public status?: number,
      public data?: unknown
    ) {
      super(message);
      this.name = 'ApiError';
    }
  }
  
  export async function fetchWithError(url: string): Promise<Response> {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new ApiError(
          `🔴 Podcast app API error: ${response.statusText}`,
          response.status
        );
      }
      
      return response;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        error instanceof Error ? error.message : '🔴 Podcast app unknown error occurred'
      );
    }
  }