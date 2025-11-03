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
    venues?: { name?: string; city?: { name?: string } }[];
  };
  url: string;
  images?: { url: string }[];
}

export default function EntertainmentPage() {
  const [allCities, setAllCities] = useState<string[]>([]); 
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const { data, loading, error } = useFetchEvents(selectedCity);
  const events: EventType[] = Array.isArray(data?._embedded?.events)
    ? data._embedded.events
    : [];

  //save cities
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

  // sort
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

  <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
  {/* City Dropdown */}
  <div className="w-full sm:w-[377px]">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Choose the City
    </label>
    <CityDropdown
      cities={allCities}
      selectedCity={selectedCity}
      onChange={(city) => setSelectedCity(city)}
    />
  </div>

 {/* Sort Dropdown */}
<div className="w-full sm:w-[220px] flex flex-col justify-start">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Sort by
  </label>
  <div className="self-start sm:self-start w-full">
    <SortDropdown onChange={(sort) => setSortOption(sort)} />
  </div>
</div>
</div>




        {error && (
          <div className="text-red-500 text-center mb-4">
            {error.message || "Failed to load events."}
          </div>
        )}
        {loading && (
          <div className="text-center text-gray-500 italic mb-4">
            Loading events...
          </div>
        )}

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
                image={event.images?.[0]?.url || "/cat-entertainment.jpg"}
                url={event.url}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
