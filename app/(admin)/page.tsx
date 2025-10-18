import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { Suspense } from "react";
import OverviewRanking from "./_components/rank";
import { Skeleton } from "@/components/ui/skeleton";
import SubmissionsTotalCount from "./_components/submit-count";
import LoginTotalCount from "./_components/login-count";
import { Header } from "./_components/header";

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
        <Header />
        <div className={`
          grid grid-cols-1 gap-4
          md:grid-cols-2
        `}>
          <SubmissionsTotalCount />
          <LoginTotalCount />
        </div>
        <Suspense fallback={<Skeleton className="h-72 w-full" />}>
          <OverviewRanking />
        </Suspense>
      </main>
    </>
  );
}
