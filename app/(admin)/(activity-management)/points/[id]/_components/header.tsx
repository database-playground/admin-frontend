"use client";

import { Badge } from "@/components/ui/badge";
import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";

const POINT_HEADER_QUERY = graphql(`
  query PointHeader($id: ID!) {
    pointGrant(id: $id) {
      id
      points
      grantedAt
    }
  }
`);

interface HeaderProps {
  id: string;
}

export function Header({ id }: HeaderProps) {
  const { data } = useSuspenseQuery(POINT_HEADER_QUERY, {
    variables: { id },
  });

  const point = data.pointGrant;

  const isPositive = point.points >= 0;

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold tracking-tight">
        積分記錄 #{point.id}
      </h2>
      <div className="flex items-center gap-2">
        <Badge variant={isPositive ? "default" : "destructive"}>
          {isPositive ? "+" : ""}
          {point.points} 積分
        </Badge>
        <span className="text-muted-foreground">
          獲得時間：{new Date(point.grantedAt).toLocaleString("zh-tw")}
        </span>
      </div>
    </div>
  );
}
