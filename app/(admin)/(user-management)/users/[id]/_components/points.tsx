"use client";

import { CardLayout } from "@/components/card-layout";
import { type FragmentType, graphql, useFragment } from "@/gql";
import { Trophy } from "lucide-react";

const USER_POINTS_CARD_FRAGMENT = graphql(`
  fragment UserPointsCard on User {
    id
    totalPoints

    points(first: 5, orderBy: { field: GRANTED_AT, direction: DESC }) {
      edges {
        node {
          ...UserPointHistoryLine
          id
        }
      }
    }
  }
`);

const USER_POINT_HISTORY_LINE_FRAGMENT = graphql(`
  fragment UserPointHistoryLine on Point {
    id
    description
    grantedAt
    points
  }
`);

export function PointsCard({
  fragment,
}: {
  fragment: FragmentType<typeof USER_POINTS_CARD_FRAGMENT>;
}) {
  const { totalPoints, points } = useFragment(
    USER_POINTS_CARD_FRAGMENT,
    fragment,
  );

  return (
    <CardLayout title="總積分" description="這個使用者的總積分與最近積分紀錄。">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <div>
            <p className="text-3xl font-bold">{totalPoints}</p>
            <p className="text-sm text-muted-foreground">積分</p>
          </div>
        </div>

        {points?.edges && points.edges.length > 0 && (
          <div className="border-t pt-4">
            <p className="mb-2 text-sm font-medium">最近積分紀錄</p>
            <div className="space-y-2">
              {points.edges
                .map((edge) => {
                  if (!edge?.node) return null;
                  return <PointHistoryLine key={edge.node.id} fragment={edge.node} />;
                })}
            </div>
          </div>
        )}
      </div>
    </CardLayout>
  );
}

function PointHistoryLine({
  fragment,
}: {
  fragment: FragmentType<typeof USER_POINT_HISTORY_LINE_FRAGMENT>;
}) {
  const { points, description, grantedAt } = useFragment(
    USER_POINT_HISTORY_LINE_FRAGMENT,
    fragment,
  );

  return (
    <div className={`flex items-start justify-between gap-2 text-sm`}>
      <div className="flex-1">
        <p className="font-medium">{description || "積分取得"}</p>
        <p className="text-xs text-muted-foreground">
          {new Date(grantedAt).toLocaleString("zh-TW", {
            timeZone: "Asia/Taipei",
          })}
        </p>
      </div>
      <Point point={points} />
    </div>
  );
}

function Point({ point }: { point: number }) {
  const pointAbs = Math.abs(point);

  if (point > 0) {
    return <span className="font-bold text-green-600">+{pointAbs}</span>;
  }

  if (point < 0) {
    return <span className="font-bold text-red-600">-{pointAbs}</span>;
  }

  return <span className="text-muted-foreground">{pointAbs}</span>;
}
