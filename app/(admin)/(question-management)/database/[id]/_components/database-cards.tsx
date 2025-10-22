"use client";

import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { DescriptionCard } from "./description-card";
import { RelationCard } from "./relation-card";
import { SchemaCard } from "./schema-card";

const DATABASE_CARDS_QUERY = graphql(`
  query DatabaseCards($id: ID!) {
    database(id: $id) {
      id
      ...DatabaseDescriptionCard
      ...DatabaseRelationCard
      ...DatabaseSchemaCard
    }
  }
`);

export function DatabaseCards({ id }: { id: string }) {
  const { data } = useSuspenseQuery(DATABASE_CARDS_QUERY, {
    variables: { id },
  });

  const fragment = data.database;

  return (
    <div
      className={`
        grid grid-cols-1 gap-4
        lg:grid-cols-2
      `}
    >
      <DescriptionCard fragment={fragment} />
      <RelationCard fragment={fragment} />
      <SchemaCard fragment={fragment} />
    </div>
  );
}
