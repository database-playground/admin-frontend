"use client";

import { CardLayout } from "@/components/card-layout";
import { StyledLink } from "@/components/ui/link";
import { useSuspenseQuery } from "@apollo/client/react";
import { USER_GROUP_QUERY } from "./query";

export function GroupsCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(USER_GROUP_QUERY, {
    variables: { id },
  });

  return (
    <CardLayout title="所屬群組" description="這個使用者所屬的群組。">
      <p>{data.user.group?.name}</p>
      <p className="text-sm text-muted-foreground">
        <StyledLink href={`/groups/${data.user.group?.id}`}>
          詳細資訊和權限 →
        </StyledLink>
      </p>
    </CardLayout>
  );
}
