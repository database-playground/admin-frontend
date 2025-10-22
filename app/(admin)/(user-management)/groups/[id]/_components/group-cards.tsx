"use client";

import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { AuditInfoCard } from "./audit-info-card";
import { MembersCard } from "./members-card";
import { ScopeCard } from "./scope-card";

const GROUP_CARDS_QUERY = graphql(`
  query GroupCards($id: ID!) {
    group(id: $id) {
      id
      ...GroupAuditInfoCard
      ...GroupScopeCard
    }
  }
`);

export function GroupCards({ id }: { id: string }) {
  const { data } = useSuspenseQuery(GROUP_CARDS_QUERY, {
    variables: { id },
  });

  const fragment = data.group;

  return (
    <div
      className={`
        grid grid-cols-1 gap-4
        lg:grid-cols-2
      `}
    >
      <ScopeCard fragment={fragment} />
      <MembersCard id={id} />
      <AuditInfoCard fragment={fragment} />
    </div>
  );
}
