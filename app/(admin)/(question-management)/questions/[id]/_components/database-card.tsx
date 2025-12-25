"use client";

import { CardLayout } from "@/components/card-layout";
import { StyledLink } from "@/components/ui/link";
import { type FragmentType, graphql, useFragment } from "@/gql";

const QUESTION_DATABASE_CARD_FRAGMENT = graphql(`
  fragment QuestionDatabaseCard on Question {
    id
    database {
      id
      description
      slug
    }
  }
`);

export function DatabaseCard({ fragment }: { fragment: FragmentType<typeof QUESTION_DATABASE_CARD_FRAGMENT> }) {
  const { database } = useFragment(QUESTION_DATABASE_CARD_FRAGMENT, fragment);

  return (
    <CardLayout title="所屬資料庫" description="這個題目要操作的資料庫。">
      <div>
        <p>{database.slug}</p>
        <p className="text-sm text-muted-foreground">
          {database.description}{" "}
          <StyledLink href={`/database/${database.id}`}>
            schema 等資訊 →
          </StyledLink>
        </p>
      </div>
    </CardLayout>
  );
}
