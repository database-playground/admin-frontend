"use client";

import { Input } from "@/components/ui/input";

import { DataTableSkeleton } from "@/components/data-table/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubmissionStatus } from "@/gql/graphql";
import { useDebouncedValue } from "foxact/use-debounced-value";
import { Suspense, useState } from "react";
import { SubmissionsDataTable, type SubmissionStatusFilter } from "./data-table";

export default function FilterableDataTable() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<SubmissionStatusFilter>("all");
  const debouncedQuery = useDebouncedValue(query, 200);

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center gap-4">
        <Input
          placeholder="搜尋使用者名稱、e-mail 或題目名稱"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select value={status} onValueChange={(value) => setStatus(value as SubmissionStatusFilter)}>
          <SelectTrigger>
            <SelectValue placeholder="選擇解題狀態" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value={SubmissionStatus.Failed}>錯誤</SelectItem>
            <SelectItem value={SubmissionStatus.Success}>成功</SelectItem>
            <SelectItem value={SubmissionStatus.Pending}>執行中</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Suspense fallback={<DataTableSkeleton />}>
        <SubmissionsDataTable query={debouncedQuery} status={status} />
      </Suspense>
    </div>
  );
}
