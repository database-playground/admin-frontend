"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StyledLink } from "@/components/ui/link";
import { type FragmentType, graphql, useFragment } from "@/gql";

const POINT_USER_CARD_FRAGMENT = graphql(`
  fragment PointUserCard on Point {
    user {
      id
      name
    }
  }
`);

interface UserCardProps {
  fragment: FragmentType<typeof POINT_USER_CARD_FRAGMENT>;
}

export function UserCard({ fragment }: UserCardProps) {
  const { user } = useFragment(POINT_USER_CARD_FRAGMENT, fragment);

  return (
    <Card>
      <CardHeader>
        <CardTitle>使用者資訊</CardTitle>
        <CardDescription>查看獲得此積分的使用者</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          {user.name} (#{user.id})
        </div>
        <div className="text-sm text-muted-foreground">
          <StyledLink href={`/users/${user.id}`}>
            檢視使用者資訊 →
          </StyledLink>
        </div>
      </CardContent>
    </Card>
  );
}
