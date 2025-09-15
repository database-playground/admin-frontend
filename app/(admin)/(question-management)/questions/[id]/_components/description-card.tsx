"use client";

import { CardLayout } from "@/components/card-layout";
import { useSuspenseQuery } from "@apollo/client/react";
import { QUESTION_DETAIL_QUERY } from "./query";
import { Remark } from "react-remark";

export function DescriptionCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(QUESTION_DETAIL_QUERY, {
    variables: { id },
  });

  const question = data.question;

  return (
    <CardLayout title="題幹描述" description="這道題目的詳細說明。">
      <article className="prose dark:prose-invert">
        {!question.description ? (
          <p className="text-muted-foreground">無描述</p>
        ) : (
          <Remark>{question.description}</Remark>
        )}
      </article>
    </CardLayout>
  );
}
