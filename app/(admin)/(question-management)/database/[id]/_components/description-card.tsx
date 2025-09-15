"use client";

import { CardLayout } from "@/components/card-layout";
import { useSuspenseQuery } from "@apollo/client/react";
import { DATABASE_DETAIL_QUERY } from "./query";
import { Suspense } from "react";
import { Remark } from "react-remark";

export function DescriptionCard({ id }: { id: string }) {
  return (
    <CardLayout title="資料表描述" description="這個資料表的簡單介紹。">
      <article className="prose dark:prose-invert">
        <Suspense>
          <Description id={id} />
        </Suspense>
      </article>
    </CardLayout>
  );
}

function Description({ id }: { id: string }) {
  const { data } = useSuspenseQuery(DATABASE_DETAIL_QUERY, {
    variables: { id },
  });

  const database = data.database;

  if (!database.description) {
    return <p className="text-muted-foreground">無描述</p>;
  }

  return <Remark>{database.description ?? ""}</Remark>;
}
