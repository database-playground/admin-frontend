import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { CreateGroupTrigger } from "./_components/create";
import FilterableDataTable from "./_components/filterable-data-table";

export const metadata: Metadata = {
  title: "群組",
};

export default function GroupsPage() {
  return (
    <>
      <SiteHeader title="群組" />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">群組管理</h2>
            <p className="text-muted-foreground">管理群組與其權限集。</p>
          </div>
          <CreateGroupTrigger />
        </div>
        <div>
          <FilterableDataTable />
        </div>
      </main>
    </>
  );
}
