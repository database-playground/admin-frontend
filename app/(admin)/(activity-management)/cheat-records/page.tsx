import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import FilterableDataTable from "./_components/filterable-data-table";
import { CreateCheatRecordButtonTrigger } from "./_components/create";

export const metadata: Metadata = {
  title: "作弊記錄",
};

export default function Page() {
  return (
    <>
      <SiteHeader title="作弊記錄" />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">作弊記錄管理</h2>
            <p className="text-muted-foreground">查看和管理所有作弊記錄。</p>
          </div>
          <CreateCheatRecordButtonTrigger />
        </div>
        <div>
          <FilterableDataTable />
        </div>
      </main>
    </>
  );
}
