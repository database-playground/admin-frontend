"use client";

import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { PointDetailsCard } from "./point-details-card";
import { UserCard } from "./user-card";

const POINT_CARDS_QUERY = graphql(`
  query PointCards($id: ID!) {
    pointGrant(id: $id) {
      ...PointDetailsCard
      ...PointUserCard
      id
    }
  }
`);

export function PointCards({ id }: { id: string }) {
  const { data } = useSuspenseQuery(POINT_CARDS_QUERY, {
    variables: { id },
  });

  const fragment = data.pointGrant;

  return (
    <div
      className={`
        grid grid-cols-1 gap-4
        lg:grid-cols-2
      `}
    >
      <PointDetailsCard fragment={fragment} />
      <UserCard fragment={fragment} />
    </div>
  );
}
