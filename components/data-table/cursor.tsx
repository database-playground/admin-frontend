import { type ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import DataTablePagination from "./pagination";
import { DataTableMain } from "./table";

interface CursorDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (direction: "forward" | "backward") => void;
}

export function CursorDataTable<TData, TValue>({
  columns,
  data,
  totalCount,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: CursorDataTableProps<TData, TValue>) {
  "use no memo";

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: totalCount,
    debugTable: true,
  });

  return (
    <div>
      <DataTableMain table={table} columns={columns} />
      <DataTablePagination
        totalCount={totalCount}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
