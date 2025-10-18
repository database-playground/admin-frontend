"use client";

import { CursorDataTable } from "@/components/data-table/cursor";
import type { Direction } from "@/components/data-table/pagination";
import { useSuspenseQuery } from "@apollo/client/react";
import { useState } from "react";
import { columns, type Question } from "./data-table-columns";
import { QUESTIONS_TABLE_QUERY } from "./query";

export function QuestionsDataTable() {
  const PAGE_SIZE = 20;
  const [cursors, setCursors] = useState<(string | null)[]>([null]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const after = cursors[currentIndex];
  const variables = { first: PAGE_SIZE, after };

  const { data } = useSuspenseQuery(QUESTIONS_TABLE_QUERY, {
    variables,
  });

  const questionList = data?.questions.edges
    ?.map((edge) => {
      const question = edge?.node;
      if (!question) return null;
      return {
        id: question.id,
        title: question.title,
        description: question.description,
        category: question.category,
        difficulty: question.difficulty as "easy" | "medium" | "hard" | "unspecified",
        referenceAnswer: question.referenceAnswer,
        database: question.database ? [question.database] : [], // Convert single database to array for table display
      } satisfies Question;
    })
    .filter((question) => question !== null) ?? [];

  const pageInfo = data?.questions.pageInfo;

  const handlePageChange = (direction: Direction) => {
    if (!pageInfo) return;
    if (direction === "forward" && pageInfo.hasNextPage) {
      const nextCursor = pageInfo.endCursor ?? null;
      setCursors(prev => {
        const newCursors = prev.slice(0, currentIndex + 1);
        newCursors.push(nextCursor);
        return newCursors;
      });
      setCurrentIndex(currentIndex + 1);
    } else if (direction === "backward" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <CursorDataTable
      columns={columns}
      data={questionList}
      totalCount={data?.questions.totalCount ?? 0}
      hasNextPage={!!pageInfo?.hasNextPage}
      hasPreviousPage={currentIndex > 0}
      onPageChange={handlePageChange}
    />
  );
}
