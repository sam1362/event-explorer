import { useState, useEffect } from "react";
import { getEvents } from "@/lib/api";

/**
 * Custom React hook for fetching events data from backend
 * Handles loading and error states automatically.
 */
export function useFetchEvents(city?: string, sort?: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true; // prevent state updates on unmounted component

    async function load() {
      try {
        const res = await getEvents(city, sort);
        if (isMounted) {
          setData(res);
        }
      } catch (e) {
        if (isMounted) {
          setError(e as Error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [city, sort]);

  return { data, loading, error };
}
