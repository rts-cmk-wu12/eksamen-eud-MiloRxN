"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ListingsContext = createContext();
export const useListings = () => useContext(ListingsContext);


export default function ListingsProvider({ children, products = [], productsPerPage = 6 }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State: only read from URL on mount
  const initialPage = parseInt(searchParams.get("page"), 10) || 1;
  const initialSearch = searchParams.get("search") || "";

  const [currentPage, setCurrentPageState] = useState(initialPage);
  const [search, setSearchState] = useState(initialSearch);
  const [sort, setSort] = useState("new");

  // Updates: URL for sharing/bookmarking
  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", currentPage);
    search ? params.set("search", search) : params.delete("search");
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [currentPage, search]);

  // Client: Set search & page => 1
  const setSearch = (value) => {
    setSearchState(value);
    setCurrentPageState(1);
  };

  // Filter by search (title, description, user firstname/lastname)
  const normalizedSearch = search.trim().toLowerCase();
  const filteredProducts = normalizedSearch
    ? products.filter((item) => {
        const title = item.title?.toLowerCase() || "";
        const description = item.description?.toLowerCase() || "";
        const firstName = item.user?.firstname?.toLowerCase() || "";
        const lastName = item.user?.lastname?.toLowerCase() || "";
        return (
          title.includes(normalizedSearch) ||
          description.includes(normalizedSearch) ||
          firstName.includes(normalizedSearch) ||
          lastName.includes(normalizedSearch)
        );
      })
    : products;

  // Sort filtered products
  const sortedProducts = filteredProducts.slice().sort((a, b) => {
    switch (sort) {
      case "old":
        return new Date(a.createdAt || a.updatedAt) - new Date(b.createdAt || b.updatedAt);
      case "az":
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      case "za":
        if (a.title < b.title) return 1;
        if (a.title > b.title) return -1;
        return 0;
      case "new":
      default:
        return new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt);
    }
  });

  // Paginate
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <ListingsContext.Provider
      value={{
        products,
        paginatedProducts,
        currentPage,
        setCurrentPage: setCurrentPageState,
        totalPages,
        search,
        setSearch,
        sort,
        setSort,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
}