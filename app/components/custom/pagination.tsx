import { Button } from "~/components/ui/button";
import { cn } from "../../lib/utils";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default  function OrgPagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {/* 前のページボタン */}
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ←
      </Button>

      {/* ページ番号 */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => onPageChange(page)}
          className={cn("w-10", currentPage === page && "bg-primary text-white")}
        >
          {page}
        </Button>
      ))}

      {/* 次のページボタン */}
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        →
      </Button>
    </div>
  );
}