"use client";

import { CursorDataTable } from "@/components/data-table/cursor";
import type { Direction } from "@/components/data-table/pagination";
import { useSuspenseQuery } from "@apollo/client/react";
import { useState } from "react";
import { columns, type Submission } from "./data-table-columns";
import { SUBMISSIONS_TABLE_QUERY } from "./query";

export function SubmissionsDataTable() {
  const PAGE_SIZE = 10;
  const [cursors, setCursors] = useState<(string | null)[]>([null]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const after = cursors[currentIndex];
  const variables = { first: PAGE_SIZE, after };

  const { data } = useSuspenseQuery(SUBMISSIONS_TABLE_QUERY, {
    variables,
  });

  const submissionList = data?.submissions.edges
    ?.map((edge) => {
      const submission = edge?.node;
      if (!submission) return null;
      return {
        id: submission.id,
        submittedCode: submission.submittedCode,
        status: submission.status,
        user: {
          id: submission.user.id,
          name: submission.user.name,
        },
        question: {
          id: submission.question.id,
          title: submission.question.title,
        },
      } satisfies Submission;
    })
    .filter((submission) => submission !== null) ?? [];

  const pageInfo = data?.submissions.pageInfo;

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
      data={submissionList}
      totalCount={data?.submissions.totalCount ?? 0}
      hasNextPage={!!pageInfo?.hasNextPage}
      hasPreviousPage={currentIndex > 0}
      onPageChange={handlePageChange}
    />
  );
}
