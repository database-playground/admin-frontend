"use client";

import { CardLayout } from "@/components/card-layout";
import { StyledLink } from "@/components/ui/link";
import { type FragmentType, graphql, useFragment } from "@/gql";

const USER_GROUPS_CARD_FRAGMENT = graphql(`
  fragment UserGroupsCard on User {
    group {
      id
      name
    }
  }
`);

export function GroupsCard({ fragment }: { fragment: FragmentType<typeof USER_GROUPS_CARD_FRAGMENT> }) {
  const { group } = useFragment(USER_GROUPS_CARD_FRAGMENT, fragment);

  return (
    <CardLayout title="所屬群組" description="這個使用者所屬的群組。">
      <p>{group?.name}</p>
      <p className="text-sm text-muted-foreground">
        <StyledLink href={`/groups/${group?.id}`}>
          詳細資訊和權限 →
        </StyledLink>
      </p>
    </CardLayout>
  );
}
