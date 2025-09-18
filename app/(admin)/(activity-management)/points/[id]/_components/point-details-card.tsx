"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSuspenseQuery } from "@apollo/client/react";
import { POINT_BY_ID_QUERY } from "./query";

interface PointDetailsCardProps {
  id: string;
}

export function PointDetailsCard({ id }: PointDetailsCardProps) {
  const { data } = useSuspenseQuery(POINT_BY_ID_QUERY, {
    variables: { id },
  });

  const point = data.pointGrant;

  const isPositive = point.points >= 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>積分詳情</CardTitle>
        <CardDescription>查看積分獲得的詳細資訊</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="mb-2 font-semibold">積分數量</h4>
          <div
            className={`
              text-2xl font-bold
              ${isPositive ? "text-green-600" : `text-red-600`}
            `}
          >
            {isPositive ? "+" : ""}
            {point.points}
          </div>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">描述</h4>
          <p className="text-sm text-muted-foreground">{point.description}</p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">獲得時間</h4>
          <p className="text-sm text-muted-foreground">
            {new Date(point.grantedAt).toLocaleString("zh-tw")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
