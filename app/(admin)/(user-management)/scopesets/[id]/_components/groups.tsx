"use client";

import { CardLayout } from "@/components/card-layout";
import { Badge } from "@/components/ui/badge";
import { useSuspenseQuery } from "@apollo/client/react";
import Link from "next/link";
import { GROUPS_WITH_SCOPE_SET_QUERY } from "./query";

export function GroupsCard({ id }: { id: string }) {
  const { data } = useSuspenseQuery(GROUPS_WITH_SCOPE_SET_QUERY);
  const groupWithThisScopeSet = data.groups.filter((group) => group.scopeSets?.some((scopeSet) => scopeSet.id === id));

  return (
    <CardLayout title="擁有此權限集的群組" description="這個權限集被哪些群組使用。">
      <div className="flex flex-wrap gap-2">
        {groupWithThisScopeSet.map((group) => (
          <Link href={`/groups/${group.id}`} key={group.id}>
            <Badge>
              <code>{group.name}</code>
            </Badge>
          </Link>
        ))}
      </div>
    </CardLayout>
  );
}
