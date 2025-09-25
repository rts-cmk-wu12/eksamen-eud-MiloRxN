/**
 * Renders pagination buttons with ellipsis for large page sets.
 * @param {Object} params
 * @param {number} params.totalPages
 * @param {number} params.currentPage
 * @param {function} params.setCurrentPage
 * @param {number} [params.alwaysVisible=2] - Always show this many pages at start/end
 * @param {number} [params.neighborCount=2] - Show this many neighbors around current page
 */
export function renderPagination({
  totalPages,
  currentPage,
  setCurrentPage,
  alwaysVisible = 2,
  neighborCount = 2,
}) {
  if (totalPages <= 1) return null;

  const visiblePages = new Set();

  // Always show first and last N pages
  for (let i = 1; i <= alwaysVisible; i++) visiblePages.add(i);
  for (let i = totalPages - alwaysVisible + 1; i <= totalPages; i++) {
    if (i > 0) visiblePages.add(i);
  }

  // Show current page and neighbors
  for (let i = currentPage - neighborCount; i <= currentPage + neighborCount; i++) {
    if (i > 0 && i <= totalPages) visiblePages.add(i);
  }

  const sorted = Array.from(visiblePages).sort((a, b) => a - b);

  let lastPage = 0;
  const buttons = [];

  for (const page of sorted) {
    if (page - lastPage > 1) {
      items.push(
        <span key={`ellipsis-${page}`} className="px-2 text-pagination-text">
          ...
        </span>
      );
    }
    buttons.push(
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={
          currentPage === page
            ? "pagination-current px-3 py-1 rounded"
            : "pagination-default px-3 py-1 rounded bg-transparent"
        }
      >
        {page}
      </button>
    );
    lastPage = page;
  }

  return buttons;
}