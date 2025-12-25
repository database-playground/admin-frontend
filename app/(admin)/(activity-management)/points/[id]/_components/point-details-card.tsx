"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type FragmentType, graphql, useFragment } from "@/gql";

const POINT_DETAILS_CARD_FRAGMENT = graphql(`
  fragment PointDetailsCard on Point {
    id
    points
    description
    grantedAt
  }
`);

interface PointDetailsCardProps {
  fragment: FragmentType<typeof POINT_DETAILS_CARD_FRAGMENT>;
}

export function PointDetailsCard({ fragment }: PointDetailsCardProps) {
  const point = useFragment(POINT_DETAILS_CARD_FRAGMENT, fragment);

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
