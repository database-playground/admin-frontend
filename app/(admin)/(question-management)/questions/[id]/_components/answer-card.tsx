"use client";

import { CardLayout } from "@/components/card-layout";
import { type FragmentType, graphql, useFragment } from "@/gql";
import { ReferenceAnswerResult } from "./result";

const QUESTION_ANSWER_CARD_FRAGMENT = graphql(`
  fragment QuestionAnswerCard on Question {
    id
    referenceAnswer
  }
`);

export function AnswerCard({ fragment }: { fragment: FragmentType<typeof QUESTION_ANSWER_CARD_FRAGMENT> }) {
  const { id, referenceAnswer } = useFragment(QUESTION_ANSWER_CARD_FRAGMENT, fragment);

  return (
    <CardLayout title="參考答案" description="此題目的標準解答">
      <div className="space-y-4">
        <pre
          className={`
            overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-sm
            whitespace-pre-wrap
          `}
        >
          {referenceAnswer}
        </pre>

        <ReferenceAnswerResult id={id} />
      </div>
    </CardLayout>
  );
}
