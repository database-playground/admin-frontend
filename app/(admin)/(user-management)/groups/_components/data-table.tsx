"use client";

import { GeneralDataTable } from "@/components/data-table/general";
import { useSuspenseQuery } from "@apollo/client/react";
import { columns, type Group } from "./data-table-columns";
import { GROUPS_TABLE_QUERY } from "./query";

export function GroupDataTable({ query }: { query?: string }) {
  const { data } = useSuspenseQuery(GROUPS_TABLE_QUERY);

  const groupList = data?.groups
    .map(
      (group) => ({
        id: group.id,
        name: group.name,
        description: group.description ?? "",
        scopeSets: group.scopeSets ?? [],
        createdAt: group.createdAt,
        updatedAt: group.updatedAt,
      } satisfies Group),
    )
    .filter((group) => {
      if (query && group.name.includes(query)) {
        return true;
      }

      if (query && group.description?.includes(query)) {
        return true;
      }

      // If no query is provided, return all groups
      if (!query) {
        return true;
      }

      return false;
    }) ?? [];

  return <GeneralDataTable columns={columns} data={groupList} />;
}
