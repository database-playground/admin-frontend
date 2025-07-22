import { SiteHeader } from "@/components/site-header";
import { DeleteUserButtonTrigger } from "../_components/delete";
import { UpdateUserButtonTrigger } from "../_components/update";
import { GroupsCard } from "./_components/groups";
import { Header } from "./_components/header";
import { AuditInfoCard } from "./_components/audit-info";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <SiteHeader title="使用者資訊" hasBackButton />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <Header id={id as string} />

          <div className="flex items-center gap-2">
            <UpdateUserButtonTrigger id={id as string} />
            <DeleteUserButtonTrigger id={id as string} />
          </div>
        </div>
        <div
          className={`
            grid grid-cols-1 gap-4
            lg:grid-cols-2
          `}
        >
          <GroupsCard id={id as string} />
          <AuditInfoCard id={id as string} />
        </div>
      </main>
    </>
  );
}
