"use client";

import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface SortDropdownProps {
  onChange?: (sort: string) => void;
}

const options = [
  "Date (ascending)",
  "Date (descending)",
  "Disability-friendly",
];

export default function SortDropdown({
  onChange = () => {},
}: SortDropdownProps) {
  const [selectedSort, setSelectedSort] = useState("");

  const handleSelect = (sort: string | null) => {
    if (!sort) return;
    setSelectedSort(sort);
    onChange(sort);
  };

  return (
    <div className="w-[220px]">
      <Combobox value={selectedSort} onChange={handleSelect}>
        <div className="relative">
          {/* input */}
          <Combobox.Input
            className="w-full border rounded-lg px-4 py-2 pr-10"
            displayValue={(sort: string) => sort}
            placeholder="Sort by..."
          />

          {/* arrow */}
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
          </Combobox.Button>

          {/* selection */}
          <Combobox.Options className="absolute mt-1 w-full border rounded-lg bg-white shadow-lg z-10">
            {options.map((opt) => (
              <Combobox.Option
                key={opt}
                value={opt}
                className={({ active }) =>
                  `px-4 py-2 cursor-pointer ${
                    active ? "bg-teal-600 text-white" : "text-gray-900"
                  }`
                }
              >
                {opt}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}
