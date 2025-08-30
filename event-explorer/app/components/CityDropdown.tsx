"use client";

import { useState, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface CityDropdownProps {
  cities?: string[];
  onChange?: (city: string) => void;
}

export default function CityDropdown({
  cities = ["Oslo", "Bergen"],
  onChange = () => {},
}: CityDropdownProps) {
  const [selectedCity, setSelectedCity] = useState(""); /* default*/

  useEffect(() => {
    if (cities.length > 0 && !selectedCity) {
      setSelectedCity("");
    }
  }, [cities]);

  return (
    <div className="w-[377px]">
      <Combobox
        value={selectedCity}
        onChange={(city: string) => {
          setSelectedCity(city);
          onChange(city);
        }}
      >
        <div className="relative">
          {/* input */}
          <Combobox.Input
            className="w-full border rounded-lg px-4 py-2 pr-10"
            displayValue={(city: string) => city}
            placeholder="Select your city" 
          />

          {/* arrow */}
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
          </Combobox.Button>

          {/* selectionا */}
          <Combobox.Options className="absolute mt-1 w-full border rounded-lg bg-white shadow-lg z-10">
            {cities.map((city) => (
              <Combobox.Option
                key={city}
                value={city}
                className={({ active }) =>
                  `px-4 py-2 cursor-pointer ${
                    active ? "bg-teal-600 text-white" : "text-gray-900"
                  }`
                }
              >
                {city}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}
