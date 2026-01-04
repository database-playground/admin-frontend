"use client";

import AppAvatar from "@/components/avatar";
import PageHeader, { PageHeaderSkeleton } from "@/components/page-header";
import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { Suspense } from "react";

const CHEAT_RECORD_HEADER_QUERY = graphql(`
  query CheatRecordHeader($id: ID!) {
    cheatRecord(id: $id) {
      id
      reason
      user {
        id
        name
        email
        avatar
      }
    }
  }
`);

export function Header({ id }: { id: string }) {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <HeaderMain id={id} />
    </Suspense>
  );
}

function HeaderMain({ id }: { id: string }) {
  const { data } = useSuspenseQuery(CHEAT_RECORD_HEADER_QUERY, {
    variables: { id },
  });

  return (
    <div className="flex items-center gap-4">
      <AppAvatar
        src={data.cheatRecord.user.avatar}
        name={data.cheatRecord.user.name}
        className="h-12 w-12"
      />
      <PageHeader
        title={`作弊記錄「${data.cheatRecord.reason}」`}
        description={`使用者：${data.cheatRecord.user.name} (${data.cheatRecord.user.email})`}
      />
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <AppAvatar name="Loading" className="h-12 w-12" />
      <PageHeaderSkeleton description="Loading..." />
    </div>
  );
}
