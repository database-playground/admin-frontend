"use client";

import { GeneralDataTable } from "@/components/data-table/general";
import { useSuspenseQuery } from "@apollo/client/react";
import { columns, type ScopeSet } from "./data-table-columns";
import { SCOPE_SET_TABLE_QUERY } from "./query";

export function ScopeSetDataTable({
  query,
}: {
  query?: string;
}) {
  const { data } = useSuspenseQuery(SCOPE_SET_TABLE_QUERY);

  const scopeSetList = data?.scopeSets
    .map(
      (scopeSet) => ({
        id: scopeSet.id,
        slug: scopeSet.slug,
        description: scopeSet.description ?? "",
        scopes: scopeSet.scopes ?? [],
      } satisfies ScopeSet),
    )
    .filter((scopeSet) => {
      if (query && scopeSet.slug.includes(query)) {
        return true;
      }

      if (
        query
        && scopeSet.scopes.some((scope) => scope.includes(query))
      ) {
        return true;
      }

      if (query && scopeSet.description?.includes(query)) {
        return true;
      }

      // If no query is provided, return all scope sets
      if (!query) {
        return true;
      }

      return false;
    }) ?? [];

  return <GeneralDataTable columns={columns} data={scopeSetList} />;
}
