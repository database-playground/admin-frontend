"use client";

import { Input } from "@/components/ui/input";

import { DataTableSkeleton } from "@/components/data-table/skeleton";
import { useDebouncedValue } from "foxact/use-debounced-value";
import { Suspense, useState } from "react";
import { GroupDataTable } from "./data-table";

export default function FilterableDataTable() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 200);

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center gap-4">
        <Input
          placeholder="搜尋群組名稱"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <Suspense fallback={<DataTableSkeleton />}>
        <GroupDataTable query={debouncedQuery} />
      </Suspense>
    </div>
  );
}
