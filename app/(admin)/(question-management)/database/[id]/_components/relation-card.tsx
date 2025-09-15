"use client";

import { CardLayout } from "@/components/card-layout";
import { useSuspenseQuery } from "@apollo/client/react";
import { DATABASE_DETAIL_QUERY } from "./query";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function RelationCard({ id }: { id: string }) {
  return (
    <CardLayout title="關係圖" description="資料庫表格關係圖">
      <Suspense fallback={<RelationFigureSkeleton />}>
        <RelationFigure id={id} />
      </Suspense>
    </CardLayout>
  );
}

function RelationFigure({ id }: { id: string }) {
  const { data } = useSuspenseQuery(DATABASE_DETAIL_QUERY, {
    variables: { id },
  });

  const database = data.database;

  // Check if the relation figure looks like a URL (basic check)
  const isUrl =
    database.relationFigure.startsWith("http://") ||
    database.relationFigure.startsWith("https://");

  if (isUrl) {
    return (
      <a href={database.relationFigure} aria-label="打開資料庫關係圖" target="_blank" rel="noopener noreferrer">
        <picture>
          <img
            src={database.relationFigure}
            alt="資料庫關係圖"
            className="h-auto max-h-80 w-full object-contain rounded"
          />
        </picture>
      </a>
    );
  }

  return (
    <div>
      <pre
        className={`
          max-h-80 overflow-x-auto rounded-lg border bg-muted p-4
          font-mono text-sm whitespace-pre-wrap
        `}
      >
        {database.relationFigure}
      </pre>
    </div>
  );
}

function RelationFigureSkeleton() {
  return <Skeleton className="h-40 w-full" />;
}
