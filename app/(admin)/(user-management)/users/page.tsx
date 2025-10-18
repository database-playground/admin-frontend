import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { UsersDataTable } from "./_components/data-table";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/data-table/skeleton";

export const metadata: Metadata = {
  title: "使用者",
};

export default function Page() {
  return (
    <>
      <SiteHeader title="使用者" />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">使用者管理</h2>
            <p className="text-muted-foreground">管理使用者，並為其授予權限。</p>
          </div>
        </div>
        <div>
          <Suspense fallback={<DataTableSkeleton />}>
            <UsersDataTable />
          </Suspense>
        </div>
      </main>
    </>
  );
}
