import { SiteHeader } from "@/components/site-header";
import { Suspense } from "react";
import { DeleteGroupButtonTrigger } from "../_components/delete";
import { UpdateGroupButtonTrigger } from "../_components/update";
import { AuditInfoCard } from "./_components/audit-info-card";
import { Header } from "./_components/header";
import { MembersCard } from "./_components/members-card";
import { ScopeCard } from "./_components/scope-card";

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
        <div
          className={`
            grid grid-cols-1 gap-4
            lg:grid-cols-2
          `}
        >
          <Suspense>
            <ScopeCard id={id as string} />
            <MembersCard id={id as string} />
            <AuditInfoCard id={id as string} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
