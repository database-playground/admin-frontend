import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";
import { Suspense } from "react";
import { DeleteQuestionButtonTrigger } from "../_components/delete";
import { UpdateQuestionButtonTrigger } from "../_components/update";
import { Header } from "./_components/header";
import { QuestionCards } from "./_components/question-cards";

export const metadata: Metadata = {
  title: "題目資訊",
};

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <SiteHeader title="題目資訊" hasBackButton />
      <main
        className={`
          flex-1 space-y-4 p-4 pt-6
          md:p-8
        `}
      >
        <div className="flex items-center justify-between space-y-2">
          <Header id={id as string} />

          <div className="flex items-center gap-2">
            <UpdateQuestionButtonTrigger id={id as string} />
            <DeleteQuestionButtonTrigger id={id as string} />
          </div>
        </div>
        <Suspense>
          <QuestionCards id={id as string} />
        </Suspense>
      </main>
    </>
  );
}
