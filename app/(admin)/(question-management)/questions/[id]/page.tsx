import { SiteHeader } from "@/components/site-header";
import { DeleteQuestionButtonTrigger } from "../_components/delete";
import { UpdateQuestionButtonTrigger } from "../_components/update";
import { AnswerCard } from "./_components/answer-card";
import { DatabaseCard } from "./_components/database-card";
import { DescriptionCard } from "./_components/description-card";
import { Header } from "./_components/header";

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
        <div
          className={`
            grid grid-cols-1 gap-4
            lg:grid-cols-2
          `}
        >
          <DescriptionCard id={id as string} />
          <DatabaseCard id={id as string} />
          <AnswerCard id={id as string} />
        </div>
      </main>
    </>
  );
}
