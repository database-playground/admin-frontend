import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "./_components/header";
import { PointCards } from "./_components/point-cards";

export const metadata: Metadata = {
  title: "積分記錄詳情",
};

export default async function PointPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <SiteHeader title="積分記錄詳情" hasBackButton />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <Header id={id as string} />
        </div>
        <Suspense>
          <PointCards id={id as string} />
        </Suspense>
      </main>
    </>
  );
}
