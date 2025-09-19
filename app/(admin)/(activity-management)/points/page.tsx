import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { PointsDataTable } from "./_components/data-table";

export const metadata: Metadata = {
  title: "積分管理",
};

export default function Page() {
  return (
    <>
      <SiteHeader title="積分管理" />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">積分管理</h2>
            <p className="text-muted-foreground">查看和管理使用者的積分獲得記錄。</p>
          </div>
        </div>
        <div>
          <PointsDataTable />
        </div>
      </main>
    </>
  );
}
