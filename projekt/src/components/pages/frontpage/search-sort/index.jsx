"use client";
import { useState, useCallback } from "react";
import { useListings } from "@/components/pages/frontpage/provider";
import { debounce } from "@/utils/debounce";
import { IoSearch } from "react-icons/io5";

const SORT_OPTIONS = [
  { label: "New", value: "new" },
  { label: "Oldest", value: "old" },
  { label: "A-Z", value: "az" },
  { label: "Z-A", value: "za" },
];

export default function SearchSort() {
  const { setSearch, setSort, search, sort } = useListings();
  const [input, setInput] = useState(search || "");

  const debouncedSearch = useCallback(
    debounce((val) => setSearch(val), 300),
    [setSearch]
  );

  const handleInput = (event) => {
    setInput(event.target.value);
    debouncedSearch(event.target.value);
  };

  return (
    <div className="max-w-250 mx-auto flex flex-wrap gap-4 justify-center mt-10 lg:justify-between ">
      
      {/* Search field */}
      <div className="relative w-64">
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={handleInput}
          className="w-full rounded-full border border-search-border px-4 py-2 pr-10 placeholder:text-search-placeholder"
        />
        <IoSearch
          className="absolute right-3 top-2.5 text-search-icon"
          size={18}
          aria-hidden="true"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => setSort(option.value)}
            className={`px-4 py-2 rounded-full border transition-colors ${
              sort === option.value
                ? "filter-active"
                : "filter-inactive hover:bg-gray-200"
            }`}
          >
            {sort === option.value && (
              <span className="mr-1">✓</span>
            )}
            {option.label}
          </button>
        ))}
      </div>

    </div>
  );

  
}
