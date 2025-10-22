"use client";

import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { AuditInfoCard } from "./audit-info";
import { GroupsCard } from "./groups";

const USER_CARDS_QUERY = graphql(`
  query UserCards($id: ID!) {
    user(id: $id) {
      id
      ...UserGroupsCard
      ...UserAuditInfoCard
    }
  }
`);

export function UserCards({ id }: { id: string }) {
  const { data } = useSuspenseQuery(USER_CARDS_QUERY, {
    variables: { id },
  });

  const fragment = data.user;

  return (
    <div
      className={`
        grid grid-cols-1 gap-4
        lg:grid-cols-2
      `}
    >
      <GroupsCard fragment={fragment} />
      <AuditInfoCard fragment={fragment} />
    </div>
  );
}
