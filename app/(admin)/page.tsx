import { DataTableSkeleton } from "@/components/data-table/skeleton";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "概覽",
};

export default function Home() {
  return (
    <>
      <SiteHeader title="概覽" />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <DataTableSkeleton />
      </main>
    </>
  );
}
