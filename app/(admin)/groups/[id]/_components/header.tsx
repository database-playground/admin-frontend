"use client";

import PageHeader, { PageHeaderSkeleton } from "@/components/page-header";
import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client";
import { Suspense } from "react";

const GROUP_HEADER_QUERY = graphql(`
  query GroupHeaderQuery($id: ID!) {
    group(id: $id) {
      id
      name
      description
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
  const { data } = useSuspenseQuery(GROUP_HEADER_QUERY, {
    variables: { id },
  });

  return (
    <PageHeader
      title={`群組「${data.group.name}」`}
      description={data.group.description ?? "這個群組沒有描述。"}
    />
  );
}

function HeaderSkeleton() {
  return <PageHeaderSkeleton description="這個群組沒有描述。" />;
}
