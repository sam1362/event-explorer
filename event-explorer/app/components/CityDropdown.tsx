"use client";

import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

interface CityDropdownProps {
  cities?: string[];
  selectedCity?: string;
  onChange?: (city: string) => void;
}

export default function CityDropdown({
  cities = [],
  selectedCity = "",
  onChange = () => {},
}: CityDropdownProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Filter cities based on query
  const filteredCities =
    query === "" || !isOpen
      ? cities
      : cities.filter((city) =>
          city.toLowerCase().includes(query.toLowerCase())
        );

  // Handle select
  const handleSelect = (city: string) => {
    onChange(city);
    setQuery("");
    setIsOpen(false);
  };

  // Open dropdown
  const handleOpen = () => {
    setIsOpen(true);
    setQuery("");
  };

  return (
    <div className="w-full sm:w-[377px]">
      <Combobox value={selectedCity} onChange={handleSelect}>
        <div className="relative">
          {/* Input */}
          <Combobox.Input
            className="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-background"
            displayValue={(city: string) => city}
            placeholder="Select your city"
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleOpen}
          />

          {/* Icon */}
          <Combobox.Button
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={handleOpen}
          >
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
          </Combobox.Button>

          {/* Dropdown */}
          <Combobox.Options className="absolute mt-1 w-full border rounded-lg bg-white shadow-lg z-50 max-h-60 overflow-auto focus:outline-none">
            {filteredCities.length === 0 ? (
              <div className="px-4 py-2 text-gray-500 italic">
                No cities found
              </div>
            ) : (
              filteredCities.map((city) => (
                <Combobox.Option
                  key={city}
                  value={city}
                  className={({ active, selected }) =>
                    `px-4 py-2 cursor-pointer select-none transition-colors ${
                      active
                        ? "bg-teal-600 text-white" 
                        : "text-gray-700"
                    }`
                  }
                >
                  {city}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}
