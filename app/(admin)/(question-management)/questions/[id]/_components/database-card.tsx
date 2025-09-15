"use client";

import { CardLayout } from "@/components/card-layout";
import { StyledLink } from "@/components/ui/link";
import { useSuspenseQuery } from "@apollo/client/react";
import { QUESTION_DETAIL_QUERY } from "./query";
import { Suspense } from "react";

export function DatabaseCard({ id }: { id: string }) {
  return (
    <CardLayout title="所屬資料庫" description="這個題目要操作的資料庫。">
      <Suspense>
        <DatabaseContent id={id} />
      </Suspense>
    </CardLayout>
  );
}

function DatabaseContent({ id }: { id: string }) {
  const { data } = useSuspenseQuery(QUESTION_DETAIL_QUERY, {
    variables: { id },
  });

  const database = data.question.database;

  return (
    <>
      <p>{database.slug}</p>
      <p className="text-sm text-muted-foreground">
        {database.description}{" "}
        <StyledLink href={`/database/${database.id}`}>
          schema 等資訊 →
        </StyledLink>
      </p>
    </>
  );
}
