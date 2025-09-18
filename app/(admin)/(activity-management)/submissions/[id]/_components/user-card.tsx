"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StyledLink } from "@/components/ui/link";
import { useSuspenseQuery } from "@apollo/client/react";
import { SUBMISSION_BY_ID_QUERY } from "./query";

interface UserCardProps {
  id: string;
}

export function UserCard({ id }: UserCardProps) {
  const { data } = useSuspenseQuery(SUBMISSION_BY_ID_QUERY, {
    variables: { id },
  });

  const submission = data.submission;

  return (
    <Card>
      <CardHeader>
        <CardTitle>使用者資訊</CardTitle>
        <CardDescription>查看提交此查詢的使用者</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          {submission.user.name} (#{submission.user.id})
        </div>
        <div className="text-sm text-muted-foreground">
          <StyledLink href={`/users/${submission.user.id}`}>
            檢視使用者資訊 →
          </StyledLink>
        </div>
      </CardContent>
    </Card>
  );
}
