import { SiteHeader } from "@/components/site-header";
import { DeleteDatabaseButtonTrigger } from "../_components/delete";
import { UpdateDatabaseButtonTrigger } from "../_components/update";
import { Header } from "./_components/header";
import { RelationCard } from "./_components/relation-card";
import { SchemaCard } from "./_components/schema-card";
import { DescriptionCard } from "./_components/description-card";
import { Suspense } from "react";

export default async function DatabasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <SiteHeader title="資料庫資訊" hasBackButton />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <Header id={id as string} />

          <div className="flex items-center gap-2">
            <UpdateDatabaseButtonTrigger id={id as string} />
            <DeleteDatabaseButtonTrigger id={id as string} />
          </div>
        </div>
        <div
          className={`
            grid grid-cols-1 gap-4
            lg:grid-cols-2
          `}
        >
          <Suspense>
            <DescriptionCard id={id as string} />
            <RelationCard id={id as string} />
            <SchemaCard id={id as string} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
