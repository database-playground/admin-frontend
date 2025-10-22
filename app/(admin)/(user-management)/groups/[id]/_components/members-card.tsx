"use client";

import { CardLayout } from "@/components/card-layout";
import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";

const GROUP_MEMBERS_QUERY = graphql(`
  query GroupMembers($id: ID!) {
    users(where: { hasGroupWith: { id: $id } }) {
      totalCount
    }
  }
`);

export function MembersCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(GROUP_MEMBERS_QUERY, {
    variables: { id },
  });

  return (
    <CardLayout title="成員人數" description="這個群組的成員人數。">
      <p>{data.users.totalCount}</p>
    </CardLayout>
  );
}
