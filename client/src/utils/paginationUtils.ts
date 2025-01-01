export const getPaginationWindow = (currentPage: number, pageCount: number) => {
  const windowSize = 5;
  const halfWindow = Math.floor(windowSize / 2);

  let startPage = Math.max(currentPage - halfWindow, 0);
  let endPage = Math.min(currentPage + halfWindow, pageCount - 1);

  if (endPage - startPage < windowSize - 1) {
    startPage = Math.max(endPage - windowSize + 1, 0);
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );
};
