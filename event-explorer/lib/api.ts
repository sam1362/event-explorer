
export async function getEvents(city?: string, signal?: AbortSignal) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;

  const url = city
    ? `${base}/api/events/${encodeURIComponent(city)}`
    : `${base}/api/events`;

  console.log("Fetching from:", url);

  // AbortController
  const res = await fetch(url, { cache: "no-store", signal });

  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status}`);
  }

  return res.json();
}
