"use client";

import { CursorDataTable } from "@/components/data-table/cursor";
import type { Direction } from "@/components/data-table/pagination";
import { useSuspenseQuery } from "@apollo/client/react";
import type { VariablesOf } from "@graphql-typed-document-node/core";
import { useState } from "react";
import { columns, type User } from "./data-table-columns";
import { USERS_TABLE_QUERY } from "./query";

export function UsersDataTable({ query }: { query?: string }) {
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
          { nameContains: query },
          { emailContains: query },
        ],
      }
      : undefined,
  } satisfies VariablesOf<typeof USERS_TABLE_QUERY>;

  const { data } = useSuspenseQuery(USERS_TABLE_QUERY, {
    variables,
  });

  const userList = data?.users.edges
    ?.map((edge) => {
      const user = edge?.node;
      if (!user) return null;
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        group: {
          id: user.group.id,
          slug: user.group.name,
        },
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      } satisfies User;
    })
    .filter((user) => user !== null) ?? [];

  const pageInfo = data?.users.pageInfo;

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
      data={userList}
      totalCount={data?.users.totalCount ?? 0}
      hasNextPage={!!pageInfo?.hasNextPage}
      hasPreviousPage={currentIndex > 0}
      onPageChange={handlePageChange}
    />
  );
}
