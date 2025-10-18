"use client";

import { CursorDataTable } from "@/components/data-table/cursor";
import type { Direction } from "@/components/data-table/pagination";
import { useSuspenseQuery } from "@apollo/client/react";
import { useState } from "react";
import { columns, type Point } from "./data-table-columns";
import { POINTS_TABLE_QUERY } from "./query";

export function PointsDataTable() {
  const PAGE_SIZE = 20;
  const [cursors, setCursors] = useState<(string | null)[]>([null]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const after = cursors[currentIndex];
  const variables = { first: PAGE_SIZE, after };

  const { data } = useSuspenseQuery(POINTS_TABLE_QUERY, {
    variables,
  });

  const pointsList = data?.points.edges
    ?.map((edge) => {
      const point = edge?.node;
      if (!point) return null;
      return {
        id: point.id,
        user: {
          id: point.user.id,
          name: point.user.name,
        },
        points: point.points,
        description: point.description ?? "",
        grantedAt: point.grantedAt,
      } satisfies Point;
    })
    .filter((point) => point !== null) ?? [];

  const pageInfo = data?.points.pageInfo;

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
      data={pointsList}
      totalCount={data?.points.totalCount ?? 0}
      hasNextPage={!!pageInfo?.hasNextPage}
      hasPreviousPage={currentIndex > 0}
      onPageChange={handlePageChange}
    />
  );
}
