"use client";

import { useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import CityDropdown from "../components/CityDropdown";
import SortDropdown from "../components/SortDropdown";
import EventCard from "../components/EventCard";

interface EventType {
  id: string;
  name: string;
  dates: { start: { localDate: string; localTime?: string } };
  _embedded?: {
    venues?: { name: string; city?: { name: string } }[];
  };
  url: string;
  images?: { url: string }[];
}

export default function EntertainmentPage() {
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [events, setEvents] = useState<EventType[]>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchCitiesAndEvents = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/events", { signal: controller.signal });
        const data = await res.json();
        const events: EventType[] = data._embedded?.events || [];

        const uniqueCities: string[] = Array.from(
          new Set(
            events
              .map((e) => e._embedded?.venues?.[0]?.city?.name?.trim())
              .filter((city): city is string => !!city && typeof city === "string")
          )
        );

        setCities(uniqueCities);
        setEvents(events);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching cities and events", err);
          setError("Failed to load events. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCitiesAndEvents();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!selectedCity) return;

    const controller = new AbortController();

    const fetchEventsByCity = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`/api/events/${selectedCity}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setEvents(data._embedded?.events || []);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          console.log("City fetch aborted");
        } else {
          console.error("Error fetching events by city", err);
          setError("Failed to load events for selected city.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEventsByCity();

    return () => {
      controller.abort();
    };
  }, [selectedCity]);

  const sortedEvents = useMemo(() => {
    let sorted = [...events];

    if (sortOption === "Date (ascending)") {
      sorted.sort(
        (a, b) =>
          new Date(a.dates.start.localDate).getTime() -
          new Date(b.dates.start.localDate).getTime()
      );
    } else if (sortOption === "Date (descending)") {
      sorted.sort(
        (a, b) =>
          new Date(b.dates.start.localDate).getTime() -
          new Date(a.dates.start.localDate).getTime()
      );
    } else if (sortOption === "Disability-friendly") {
      sorted.sort((a, b) => {
        const aAccessible = a._embedded?.venues?.[0]?.name
          ?.toLowerCase()
          .includes("accessible");
        const bAccessible = b._embedded?.venues?.[0]?.name
          ?.toLowerCase()
          .includes("accessible");
        return aAccessible === bAccessible ? 0 : aAccessible ? -1 : 1;
      });
    }

    return sorted;
  }, [events, sortOption]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-10">
        {/* Title + Counter */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Entertainment</h1>
          <span className="text-gray-700 font-medium">
            {selectedCity
              ? `Number of Events in ${selectedCity}: ${sortedEvents.length}`
              : `Number of Entertainment: ${sortedEvents.length}`}
          </span>
        </div>

        {/* City + Sort */}
        <div className="mb-8 flex items-end justify-between">
          <div className="w-[377px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choose the City
            </label>
            <CityDropdown
              cities={cities}
              onChange={(city) => setSelectedCity(city)}
            />
          </div>

          <div className="w-[220px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort by
            </label>
            <SortDropdown onChange={(sort) => setSortOption(sort)} />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center text-gray-500 italic mb-4">
            Loading events...
          </div>
        )}

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && sortedEvents.length === 0 ? (
            <p className="text-gray-500 italic">No events found.</p>
          ) : (
            sortedEvents.map((event) => (
              <EventCard
                key={event.id}
                title={event.name}
                date={event.dates.start.localDate}
                venue={event._embedded?.venues?.[0]?.name || "Unknown Venue"}
                time={event.dates.start.localTime || "N/A"}
                category="Entertainment"
                image={
                  event.images ? event.images[0].url : "/cat-entertainment.jpg"
                }
                url={event.url}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
