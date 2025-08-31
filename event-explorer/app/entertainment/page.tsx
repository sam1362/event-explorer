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

  useEffect(() => {
    const fetchCitiesAndEvents = async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        const events = data._embedded?.events || [];

        const uniqueCities: string[] = Array.from(
          new Set(
            events
              .map((e: EventType) => e._embedded?.venues?.[0]?.city?.name)
              .filter(Boolean) as string[]
          )
        );
        setCities(uniqueCities);
        

        // نمایش همه‌ی eventها وقتی هنوز شهری انتخاب نشده
        setEvents(events);
      } catch (err) {
        console.error("Error fetching cities and events", err);
      }
    };

    fetchCitiesAndEvents();
  }, []);

  useEffect(() => {
    if (!selectedCity) return;

    const fetchEventsByCity = async () => {
      try {
        const res = await fetch(`/api/events/${selectedCity}`);
        const data = await res.json();
        setEvents(data._embedded?.events || []);
      } catch (err) {
        console.error("Error fetching events by city", err);
      }
    };

    fetchEventsByCity();
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
      sorted = sorted.sort((a, b) => {
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

        {/* Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.length === 0 ? (
            <p className="text-gray-500">No events found.</p>
          ) : (
            sortedEvents.map((event) => (
              <EventCard
                key={event.id}
                title={event.name}
                date={event.dates.start.localDate}
                venue={event._embedded?.venues?.[0]?.name || "Unknown Venue"}
                city={event._embedded?.venues?.[0]?.city?.name || ""}
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
