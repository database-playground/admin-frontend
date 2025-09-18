"use client";

import { Badge } from "@/components/ui/badge";
import { useSuspenseQuery } from "@apollo/client/react";
import { EVENT_BY_ID_QUERY } from "./query";

interface HeaderProps {
  id: string;
}

const eventTypeMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  LOGIN: { label: "登入", variant: "default" },
  LOGOUT: { label: "登出", variant: "secondary" },
  SUBMISSION: { label: "提交", variant: "outline" },
  SCORE: { label: "計分", variant: "default" },
  ERROR: { label: "錯誤", variant: "destructive" },
};

export function Header({ id }: HeaderProps) {
  const { data } = useSuspenseQuery(EVENT_BY_ID_QUERY, {
    variables: { id },
  });

  const event = data?.event;

  if (!event) {
    return (
      <div>
        <h2 className="text-2xl font-bold tracking-tight">事件不存在</h2>
      </div>
    );
  }

  const typeInfo = eventTypeMap[event.type] || { label: event.type, variant: "outline" as const };

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold tracking-tight">
        事件 #{event.id}
      </h2>
      <div className="flex items-center gap-2">
        <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>
        <span className="text-muted-foreground">
          觸發時間：{new Date(event.triggeredAt).toLocaleString("zh-tw")}
        </span>
      </div>
    </div>
  );
}
