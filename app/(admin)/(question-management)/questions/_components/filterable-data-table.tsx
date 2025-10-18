"use client";

import { Input } from "@/components/ui/input";
import { SelectItem } from "@/components/ui/select";

import { DataTableSkeleton } from "@/components/data-table/skeleton";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuestionDifficulty } from "@/gql/graphql";
import { useDebouncedValue } from "foxact/use-debounced-value";
import { Suspense, useState } from "react";
import { type DifficultyFilter, QuestionsDataTable } from "./data-table";

export default function FilterableDataTable() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");

  const debouncedQuery = useDebouncedValue(query, 200);

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center gap-4">
        <Input
          placeholder="搜尋題目的標題、分類和描述……"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select
          value={difficulty}
          onValueChange={(value) => setDifficulty(value as DifficultyFilter)}
        >
          <SelectTrigger>
            <SelectValue placeholder="選擇難度" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value={QuestionDifficulty.Easy}>簡單</SelectItem>
            <SelectItem value={QuestionDifficulty.Medium}>中等</SelectItem>
            <SelectItem value={QuestionDifficulty.Hard}>困難</SelectItem>
            <SelectItem value={QuestionDifficulty.Unspecified}>
              未指定
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Suspense fallback={<DataTableSkeleton />}>
        <QuestionsDataTable query={debouncedQuery} difficulty={difficulty} />
      </Suspense>
    </div>
  );
}
