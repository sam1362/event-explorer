"use client";

import { useState, useEffect, useMemo } from "react";
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
    venues?: { name: string; city?: { name?: string } }[];
  };
  url: string;
  images?: { url: string }[];
}

export default function EntertainmentPage() {
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  // ✅ Hook برای گرفتن داده‌ها از backend (با مدیریت خطا و لودینگ)
  const { data, loading, error } = useFetchEvents(selectedCity, sortOption);

  // ✅ استخراج لیست شهرها از داده‌ها
  useEffect(() => {
    if (data && Array.isArray(data._embedded?.events)) {
      const events: EventType[] = data._embedded.events;
      const uniqueCities = Array.from(
        new Set(
          events
            .map((e) => e._embedded?.venues?.[0]?.city?.name?.trim())
            .filter((city): city is string => !!city)
        )
      );
      setCities(uniqueCities);
    }
  }, [data]);

  // ✅ مرتب‌سازی داده‌ها براساس گزینه انتخاب‌شده
  const sortedEvents = useMemo(() => {
    if (!data || !Array.isArray(data._embedded?.events)) return [];

    let sorted = [...data._embedded.events];

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
  }, [data, sortOption]);

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
          <div className="text-red-500 text-center mb-4">
            {error.message || "Failed to load events."}
          </div>
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
