"use client";

import { CardLayout } from "@/components/card-layout";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { type FragmentType, graphql, useFragment } from "@/gql";

const GROUP_SCOPE_CARD_FRAGMENT = graphql(`
  fragment GroupScopeCard on Group {
    id
    scopeSets {
      id
      scopes
      slug
    }
  }
`);

export function ScopeCard({ fragment }: { fragment: FragmentType<typeof GROUP_SCOPE_CARD_FRAGMENT> }) {
  const { scopeSets } = useFragment(GROUP_SCOPE_CARD_FRAGMENT, fragment);

  const permissionsList = scopeSets
    ?.map((scopeSet) => {
      return scopeSet.scopes.map((scope) => {
        return {
          scope,
          inheritFrom: scopeSet.slug,
        };
      });
    })
    .flat() ?? [];

  return (
    <CardLayout title="權限列表" description="這個群組擁有的權限。">
      <div className="flex flex-wrap gap-2">
        {permissionsList.map((permission) => (
          <Tooltip key={permission.inheritFrom + "-" + permission.scope}>
            <TooltipTrigger>
              <Badge>
                <code>{permission.scope}</code>
              </Badge>
            </TooltipTrigger>

            <TooltipContent>
              <p>
                繼承自 scope set：<code>{permission.inheritFrom}</code>
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </CardLayout>
  );
}
