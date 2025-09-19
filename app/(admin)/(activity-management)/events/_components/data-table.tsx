"use client";

import { CursorDataTable } from "@/components/data-table/cursor";
import type { Direction } from "@/components/data-table/pagination";
import { useSuspenseQuery } from "@apollo/client/react";
import { useState } from "react";
import { columns, type Event } from "./data-table-columns";
import { EVENTS_TABLE_QUERY } from "./query";

export function EventsDataTable() {
  const PAGE_SIZE = 10;
  const [cursors, setCursors] = useState<(string | null)[]>([null]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const after = cursors[currentIndex];
  const variables = { first: PAGE_SIZE, after };

  const { data } = useSuspenseQuery(EVENTS_TABLE_QUERY, {
    variables,
  });

  const eventList = data?.events.edges
    ?.map((edge) => {
      const event = edge?.node;
      if (!event) return null;
      return {
        id: event.id,
        user: {
          id: event.user.id,
          name: event.user.name,
        },
        type: event.type,
        triggeredAt: event.triggeredAt,
      } satisfies Event;
    })
    .filter((event) => event !== null) ?? [];

  const pageInfo = data?.events.pageInfo;

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
      data={eventList}
      totalCount={data?.events.totalCount ?? 0}
      hasNextPage={!!pageInfo?.hasNextPage}
      hasPreviousPage={currentIndex > 0}
      onPageChange={handlePageChange}
    />
  );
}
