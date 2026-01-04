"use client";

import { graphql } from "@/gql";
import { useSuspenseQuery } from "@apollo/client/react";
import { ResolveCheatRecordButtonTrigger } from "../../_components/resolve";

const CHEAT_RECORD_RESOLVE_BUTTON_QUERY = graphql(`
  query CheatRecordResolveButton($id: ID!) {
    cheatRecord(id: $id) {
      id
      resolvedAt
    }
  }
`);

export function ResolveButton({ id }: { id: string }) {
  const { data } = useSuspenseQuery(CHEAT_RECORD_RESOLVE_BUTTON_QUERY, {
    variables: { id },
  });

  if (data.cheatRecord.resolvedAt) {
    return null;
  }

  return <ResolveCheatRecordButtonTrigger id={id} />;
}
