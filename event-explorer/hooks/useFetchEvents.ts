import { useState, useEffect } from "react";
import { getEvents } from "@/lib/api";

export function useFetchEvents(city?: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController(); 
    const signal = controller.signal;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await getEvents(city, signal);
        setData(res);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }

    load();

    // abortController
    return () => {
      controller.abort();
    };
  }, [city]);

  return { data, loading, error };
}
