"use client";

import { graphql, useFragment, type FragmentType } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { ResolveCheatRecordButtonTrigger } from "../../_components/resolve";

const CHEAT_RECORD_RESOLVE_BUTTON_QUERY = graphql(`
  query CheatRecordResolveButton($id: ID!) {
    cheatRecord(id: $id) {
      ...CheatRecordResolveButtonFragment
      id
    }
  }
`);

const CHEAT_RECORD_RESOLVE_BUTTON_FRAGMENT = graphql(`
  fragment CheatRecordResolveButtonFragment on CheatRecord {
    id
    resolvedAt
  }
`);

export function ResolveButton({ id }: { id: string }) {
  const { data } = useSuspenseQuery(CHEAT_RECORD_RESOLVE_BUTTON_QUERY, {
    variables: { id },
  });

  const fragment = data.cheatRecord;
  const { resolvedAt } = useFragment(
    CHEAT_RECORD_RESOLVE_BUTTON_FRAGMENT,
    fragment,
  );

  if (resolvedAt) {
    return null;
  }

  return <ResolveCheatRecordButtonTrigger id={id} />;
}
