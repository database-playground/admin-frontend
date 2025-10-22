import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { Suspense } from "react";
import { DeleteScopeSetButtonTrigger } from "../_components/delete";
import { UpdateScopeSetButtonTrigger } from "../_components/update";
import { Header } from "./_components/header";
import { ScopeSetCards } from "./_components/scopeset-cards";

export const metadata: Metadata = {
  title: "權限集資訊",
};

export default async function ScopeSetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <SiteHeader title="權限集資訊" hasBackButton />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <Header id={id as string} />

          <div className="flex items-center gap-2">
            <UpdateScopeSetButtonTrigger id={id as string} />
            <DeleteScopeSetButtonTrigger id={id as string} />
          </div>
        </div>
        <Suspense>
          <ScopeSetCards id={id as string} />
        </Suspense>
      </main>
    </>
  );
}
