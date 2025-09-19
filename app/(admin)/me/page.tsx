import { SiteHeader } from "@/components/site-header";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
import { Suspense } from "react";
import { MeForm } from "./_components/form";

export const metadata: Metadata = {
  title: "個人資訊",
};

export default function Me() {
  return (
    <>
      <SiteHeader title="個人資訊" />
      <main className="flex flex-1 flex-col items-center px-4 py-8">
        <div className="w-full max-w-xl">
          <h3 className="text-lg font-medium">個人資訊</h3>
          <p className="text-sm text-muted-foreground">
            管理您的個人資訊與頭貼。
          </p>
        </div>

        <Separator className="my-4 w-full max-w-xl" />

        <Suspense>
          <MeForm />
        </Suspense>
      </main>
    </>
  );
}
