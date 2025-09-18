import { SiteHeader } from "@/components/site-header";
import { Suspense } from "react";
import { Header } from "./_components/header";
import { PointDetailsCard } from "./_components/point-details-card";
import { UserCard } from "./_components/user-card";

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
        <div
          className={`
            grid grid-cols-1 gap-4
            lg:grid-cols-2
          `}
        >
          <Suspense>
            <PointDetailsCard id={id as string} />
            <UserCard id={id as string} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
