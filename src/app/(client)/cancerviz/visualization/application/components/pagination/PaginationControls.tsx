"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/shadcn/pagination";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationControls = ({ currentPage, totalPages, onPageChange }: PaginationControlsProps) => {
  if (totalPages <= 1) return null;

  const generatePaginationItems = () => {
    const items = [];
    const showAround = 2;

    items.push(
      <PaginationItem key="first">
        <PaginationLink
          onClick={() => onPageChange(0)}
          isActive={currentPage === 0}
          aria-label="Go to first page"
          className="hover:bg-muted/50 transition-colors"
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    let startPage = Math.max(1, currentPage - showAround);
    let endPage = Math.min(totalPages - 2, currentPage + showAround);

    if (currentPage < showAround + 1) {
      endPage = Math.min(totalPages - 2, showAround * 2 + 1);
    }

    if (currentPage > totalPages - (showAround + 2)) {
      startPage = Math.max(1, totalPages - (showAround * 2 + 2));
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="dots-1">
          <PaginationLink disabled className="cursor-default">...</PaginationLink>
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => onPageChange(i)}
            isActive={currentPage === i}
            aria-label={`Go to page ${i + 1}`}
            className="hover:bg-muted/50 transition-colors"
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages - 2) {
      items.push(
        <PaginationItem key="dots-2">
          <PaginationLink disabled className="cursor-default">...</PaginationLink>
        </PaginationItem>
      );
    }

    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            onClick={() => onPageChange(totalPages - 1)}
            isActive={currentPage === totalPages - 1}
            aria-label={`Go to last page, page ${totalPages}`}
            className="hover:bg-muted/50 transition-colors"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination>
      <PaginationContent className="flex flex-wrap justify-center sm:justify-start">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className={`${currentPage === 0 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-slate-100"} transition-colors`}
            aria-label="Go to previous page"
          />
        </PaginationItem>

        {generatePaginationItems()}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className={`${currentPage === totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-slate-100"} transition-colors`}
            aria-label="Go to next page"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
