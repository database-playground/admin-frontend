"use client";

import { CardLayout } from "@/components/card-layout";
import { type FragmentType, graphql, useFragment } from "@/gql";
import { Remark } from "react-remark";

const QUESTION_DESCRIPTION_CARD_FRAGMENT = graphql(`
  fragment QuestionDescriptionCard on Question {
    description
  }
`);

export function DescriptionCard({ fragment }: { fragment: FragmentType<typeof QUESTION_DESCRIPTION_CARD_FRAGMENT> }) {
  const { description } = useFragment(QUESTION_DESCRIPTION_CARD_FRAGMENT, fragment);

  return (
    <CardLayout title="題幹描述" description="這道題目的詳細說明。">
      <article
        className={`
          prose
          dark:prose-invert
        `}
      >
        {!description
          ? <p className="text-muted-foreground">無描述</p>
          : <Remark>{description}</Remark>}
      </article>
    </CardLayout>
  );
}
