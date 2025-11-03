import { useState, useEffect } from "react";
import { getEvents } from "@/lib/api";

export function useFetchEvents(city?: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    async function load() {
      try {
        const res = await getEvents(city);
        if (isMounted) setData(res);
      } catch (err) {
        if (isMounted) setError(err as Error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [city]);

  return { data, loading, error };
}
