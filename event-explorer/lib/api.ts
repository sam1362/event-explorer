// lib/api.ts
export async function getEvents(city?: string, sort?: string) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const qs = new URLSearchParams();
  if (city) qs.set("city", city);
  if (sort) qs.set("sort", sort);

  const res = await fetch(`${base}/api/events?${qs.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status}`);
  }

  return res.json();
}
