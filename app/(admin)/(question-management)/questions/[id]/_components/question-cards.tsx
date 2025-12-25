"use client";

import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { AnswerCard } from "./answer-card";
import { DatabaseCard } from "./database-card";
import { DescriptionCard } from "./description-card";
import { PassRateCard } from "./pass-rate";

const QUESTION_CARDS_QUERY = graphql(`
  query QuestionCards($id: ID!) {
    question(id: $id) {
      ...QuestionAnswerCard
      ...QuestionDatabaseCard
      ...QuestionDescriptionCard
      ...QuestionPassRateCard
      id
    }
  }
`);

export function QuestionCards({ id }: { id: string }) {
  const { data } = useSuspenseQuery(QUESTION_CARDS_QUERY, {
    variables: { id },
  });

  const fragment = data.question;

  return (
    <div
      className={`
        grid grid-cols-1 gap-4
        lg:grid-cols-2
      `}
    >
      <DescriptionCard fragment={fragment} />
      <DatabaseCard fragment={fragment} />
      <AnswerCard fragment={fragment} />
      <PassRateCard fragment={fragment} />
    </div>
  );
}
