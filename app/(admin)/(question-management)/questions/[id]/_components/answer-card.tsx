"use client";

import { CardLayout } from "@/components/card-layout";
import { useSuspenseQuery } from "@apollo/client/react";
import { QUESTION_DETAIL_QUERY } from "./query";
import { ReferenceAnswerResult } from "./result";
import { Suspense } from "react";

export function AnswerCard({ id }: { id: string }) {
  return (
    <CardLayout title="參考答案" description="此題目的標準解答">
      <Suspense>
        <AnswerContent id={id} />
      </Suspense>
    </CardLayout>
  );
}

function AnswerContent({ id }: { id: string }) {
  const { data } = useSuspenseQuery(QUESTION_DETAIL_QUERY, {
    variables: { id },
  });

  const question = data.question;

  return (
    <div className="space-y-4">
      <pre
        className={`
          overflow-x-auto rounded-lg border bg-muted p-4 font-mono text-sm
          whitespace-pre-wrap
        `}
      >
        {question.referenceAnswer}
      </pre>

      <ReferenceAnswerResult id={id} />
    </div>
  );
}
