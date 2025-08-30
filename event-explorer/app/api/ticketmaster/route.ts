import { NextResponse } from "next/server";
import { fetchEntertainmentEvents } from "../../../lib/ticketmaster";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || undefined;

  try {
    const data = await fetchEntertainmentEvents(city);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Ticketmaster API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
