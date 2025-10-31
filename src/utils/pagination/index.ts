export const generatePagination = (totalRows, currentPage, rowsPerPage) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  let pagination = [];
  if (totalPages <= 5) {
    // Show all page numbers if less than 5 pages
    for (let i = 1; i <= totalPages; i++) pagination.push(i);
  } else {
    if (currentPage <= 3) {
      pagination = [1, 2, 3, "...", totalPages];
    } else if (currentPage >= totalPages - 2) {
      pagination = [1, "...", totalPages - 2, totalPages - 1, totalPages];
    } else {
      pagination = [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }
  }
  return pagination;
};

export const generateMobilePagination = (
  totalRows,
  currentPage,
  rowsPerPage
) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return totalPages;
};
