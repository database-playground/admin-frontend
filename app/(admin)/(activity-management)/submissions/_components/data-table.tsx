"use client";

import { CursorDataTable } from "@/components/data-table/cursor";
import type { Direction } from "@/components/data-table/pagination";
import { useSuspenseQuery } from "@apollo/client/react";
import { useState } from "react";
import { columns, type Submission } from "./data-table-columns";
import { SUBMISSIONS_TABLE_QUERY } from "./query";

export function SubmissionsDataTable() {
  const PAGE_SIZE = 10;
  const [after, setAfter] = useState<string | null>(null);
  const [before, setBefore] = useState<string | null>(null);
  const [direction, setDirection] = useState<Direction>("backward");

  const variables = direction === "backward"
    ? { first: PAGE_SIZE, after, last: undefined, before: undefined }
    : { last: PAGE_SIZE, before, first: undefined, after: undefined };

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
      setAfter(pageInfo.endCursor ?? null);
      setBefore(null);
      setDirection("forward");
    } else if (direction === "backward" && pageInfo.hasPreviousPage) {
      setBefore(pageInfo.startCursor ?? null);
      setAfter(null);
      setDirection("backward");
    }
  };

  return (
    <CursorDataTable
      columns={columns}
      data={submissionList}
      totalCount={data?.submissions.totalCount ?? 0}
      hasNextPage={!!pageInfo?.hasNextPage}
      hasPreviousPage={!!pageInfo?.hasPreviousPage}
      onPageChange={handlePageChange}
    />
  );
}
