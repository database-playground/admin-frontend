"use client";

import { CardLayout } from "@/components/card-layout";
import { Badge } from "@/components/ui/badge";
import { type FragmentType, graphql, useFragment } from "@/gql";

const SCOPE_SET_SCOPES_CARD_FRAGMENT = graphql(`
  fragment ScopeSetScopesCard on ScopeSet {
    id
    scopes
  }
`);

export function ScopesCard({ fragment }: { fragment: FragmentType<typeof SCOPE_SET_SCOPES_CARD_FRAGMENT> }) {
  const { scopes } = useFragment(SCOPE_SET_SCOPES_CARD_FRAGMENT, fragment);

  return (
    <CardLayout title="權限列表" description="這個群組擁有的權限。">
      <div className="flex flex-wrap gap-2">
        {scopes.map((scope) => (
          <Badge key={scope}>
            <code>{scope}</code>
          </Badge>
        ))}
      </div>
    </CardLayout>
  );
}
