import { useState, useCallback } from 'react';
import { User, TabType } from "../../../shared/types";

const CACHE_DURATION = 5 * 60 * 1000;

type Cache = {
  [key in TabType]?: {
    data: User[];
    timestamp: number;
  };
};

export const useCache = () => {
  const [cache, setCache] = useState<Cache>({});

  const isCacheValid = useCallback((department: TabType) => {
    const cachedData = cache[department];
    if (!cachedData) return false;
    
    const now = Date.now();
    return now - cachedData.timestamp < CACHE_DURATION;
  }, [cache]);

  const updateCache = useCallback((department: TabType, data: User[]) => {
    setCache(prevCache => ({
      ...prevCache,
      [department]: {
        data,
        timestamp: Date.now()
      }
    }));
  }, []);

  return { cache, isCacheValid, updateCache };
}; 