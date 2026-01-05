"use client";

import { Input } from "@/components/ui/input";

import { DataTableSkeleton } from "@/components/data-table/skeleton";
import { useDebouncedValue } from "foxact/use-debounced-value";
import { Suspense, useState } from "react";
import { CheatRecordsDataTable } from "./data-table";

export default function FilterableDataTable() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 200);

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center gap-4">
        <Input
          placeholder="搜尋原因、使用者姓名或電子郵件"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <Suspense fallback={<DataTableSkeleton />}>
        <CheatRecordsDataTable query={debouncedQuery} />
      </Suspense>
    </div>
  );
}
