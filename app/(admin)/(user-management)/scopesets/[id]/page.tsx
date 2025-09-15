import { SiteHeader } from "@/components/site-header";
import { Suspense } from "react";
import { DeleteScopeSetButtonTrigger } from "../_components/delete";
import { UpdateScopeSetButtonTrigger } from "../_components/update";
import { GroupsCard } from "./_components/groups";
import { Header } from "./_components/header";
import { ScopesCard } from "./_components/scopes";

export default async function ScopeSetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <SiteHeader title="權限集資訊" hasBackButton />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <Header id={id as string} />

          <div className="flex items-center gap-2">
            <UpdateScopeSetButtonTrigger id={id as string} />
            <DeleteScopeSetButtonTrigger id={id as string} />
          </div>
        </div>
        <div
          className={`
            grid grid-cols-1 gap-4
            lg:grid-cols-2
          `}
        >
          <Suspense>
            <ScopesCard id={id as string} />
            <GroupsCard id={id as string} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
