// Taget fra tidligere projekt.
"use client";

import { searchContext } from "@/components/providers/search-provider";
import { useContext } from "react";

export default function SearchField({ activities }) {
  const { setResults, setErrorMsg } = useContext(searchContext);

  function searchHandler(event) {
    setErrorMsg("");
    const { value } = event.target;

    if (value !== "") {
      var filteredData = activities.filter(
        activity => (activity.name.toLowerCase().includes(value.toLowerCase())
          || activity.description.toLowerCase().includes(value.toLowerCase())
          || activity.weekday.toLowerCase().includes(value.toLowerCase())
          || activity.time === value
          || (activity.minAge <= value && activity.maxAge >= value)));
    }

    if (!filteredData?.length) {
      setErrorMsg("Der er igen resultater");
    }
    setResults(filteredData);
  }

  return (
    <div>
      <input type="search" onChange={searchHandler} />
    </div>
  );
}