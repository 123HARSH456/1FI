import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

export default function Pagination({
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 6,
  onPageChange,
  className = ''
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // If 1 or fewer pages, no pagination is necessary
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  const handlePageClick = (page) => {
    if (typeof page === 'number' && page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange && onPageChange(page);
    }
  };

  return (
    <nav 
      className={`pagination-container ${className}`} 
      aria-label="Marketplace pagination"
    >
      {/* Previous Button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`pagination-btn pagination-nav-btn ${currentPage <= 1 ? 'is-disabled' : ''}`}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
      </button>

      {/* Page Numbers */}
      <div className="pagination-pages">
        {pages.map((p, idx) => {
          if (p === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="pagination-ellipsis" aria-hidden="true">
                •••
              </span>
            );
          }

          const isActive = p === currentPage;
          return (
            <button
              key={`page-${p}`}
              onClick={() => handlePageClick(p)}
              className={`pagination-btn pagination-page-btn ${isActive ? 'is-active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Go to page ${p}`}
            >
              {p}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`pagination-btn pagination-nav-btn ${currentPage >= totalPages ? 'is-disabled' : ''}`}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4 stroke-[2.2]" />
      </button>
    </nav>
  );
}
