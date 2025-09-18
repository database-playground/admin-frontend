import { SiteHeader } from "@/components/site-header";
import { Suspense } from "react";
import { Header } from "./_components/header";
import { ResultCard } from "./_components/result-card";
import { SubmissionDetailsCard } from "./_components/submission-details-card";
import { UserCard } from "./_components/user-card";

export default async function SubmissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <SiteHeader title="提交記錄詳情" hasBackButton />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <Header id={id as string} />
        </div>
        <div
          className={`
            grid grid-cols-1 gap-4
            lg:grid-cols-2
          `}
        >
          <Suspense>
            <SubmissionDetailsCard id={id as string} />
            <UserCard id={id as string} />
            <ResultCard id={id as string} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
