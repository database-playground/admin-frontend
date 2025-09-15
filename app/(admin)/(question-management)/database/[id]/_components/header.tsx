"use client";

import PageHeader, { PageHeaderSkeleton } from "@/components/page-header";
import { useSuspenseQuery } from "@apollo/client/react";
import { Suspense } from "react";
import { DATABASE_DETAIL_QUERY } from "./query";

export function Header({ id }: { id: string }) {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <HeaderMain id={id} />
    </Suspense>
  );
}

function HeaderMain({ id }: { id: string }) {
  const { data } = useSuspenseQuery(DATABASE_DETAIL_QUERY, {
    variables: { id },
  });

  const database = data.database;

  // 只擷取第一段 description
  const description = database.description?.split("\n")[0] || "此資料庫沒有描述";

  return (
    <div className="flex items-start gap-4">
      <PageHeader
        title={`資料庫「${database.slug}」`}
        description={description}
      />
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-4">
      <PageHeaderSkeleton description="載入中…" />
    </div>
  );
}
