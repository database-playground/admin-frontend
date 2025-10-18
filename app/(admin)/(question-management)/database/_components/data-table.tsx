"use client";

import { GeneralDataTable } from "@/components/data-table/general";
import { useSuspenseQuery } from "@apollo/client/react";
import { columns, type Database } from "./data-table-columns";
import { DATABASES_TABLE_QUERY } from "./query";

export function DatabaseDataTable({ query }: { query?: string }) {
  const { data } = useSuspenseQuery(DATABASES_TABLE_QUERY);

  const databaseList = data?.databases
    ?.map(
      (database) => ({
        id: database.id,
        slug: database.slug,
        description: database.description,
        schema: database.schema,
        relationFigure: database.relationFigure,
      } satisfies Database),
    )
    .filter((database) => {
      if (query && database.slug.includes(query)) {
        return true;
      }

      if (query && database.description?.includes(query)) {
        return true;
      }

      // If no query is provided, return all databases
      if (!query) {
        return true;
      }

      return false;
    }) ?? [];

  return (
    <GeneralDataTable
      columns={columns}
      data={databaseList}
    />
  );
}
