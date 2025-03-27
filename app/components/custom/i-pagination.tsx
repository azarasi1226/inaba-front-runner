import { Button } from "~/components/ui/button";
import { cn } from "../../lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination"

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function IPagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  const pageNumbers = [];
  const maxPageNumbersToShow = 5;
  const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

  let startPage = Math.max(1, currentPage - halfMaxPageNumbersToShow);
  let endPage = Math.min(totalPages, currentPage + halfMaxPageNumbersToShow);

  if (currentPage <= halfMaxPageNumbersToShow) {
    endPage = Math.min(totalPages, maxPageNumbersToShow);
  } else if (currentPage + halfMaxPageNumbersToShow >= totalPages) {
    startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* ひとつ前のページに戻る */}
        {currentPage != 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(currentPage - 1)}
            >
              &lt;
            </PaginationLink>
          </PaginationItem>
        )}

        {/* 最初のページへ */}
        {startPage > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageChange(1)}
                className="w-10"
              >
                1
              </PaginationLink>
            </PaginationItem>
            {startPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* ページ番号 */}
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              key={page}

              onClick={() => onPageChange(page)}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}


        {/* 最後のページへ */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                onClick={() => onPageChange(totalPages)}
                className="w-10"
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* 次のページに進む */}
        {currentPage != totalPages && (
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(currentPage + 1)}
            >
              &gt;
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}