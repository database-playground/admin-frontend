import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { Suspense } from "react";
import { DeleteUserButtonTrigger } from "../_components/delete";
import { ImpersonateUserButtonTrigger } from "../_components/impersonate";
import { LogoutUserDevicesButtonTrigger } from "../_components/logout-devices";
import { UpdateUserButtonTrigger } from "../_components/update";
import { Header } from "./_components/header";
import { UserCards } from "./_components/user-cards";

export const metadata: Metadata = {
  title: "使用者資訊",
};

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
        <div
          className={`
            flex flex-col items-center justify-between space-y-2
            lg:flex-row
          `}
        >
          <Header id={id as string} />

          <div className="flex items-center gap-2">
            <ImpersonateUserButtonTrigger userId={id as string} />
            <LogoutUserDevicesButtonTrigger id={id as string} />
            <UpdateUserButtonTrigger id={id as string} />
            <DeleteUserButtonTrigger id={id as string} />
          </div>
        </div>
        <Suspense>
          <UserCards id={id as string} />
        </Suspense>
      </main>
    </>
  );
}
