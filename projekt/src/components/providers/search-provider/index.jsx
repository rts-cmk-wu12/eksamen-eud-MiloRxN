// Taget fra tidligere projekt.
"use client";

import { createContext, useState } from "react";

export const searchContext = createContext(null);

export default function SearchProvider({ children }) {
  const [results, setResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <searchContext.Provider value={{ results, setResults, errorMsg, setErrorMsg }}>
      {children}
    </searchContext.Provider>
  );
}