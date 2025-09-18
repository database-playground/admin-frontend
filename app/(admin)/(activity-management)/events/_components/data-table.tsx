"use client";

import { CursorDataTable } from "@/components/data-table/cursor";
import type { Direction } from "@/components/data-table/pagination";
import { useSuspenseQuery } from "@apollo/client/react";
import { useState } from "react";
import { columns, type Event } from "./data-table-columns";
import { EVENTS_TABLE_QUERY } from "./query";

export function EventsDataTable() {
  const PAGE_SIZE = 10;
  const [after, setAfter] = useState<string | null>(null);
  const [before, setBefore] = useState<string | null>(null);
  const [direction, setDirection] = useState<Direction>("backward");

  const variables = direction === "backward"
    ? { first: PAGE_SIZE, after, last: undefined, before: undefined }
    : { last: PAGE_SIZE, before, first: undefined, after: undefined };

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
      data={eventList}
      totalCount={data?.events.totalCount ?? 0}
      hasNextPage={!!pageInfo?.hasNextPage}
      hasPreviousPage={!!pageInfo?.hasPreviousPage}
      onPageChange={handlePageChange}
    />
  );
}
