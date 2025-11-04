


"use client";

import { useState, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import Navbar from "../components/Navbar";
import CityDropdown from "../components/CityDropdown";
import SortDropdown from "../components/SortDropdown";
import EventCard from "../components/EventCard";
import { useFetchEvents } from "@/hooks/useFetchEvents";

interface EventType {
  id: string;
  name: string;
  dates: { start: { localDate: string; localTime?: string } };
  _embedded?: {
    venues?: { name?: string; city?: { name?: string } }[];
  };
  url: string;
  images?: { url: string }[];
}

export default function EntertainmentPage() {
  const [allCities, setAllCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState(9);

  const { ref, inView } = useInView();
  const { data, loading, error } = useFetchEvents(selectedCity);

  const events: EventType[] = Array.isArray(data?._embedded?.events)
    ? data._embedded.events
    : [];

  // save unique cities
  useEffect(() => {
    if (!selectedCity && events.length > 0) {
      const uniqueCities = Array.from(
        new Set(
          events
            .map((e) => e._embedded?.venues?.[0]?.city?.name?.trim())
            .filter((city): city is string => !!city)
        )
      );
      setAllCities(uniqueCities);
    }
  }, [events, selectedCity]);

  // sorting logic
  const sortedEvents = useMemo(() => {
    const sorted = [...events];
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
    }
    return sorted;
  }, [events, sortOption]);

  // infinite scroll
  useEffect(() => {
    if (inView && visibleCount < sortedEvents.length) {
      setVisibleCount((prev) => prev + 9);
    }
  }, [inView, sortedEvents.length, visibleCount]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-10">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Entertainment</h1>
          <span className="text-gray-700 font-medium">
            {selectedCity
              ? `Number of Events in ${selectedCity}: ${sortedEvents.length}`
              : `Total Events: ${sortedEvents.length}`}
          </span>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          {/* City Dropdown */}
          <div className="w-full sm:w-[377px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Choose the City
            </label>
            <CityDropdown
              cities={allCities}
              selectedCity={selectedCity}
              onChange={(city) => {
                setSelectedCity(city);
                setVisibleCount(9);
              }}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="w-full sm:w-[220px] flex flex-col justify-start">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort by
            </label>
            <div className="self-start sm:self-start w-full">
              <SortDropdown
                onChange={(sort) => {
                  setSortOption(sort);
                  setVisibleCount(9);
                }}
              />
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error.message || "Failed to load events."}
          </div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {Array(9)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-40 bg-gray-200 w-full" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 w-3/4 rounded" />
                    <div className="h-3 bg-gray-200 w-1/2 rounded" />
                    <div className="h-3 bg-gray-200 w-1/3 rounded" />
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Event Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEvents.length === 0 ? (
              <p className="text-gray-500 italic">No events found.</p>
            ) : (
              sortedEvents.slice(0, visibleCount).map((event) => (
                <EventCard
                  key={event.id}
                  title={event.name}
                  date={event.dates.start.localDate}
                  venue={event._embedded?.venues?.[0]?.name || "Unknown Venue"}
                  time={event.dates.start.localTime || "N/A"}
                  category="Entertainment"
                  image={event.images?.[0]?.url || "/cat-entertainment.jpg"}
                  url={event.url}
                />
              ))
            )}
          </div>
        )}

        {/* Infinite Scroll Trigger */}
        {!loading && visibleCount < sortedEvents.length && (
          <div ref={ref} className="text-center py-8 text-gray-500">
            Loading more events...
          </div>
        )}
      </div>
    </main>
  );
}
