"use client";

import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

interface CityDropdownProps {
  cities: string[];
  selectedCity?: string;
  onChange?: (city: string) => void;
}

export default function CityDropdown({
  cities,
  selectedCity = "",
  onChange = () => {},
}: CityDropdownProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions =
    query === "" || !isOpen
      ? cities
      : cities.filter((city) =>
          city.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelect = (city: string | null) => {
    if (!city) return;
    onChange(city);
    setQuery("");
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setQuery("");
  };

  return (
    <div className="w-full sm:w-[200px]">
      <Combobox value={selectedCity} onChange={handleSelect}>
        <div className="relative">
          <Combobox.Input
            className="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-600 bg-background"
            displayValue={(city: string) => city}
            placeholder="Select a city"
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleOpen}
          />

          <Combobox.Button
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={handleOpen}
          >
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
          </Combobox.Button>

          <Combobox.Options className="absolute mt-1 w-full border rounded-lg bg-white shadow-lg z-50 max-h-60 overflow-auto focus:outline-none">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-2 text-gray-500 italic">
                No cities found
              </div>
            ) : (
              filteredOptions.map((city) => (
                <Combobox.Option
                  key={city}
                  value={city}
                  className={({ active }) =>
                    `px-4 py-2 cursor-pointer select-none transition-colors ${
                      active
                        ? "bg-teal-600 text-white"
                        : "text-gray-900"
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
