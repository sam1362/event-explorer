import { useState, useEffect } from "react";
import { getEvents } from "@/lib/api";

//  Simple in-memory cache to store event data by city
const cache: Record<string, any> = {};

export function useFetchEvents(city?: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function load() {
      setError(null);

      // If data for this city is already cached, use it immediately
      const cacheKey = city || "all";
      if (cache[cacheKey]) {
        setData(cache[cacheKey]);
        return;
      }

      setLoading(true);
      try {
        //  Fetch data from API with AbortController signal
        const res = await getEvents(city, signal);

        //  Save data to cache for future use
        cache[cacheKey] = res;

        // Update state with fetched data
        setData(res);
      } catch (err: any) {
        // Only set error if it’s not an aborted request
        if (err.name !== "AbortError") setError(err);
      } finally {
        // Turn off loading state
        setLoading(false);
      }
    }

    // Trigger data load
    load();

    // Abort fetch when component unmounts or city changes
    return () => {
      controller.abort();
    };
  }, [city]);

  return { data, loading, error };
}
