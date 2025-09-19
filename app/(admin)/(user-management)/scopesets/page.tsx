import { SiteHeader } from "@/components/site-header";
import { CreateScopeSetTrigger } from "./_components/create";
import { ScopeSetDataTable } from "./_components/data-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "權限集",
};

export default function ScopesetPage() {
  return (
    <>
      <SiteHeader title="權限集" />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">權限集管理</h2>
            <p className="text-muted-foreground">管理權限集與其權限。</p>
          </div>
          <CreateScopeSetTrigger />
        </div>
        <div>
          <ScopeSetDataTable />
        </div>
      </main>
    </>
  );
}
