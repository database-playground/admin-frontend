import { SiteHeader } from "@/components/site-header";
import { EventsDataTable } from "./_components/data-table";

export default function Page() {
  return (
    <>
      <SiteHeader title="事件管理" />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">事件管理</h2>
            <p className="text-muted-foreground">查看和管理系統事件記錄。</p>
          </div>
        </div>
        <div>
          <EventsDataTable />
        </div>
      </main>
    </>
  );
}
