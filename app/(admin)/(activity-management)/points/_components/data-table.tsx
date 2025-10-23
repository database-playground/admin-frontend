"use client";

import { CursorDataTable } from "@/components/data-table/cursor";
import type { Direction } from "@/components/data-table/pagination";
import { graphql, useFragment as readFragment } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import type { VariablesOf } from "@graphql-typed-document-node/core";
import { useState } from "react";
import { columns, type Point } from "./data-table-columns";

export const POINTS_TABLE_QUERY = graphql(`
  query PointsTable(
    $first: Int
    $after: Cursor
    $last: Int
    $before: Cursor
    $where: PointWhereInput
  ) {
    points(
      first: $first
      after: $after
      last: $last
      before: $before
      where: $where
      orderBy: { field: GRANTED_AT, direction: DESC }
    ) {
      edges {
        node {
          id
          ...PointsTableRow
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);

const POINTS_TABLE_ROW_FRAGEMENT = graphql(`
  fragment PointsTableRow on Point {
    id
    user {
      id
      name
    }
    points
    description
    grantedAt
  }
`);

export function PointsDataTable({ query }: { query?: string }) {
  const PAGE_SIZE = 20;
  const [cursors, setCursors] = useState<(string | null)[]>([null]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const after = cursors[currentIndex];

  const variables = {
    first: PAGE_SIZE,
    after,
    where: query ? { descriptionContains: query } : undefined,
  } satisfies VariablesOf<typeof POINTS_TABLE_QUERY>;

  const { data } = useSuspenseQuery(POINTS_TABLE_QUERY, {
    variables,
  });

  const pointsList = data?.points.edges
    ?.map((edge) => {
      const node = edge?.node;
      if (!node) return null;

      const point = readFragment(POINTS_TABLE_ROW_FRAGEMENT, node);

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
      data={pointsList}
      totalCount={data?.points.totalCount ?? 0}
      hasNextPage={!!pageInfo?.hasNextPage}
      hasPreviousPage={currentIndex > 0}
      onPageChange={handlePageChange}
    />
  );
}
