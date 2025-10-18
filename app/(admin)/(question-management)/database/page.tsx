import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { CreateDatabaseTrigger } from "./_components/create";
import FilterableDataTable from "./_components/filterable-data-table";

export const metadata: Metadata = {
  title: "資料庫",
};

export default function Page() {
  return (
    <>
      <SiteHeader title="資料庫" />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">資料庫管理</h2>
            <p className="text-muted-foreground">管理 SQL 練習用資料庫，包含資料結構和關係圖。</p>
          </div>
          <CreateDatabaseTrigger />
        </div>
        <div>
          <FilterableDataTable />
        </div>
      </main>
    </>
  );
}
