"use client";

import { CursorDataTable } from "@/components/data-table/cursor";
import type { Direction } from "@/components/data-table/pagination";
import { useSuspenseQuery } from "@apollo/client/react";
import type { VariablesOf } from "@graphql-typed-document-node/core";
import { useState } from "react";
import { columns, type CheatRecord } from "./data-table-columns";
import { CHEAT_RECORDS_TABLE_QUERY } from "./query";

export function CheatRecordsDataTable({ query }: { query?: string }) {
  const PAGE_SIZE = 20;
  const [cursors, setCursors] = useState<(string | null)[]>([null]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const after = cursors[currentIndex];

  const variables = {
    first: PAGE_SIZE,
    after,
    where: query
      ? {
        or: [
          { reasonContains: query },
          { hasUserWith: [{ nameContains: query }] },
          { hasUserWith: [{ emailContains: query }] },
        ],
      }
      : undefined,
  } satisfies VariablesOf<typeof CHEAT_RECORDS_TABLE_QUERY>;

  const { data } = useSuspenseQuery(CHEAT_RECORDS_TABLE_QUERY, {
    variables,
  });

  const recordList = data?.cheatRecords.edges
    ?.map((edge) => {
      const record = edge?.node;
      if (!record) return null;
      return {
        id: record.id,
        reason: record.reason,
        cheatedAt: record.cheatedAt,
        resolvedAt: record.resolvedAt,
        resolvedReason: record.resolvedReason,
        user: {
          id: record.user.id,
          name: record.user.name,
          email: record.user.email,
          avatar: record.user.avatar,
        },
      } satisfies CheatRecord;
    })
    .filter((record) => record !== null) ?? [];

  const pageInfo = data?.cheatRecords.pageInfo;

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
      data={recordList}
      totalCount={data?.cheatRecords.totalCount ?? 0}
      hasNextPage={!!pageInfo?.hasNextPage}
      hasPreviousPage={currentIndex > 0}
      onPageChange={handlePageChange}
    />
  );
}
