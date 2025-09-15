"use client";

import { CardLayout } from "@/components/card-layout";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSuspenseQuery } from "@apollo/client/react";
import { GROUP_SCOPES_QUERY } from "./query";

export function ScopeCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(GROUP_SCOPES_QUERY, {
    variables: { id },
  });

  const permissionsList = data.group.scopeSets
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
