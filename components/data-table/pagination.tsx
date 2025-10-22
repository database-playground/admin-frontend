import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export type Direction = "forward" | "backward";

export interface DataTablePaginationProps {
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (direction: Direction) => void;
}

export default function DataTablePagination({
  totalCount,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: DataTablePaginationProps) {
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (direction: Direction) => {
    startTransition(() => {
      onPageChange(direction);
    });
  };

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        總共 {totalCount} 筆資料
      </div>
      <div className="flex items-center justify-end gap-x-2">
        {isPending && <Spinner className="size-4" />}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange("backward")}
          disabled={!hasPreviousPage}
        >
          <ChevronLeft className="h-4 w-4" />
          上一頁
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange("forward")}
          disabled={!hasNextPage}
        >
          下一頁
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
