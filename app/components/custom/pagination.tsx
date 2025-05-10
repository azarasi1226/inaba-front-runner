import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  Pagination as ShadcnPaging,
} from "~/components/ui/pagination";

type PaginationProps = {
  totalPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination(props: PaginationProps) {
  const pageNumbers = [];
  const maxPageNumbersToShow = 5;
  const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

  let startPage = Math.max(1, props.currentPage - halfMaxPageNumbersToShow);
  let endPage = Math.min(props.totalPage, props.currentPage + halfMaxPageNumbersToShow);

  if (props.currentPage <= halfMaxPageNumbersToShow) {
    endPage = Math.min(props.totalPage, maxPageNumbersToShow);
  } else if (props.currentPage + halfMaxPageNumbersToShow >= props.totalPage) {
    startPage = Math.max(1, props.totalPage - maxPageNumbersToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <ShadcnPaging>
      <PaginationContent>
        {/* ひとつ前のページに戻る */}
        {props.currentPage !== 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => props.onPageChange(props.currentPage - 1)}>
              &lt;
            </PaginationLink>
          </PaginationItem>
        )}

        {/* 最初のページへ */}
        {startPage > 1 && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => props.onPageChange(1)} className="w-10">
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
              onClick={() => props.onPageChange(page)}
              isActive={props.currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 最後のページへ */}
        {endPage < props.totalPage && (
          <>
            {endPage < props.totalPage - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink onClick={() => props.onPageChange(props.totalPage)} className="w-10">
                {props.totalPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* 次のページに進む */}
        {props.currentPage !== props.totalPage && (
          <PaginationItem>
            <PaginationLink onClick={() => props.onPageChange(props.currentPage + 1)}>
              &gt;
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </ShadcnPaging>
  );
}
