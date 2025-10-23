"use client";

import { Input } from "@/components/ui/input";

import { DataTableSkeleton } from "@/components/data-table/skeleton";
import { useDebouncedValue } from "foxact/use-debounced-value";
import { Suspense, useState } from "react";
import { SubmissionsDataTable } from "./data-table";

export default function FilterableDataTable() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 200);

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center gap-4">
        <Input
          placeholder="搜尋使用者名稱或 e-mail"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <Suspense fallback={<DataTableSkeleton />}>
        <SubmissionsDataTable query={debouncedQuery} />
      </Suspense>
    </div>
  );
}
