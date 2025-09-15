"use client";

import { CardLayout } from "@/components/card-layout";
import { useSuspenseQuery } from "@apollo/client/react";
import { QUESTION_DETAIL_QUERY } from "./query";
import { Suspense } from "react";
import { Remark } from "react-remark";

export function DescriptionCard({ id }: { id: string }) {
  return (
    <CardLayout title="題幹描述" description="這道題目的詳細說明。">
      <article className="prose dark:prose-invert">
        <Suspense>
          <Description id={id} />
        </Suspense>
      </article>
    </CardLayout>
  );
}

function Description({ id }: { id: string }) {
  const { data } = useSuspenseQuery(QUESTION_DETAIL_QUERY, {
    variables: { id },
  });

  const question = data.question;

  if (!question.description) {
    return <p className="text-muted-foreground">無描述</p>;
  }

  return <Remark>{question.description ?? ""}</Remark>;
}
