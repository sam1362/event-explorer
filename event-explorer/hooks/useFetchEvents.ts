import { useState, useEffect } from "react";
import { getEvents } from "@/lib/api";

// Simple in-memory cache to store event data by city
const cache: Record<string, any> = {};

export function useFetchEvents(city?: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // reset state immediately when city changes or page loads
    setLoading(true);
    setError(null);
    setData(null);

    async function load() {
      try {
        const cacheKey = city || "all";

        // check cache first
        if (cache[cacheKey]) {
          setData(cache[cacheKey]);
          setLoading(false);
          return;
        }

        // fetch from API
        const res = await getEvents(city, signal);

        // save to cache and update state
        cache[cacheKey] = res;
        setData(res);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }

    // slight delay helps avoid race condition on first mount
    const timer = setTimeout(load, 100);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [city]);

  return { data, loading, error };
}
