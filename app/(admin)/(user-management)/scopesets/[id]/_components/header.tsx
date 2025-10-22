"use client";

import PageHeader, { PageHeaderSkeleton } from "@/components/page-header";
import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { Suspense } from "react";

const SCOPE_SET_HEADER_QUERY = graphql(`
  query ScopeSetHeader($id: ID!) {
    scopeSet(filter: { id: $id }) {
      id
      slug
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
  const { data } = useSuspenseQuery(SCOPE_SET_HEADER_QUERY, {
    variables: { id },
  });

  return (
    <PageHeader
      title={`權限集「${data.scopeSet.slug}」`}
      description={data.scopeSet.description ?? "這個權限集沒有描述。"}
    />
  );
}

function HeaderSkeleton() {
  return <PageHeaderSkeleton description="這個權限集沒有描述。" />;
}
