import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { Suspense } from "react";
import { CheatRecordDetails } from "./_components/details";
import { Header } from "./_components/header";
import { ResolveButton } from "./_components/resolve-button";

export const metadata: Metadata = {
  title: "作弊記錄詳情",
};

export default async function CheatRecordPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <SiteHeader title="作弊記錄詳情" hasBackButton />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div
          className={`
            flex flex-col items-center justify-between space-y-2
            lg:flex-row
          `}
        >
          <Header id={id as string} />

          <div className="flex items-center gap-2">
            <Suspense>
              <ResolveButton id={id as string} />
            </Suspense>
          </div>
        </div>
        <Suspense>
          <CheatRecordDetails id={id as string} />
        </Suspense>
      </main>
    </>
  );
}
