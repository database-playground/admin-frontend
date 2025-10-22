"use client";

import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { GroupsCard } from "./groups";
import { ScopesCard } from "./scopes";

const SCOPE_SET_CARDS_QUERY = graphql(`
  query ScopeSetCards($id: ID!) {
    scopeSet(filter: { id: $id }) {
      id
      ...ScopeSetScopesCard
    }
  }
`);

export function ScopeSetCards({ id }: { id: string }) {
  const { data } = useSuspenseQuery(SCOPE_SET_CARDS_QUERY, {
    variables: { id },
  });

  const fragment = data.scopeSet;

  return (
    <div
      className={`
        grid grid-cols-1 gap-4
        lg:grid-cols-2
      `}
    >
      <ScopesCard fragment={fragment} />
      <GroupsCard id={id} />
    </div>
  );
}
