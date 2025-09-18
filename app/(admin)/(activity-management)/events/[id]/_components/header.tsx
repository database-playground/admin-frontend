"use client";

import { Badge } from "@/components/ui/badge";
import { useSuspenseQuery } from "@apollo/client/react";
import { EVENT_BY_ID_QUERY } from "./query";

interface HeaderProps {
  id: string;
}

export function Header({ id }: HeaderProps) {
  const { data } = useSuspenseQuery(EVENT_BY_ID_QUERY, {
    variables: { id },
  });

  const event = data.event;

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold tracking-tight">
        事件 #{event.id}
      </h2>
      <div className="flex items-center gap-2">
        <Badge variant="outline">{event.type}</Badge>
        <span className="text-muted-foreground">
          觸發時間：{new Date(event.triggeredAt).toLocaleString("zh-tw")}
        </span>
      </div>
    </div>
  );
}
