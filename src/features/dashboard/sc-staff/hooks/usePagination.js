import { useState } from 'react'

export function usePagination(initialPage = 1, totalPages = 4) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const goToPrevious = () => {
    goToPage(currentPage - 1)
  }

  const goToNext = () => {
    goToPage(currentPage + 1)
  }

  return {
    currentPage,
    totalPages,
    goToPage,
    goToPrevious,
    goToNext,
    canGoPrevious: currentPage > 1,
    canGoNext: currentPage < totalPages
  }
}