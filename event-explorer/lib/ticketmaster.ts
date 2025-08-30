export async function fetchEntertainmentEvents(city?: string) {
  const baseUrl = "https://app.ticketmaster.com/discovery/v2/events.json";
  const key = process.env.NEXT_PUBLIC_TM_API_KEY;

  if (!key) {
    throw new Error("API Key is missing!");
  }

 
  let url = `${baseUrl}?apikey=${key}&segmentId=KZFzniwnSyZfZ7v7nJ&countryCode=NO&size=100`;

 
  if (city) {
    url += `&city=${encodeURIComponent(city)}`;
  }

  console.log("Fetching URL:", url);

  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to fetch events. Status: ${res.status}`);
  }

  return res.json();
}
