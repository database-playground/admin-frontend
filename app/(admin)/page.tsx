import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { Suspense } from "react";
import { OverviewRanking } from "./_components/rank";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "概覽",
};

export default function Home() {
  return (
    <>
      <SiteHeader title="概覽" />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <Suspense fallback={<Skeleton className="h-72 w-full" />}>
          <OverviewRanking />
        </Suspense>
      </main>
    </>
  );
}
