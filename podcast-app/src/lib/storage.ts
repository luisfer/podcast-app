import { CACHE_DURATION } from "./constants";

export interface CacheItem<T> {
    timestamp: number;
    data: T;
  }
  
  export class StorageService {
    static get<T>(key: string): CacheItem<T> | null {
      if (typeof window === 'undefined') return null;
      
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      try {
        return JSON.parse(item) as CacheItem<T>;
      } catch {
        return null;
      }
    }
  
    static set<T>(key: string, data: T): void {
      if (typeof window === 'undefined') return;
      
      const item: CacheItem<T> = {
        timestamp: Date.now(),
        data
      };
      
      localStorage.setItem(key, JSON.stringify(item));
    }
  
    static isExpired(timestamp: number, duration: number = CACHE_DURATION): boolean {
      return Date.now() - timestamp > duration;
    }
  }