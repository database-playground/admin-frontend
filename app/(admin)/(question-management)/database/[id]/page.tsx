import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { Suspense } from "react";
import { DeleteDatabaseButtonTrigger } from "../_components/delete";
import { UpdateDatabaseButtonTrigger } from "../_components/update";
import { DatabaseCards } from "./_components/database-cards";
import { Header } from "./_components/header";

export const metadata: Metadata = {
  title: "資料庫資訊",
};

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
        <Suspense>
          <DatabaseCards id={id as string} />
        </Suspense>
      </main>
    </>
  );
}
