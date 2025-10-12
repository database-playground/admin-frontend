import { type ColumnDef, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";

import DataTablePagination from "./pagination";
import { DataTableMain } from "./table";

interface GeneralDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function GeneralDataTable<TData, TValue>({
  columns,
  data,
}: GeneralDataTableProps<TData, TValue>) {
  "use no memo";

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <DataTableMain table={table} columns={columns} />
      <DataTablePagination
        totalCount={table.getRowCount()}
        hasNextPage={table.getCanNextPage()}
        hasPreviousPage={table.getCanPreviousPage()}
        onPageChange={(direction) => {
          switch (direction) {
            case "forward":
              table.nextPage();
              break;
            case "backward":
              table.previousPage();
              break;
          }
        }}
      />
    </div>
  );
}
