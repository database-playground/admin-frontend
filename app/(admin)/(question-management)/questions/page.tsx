import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { CreateQuestionTrigger } from "./_components/create";
import { QuestionsDataTable } from "./_components/data-table";

export const metadata: Metadata = {
  title: "題庫",
};

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
          <QuestionsDataTable />
        </div>
      </main>
    </>
  );
}
