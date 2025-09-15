"use client";

import { CardLayout } from "@/components/card-layout";
import { Badge } from "@/components/ui/badge";
import { useSuspenseQuery } from "@apollo/client/react";
import { SCOPE_SET_SCOPES_QUERY } from "./query";

export function ScopesCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(SCOPE_SET_SCOPES_QUERY, {
    variables: { id },
  });

  return (
    <CardLayout title="權限列表" description="這個群組擁有的權限。">
      <div className="flex flex-wrap gap-2">
        {data.scopeSet.scopes.map((scope) => (
          <Badge key={scope}>
            <code>{scope}</code>
          </Badge>
        ))}
      </div>
    </CardLayout>
  );
}
