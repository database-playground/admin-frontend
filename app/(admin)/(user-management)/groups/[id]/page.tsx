import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { Suspense } from "react";
import { DeleteGroupButtonTrigger } from "../_components/delete";
import { UpdateGroupButtonTrigger } from "../_components/update";
import { GroupCards } from "./_components/group-cards";
import { Header } from "./_components/header";

export const metadata: Metadata = {
  title: "群組資訊",
};

export default async function GroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <SiteHeader title="群組資訊" hasBackButton />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <Header id={id as string} />

          <div className="flex items-center gap-2">
            <UpdateGroupButtonTrigger id={id as string} />
            <DeleteGroupButtonTrigger id={id as string} />
          </div>
        </div>
        <Suspense>
          <GroupCards id={id as string} />
        </Suspense>
      </main>
    </>
  );
}
