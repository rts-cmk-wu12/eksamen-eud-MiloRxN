"use client";

import { useListings } from "@/components/pages/frontpage/provider";
import React from "react";
import { renderPagination } from "@/components/pages/frontpage/grid/renderPagination";

const rowClasses = {
  1: "grid-rows-1",
  2: "grid-rows-2",
  3: "grid-rows-3",
  4: "grid-rows-4",
  5: "grid-rows-5",
  6: "grid-rows-6",
};

export default function Grid({ pagination = false, columns = 3, rows, children }) {
  const { paginatedProducts, products, currentPage, setCurrentPage, totalPages } = useListings();

  const data = pagination ? paginatedProducts : products;

  return (
    <div className="flex flex-col items-center mb-20 mt-10">
      <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${rows ? rowClasses[rows] : ""}`}>
        {data.map((product, index) => React.cloneElement(children, { key: product.id || index, product }))}
      </div>

      {pagination && (
        <div className="flex justify-center items-center mt-20 gap-2">
          <button
            onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded text-pagination-button disabled:text-pagination-button-disabled"
          >
            &larr; Previous
          </button>

          <div className="flex gap-1 mx-2">
            {renderPagination({
              totalPages,
              currentPage,
              setCurrentPage,
              alwaysVisible: 2, // Start and End
              neighborCount: 2, // Before/after current page
            })}
          </div>

          <button
            onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded text-pagination-button disabled:text-pagination-button-disabled"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );

}

