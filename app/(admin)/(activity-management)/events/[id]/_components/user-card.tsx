"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StyledLink } from "@/components/ui/link";
import { useSuspenseQuery } from "@apollo/client/react";
import { EVENT_BY_ID_QUERY } from "./query";

interface UserCardProps {
  id: string;
}

export function UserCard({ id }: UserCardProps) {
  const { data } = useSuspenseQuery(EVENT_BY_ID_QUERY, {
    variables: { id },
  });

  const event = data?.event;

  if (!event) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>使用者資訊</CardTitle>
          <CardDescription>查看觸發此事件的使用者</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">找不到使用者資訊</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>使用者資訊</CardTitle>
        <CardDescription>查看觸發此事件的使用者</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          {event.user.name} (#{event.user.id})
        </div>
        <div className="text-sm text-muted-foreground">
          <StyledLink href={`/users/${event.user.id}`}>
            檢視使用者資訊 →
          </StyledLink>
        </div>
      </CardContent>
    </Card>
  );
}
