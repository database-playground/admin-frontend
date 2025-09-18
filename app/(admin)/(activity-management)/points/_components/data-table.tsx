"use client";

import { CursorDataTable } from "@/components/data-table/cursor";
import type { Direction } from "@/components/data-table/pagination";
import { useSuspenseQuery } from "@apollo/client/react";
import { useState } from "react";
import { columns, type Point } from "./data-table-columns";
import { POINTS_TABLE_QUERY } from "./query";

export function PointsDataTable() {
  const PAGE_SIZE = 10;
  const [after, setAfter] = useState<string | null>(null);
  const [before, setBefore] = useState<string | null>(null);
  const [direction, setDirection] = useState<Direction>("backward");

  const variables = direction === "backward"
    ? { first: PAGE_SIZE, after, last: undefined, before: undefined }
    : { last: PAGE_SIZE, before, first: undefined, after: undefined };

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
      data={pointsList}
      totalCount={data?.points.totalCount ?? 0}
      hasNextPage={!!pageInfo?.hasNextPage}
      hasPreviousPage={!!pageInfo?.hasPreviousPage}
      onPageChange={handlePageChange}
    />
  );
}
