import { useMemo } from "react";

export function usePagination({
  page,
  setPage,
  totalCount,
  pageSize,
  siblingCount = 2,
}) {
  const totalPages = Math.ceil(totalCount / pageSize);

  const pageNumbers = useMemo(() => {
    if (totalPages === 0) return [];
    let start = Math.max(1, page - siblingCount);
    let end = Math.min(totalPages, page + siblingCount);

    if (page <= siblingCount) end = Math.min(totalPages, 1 + siblingCount * 2);

    if (page > totalPages - siblingCount)
      start = Math.max(1, totalPages - siblingCount * 2);

    start = Math.max(1, start);
    end = Math.max(start, end);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, totalPages, siblingCount]);

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const handlePageChange = nextPage => {
    if (nextPage !== page && nextPage >= 1 && nextPage <= totalPages) {
      setPage(nextPage);
    }
  };

  return {
    pageNumbers,
    hasPrev,
    hasNext,
    totalPages,
    handlePageChange,
  };
}
