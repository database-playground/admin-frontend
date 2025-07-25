import { Suspense } from "react";
import { QuestionsDataTable } from "./_components/data-table";
import { SiteHeader } from "@/components/site-header";
import { DataTableSkeleton } from "@/components/data-table/skeleton";
import { CreateQuestionTrigger } from "./_components/create";

export default function Page() {
  return (
    <>
      <SiteHeader title="題庫" />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">題庫管理</h2>
            <p className="text-muted-foreground">管理 SQL 練習題目，設定難度與分類。</p>
          </div>
          <CreateQuestionTrigger />
        </div>
        <div>
          <Suspense fallback={<DataTableSkeleton />}>
            <QuestionsDataTable />
          </Suspense>
        </div>
      </main>
    </>
  );
} 