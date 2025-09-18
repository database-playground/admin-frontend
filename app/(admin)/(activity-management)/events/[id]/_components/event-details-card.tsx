"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSuspenseQuery } from "@apollo/client/react";
import { EVENT_BY_ID_QUERY } from "./query";

interface EventDetailsCardProps {
  id: string;
}

export function EventDetailsCard({ id }: EventDetailsCardProps) {
  const { data } = useSuspenseQuery(EVENT_BY_ID_QUERY, {
    variables: { id },
  });

  const event = data?.event;

  if (!event) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>事件詳情</CardTitle>
          <CardDescription>查看事件的詳細資訊和負載資料</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">找不到事件記錄</p>
        </CardContent>
      </Card>
    );
  }

  let payloadData = null;
  try {
    payloadData = event.payload ? JSON.parse(event.payload) : null;
  } catch {
    // If payload is not valid JSON, treat as string
    payloadData = event.payload;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>事件詳情</CardTitle>
        <CardDescription>查看事件的詳細資訊和負載資料</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="mb-2 font-semibold">事件類型</h4>
          <p className="text-sm text-muted-foreground">{event.type}</p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">觸發時間</h4>
          <p className="text-sm text-muted-foreground">
            {new Date(event.triggeredAt).toLocaleString("zh-tw")}
          </p>
        </div>

        {payloadData && (
          <div>
            <h4 className="mb-2 font-semibold">負載資料</h4>
            <pre className="rounded-md bg-muted p-4 text-sm whitespace-pre-wrap">
              <code>
                {typeof payloadData === "string"
                  ? payloadData
                  : JSON.stringify(payloadData, null, 2)}
              </code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
