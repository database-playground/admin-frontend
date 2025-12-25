"use client";

import AppAvatar from "@/components/avatar";
import PageHeader, { PageHeaderSkeleton } from "@/components/page-header";
import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { Suspense } from "react";

const USER_HEADER_QUERY = graphql(`
  query UserHeader($id: ID!) {
    user(id: $id) {
      id
      avatar
      email
      name
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
  const { data } = useSuspenseQuery(USER_HEADER_QUERY, {
    variables: { id },
  });

  return (
    <div className="flex items-center gap-4">
      <AppAvatar
        src={data.user.avatar}
        name={data.user.name}
        className="h-12 w-12"
      />
      <PageHeader
        title={`使用者「${data.user.name}」`}
        description={data.user.email}
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
