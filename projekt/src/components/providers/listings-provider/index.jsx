"use client";

import React, { createContext, useContext, useState } from "react";

const ListingsContext = createContext();
export const useListings = () => useContext(ListingsContext);


export default function ListingsProvider({ children, items = [], itemsPerPage = 6 }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <ListingsContext.Provider
      value={{
        items,
        paginatedItems,
        currentPage,
        setCurrentPage,
        totalPages,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
}


