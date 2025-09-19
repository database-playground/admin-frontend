import { SiteHeader } from "@/components/site-header";
import { SubmissionsDataTable } from "./_components/data-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "提交記錄",
};

export default function Page() {
  return (
    <>
      <SiteHeader title="提交記錄" />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">提交記錄管理</h2>
            <p className="text-muted-foreground">查看和管理使用者的查詢提交記錄。</p>
          </div>
        </div>
        <div>
          <SubmissionsDataTable />
        </div>
      </main>
    </>
  );
}
