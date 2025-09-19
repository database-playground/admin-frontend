import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { Suspense } from "react";
import { EventDetailsCard } from "./_components/event-details-card";
import { Header } from "./_components/header";
import { UserCard } from "./_components/user-card";

export const metadata: Metadata = {
  title: "事件詳情",
};

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <SiteHeader title="事件詳情" hasBackButton />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <Header id={id as string} />
        </div>
        <div
          className={`
            grid grid-cols-1 gap-4
            lg:grid-cols-2
          `}
        >
          <Suspense>
            <EventDetailsCard id={id as string} />
            <UserCard id={id as string} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
