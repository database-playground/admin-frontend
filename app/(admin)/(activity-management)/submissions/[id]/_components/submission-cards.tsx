"use client";

import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { ResultCard } from "./result-card";
import { SubmissionDetailsCard } from "./submission-details-card";
import { UserCard } from "./user-card";

const SUBMISSION_CARDS_QUERY = graphql(`
  query SubmissionCards($id: ID!) {
    submission(id: $id) {
      id
      ...SubmissionDetailsCard
      ...SubmissionUserCard
      ...SubmissionResultCard
    }
  }
`);

export function SubmissionCards({ id }: { id: string }) {
  const { data } = useSuspenseQuery(SUBMISSION_CARDS_QUERY, {
    variables: { id },
  });

  const fragment = data.submission;

  return (
    <div
      className={`
        grid grid-cols-1 gap-4
        lg:grid-cols-2
      `}
    >
      <SubmissionDetailsCard fragment={fragment} />
      <UserCard fragment={fragment} />
      <ResultCard fragment={fragment} />
    </div>
  );
}
