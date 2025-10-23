"use client";

import { CursorDataTable } from "@/components/data-table/cursor";
import type { Direction } from "@/components/data-table/pagination";
import type { SubmissionStatus } from "@/gql/graphql";
import { useSuspenseQuery } from "@apollo/client/react";
import type { VariablesOf } from "@graphql-typed-document-node/core";
import { useState } from "react";
import { columns, type Submission } from "./data-table-columns";
import { SUBMISSIONS_TABLE_QUERY } from "./query";

export type SubmissionStatusFilter = SubmissionStatus | "all";

export function SubmissionsDataTable({
  query,
  status,
}: {
  query?: string;
  status?: SubmissionStatusFilter;
}) {
  const PAGE_SIZE = 20;
  const [cursors, setCursors] = useState<(string | null)[]>([null]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const after = cursors[currentIndex];
  const variables = {
    first: PAGE_SIZE,
    after,
    where: {
      or: [
        { hasUserWith: [{ nameContains: query }] },
        { hasUserWith: [{ emailContains: query }] },
        { hasQuestionWith: [{ titleContains: query }] },
      ],
      status: status === "all" ? undefined : status,
    },
  } satisfies VariablesOf<typeof SUBMISSIONS_TABLE_QUERY>;

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
      setCursors((prev) => {
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
