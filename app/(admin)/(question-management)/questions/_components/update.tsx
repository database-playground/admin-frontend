"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { QuestionDifficulty } from "@/gql/graphql";
import { skipToken, useMutation, useSuspenseQuery } from "@apollo/client/react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { QUESTION_UPDATE_MUTATION } from "./mutation";
import { DATABASE_LIST_QUERY, QUESTION_BY_ID_QUERY, QUESTIONS_TABLE_QUERY } from "./query";
import { UpdateQuestionForm, type UpdateQuestionFormData } from "./update-form";

export function UpdateQuestionDropdownTrigger({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          編輯題目
        </DropdownMenuItem>
      </DialogTrigger>
      <Suspense>
        <UpdateQuestionDialogContent
          id={id}
          open={open}
          onCompleted={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </Suspense>
    </Dialog>
  );
}

export function UpdateQuestionButtonTrigger({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants()}>
        <Pencil className="h-4 w-4" />
        編輯
      </DialogTrigger>

      <Suspense>
        <UpdateQuestionDialogContent
          id={id}
          open={open}
          onCompleted={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </Suspense>
    </Dialog>
  );
}

function UpdateQuestionDialogContent({
  id,
  open,
  onCompleted,
}: {
  id: string;
  open: boolean;
  onCompleted: () => void;
}) {
  const { data: databaseList } = useSuspenseQuery(
    DATABASE_LIST_QUERY,
    open ? {} : skipToken,
  );
  const { data: question } = useSuspenseQuery(
    QUESTION_BY_ID_QUERY,
    open
      ? {
        variables: { id },
      }
      : skipToken,
  );

  const [updateQuestion] = useMutation(QUESTION_UPDATE_MUTATION, {
    refetchQueries: [QUESTIONS_TABLE_QUERY],

    onError(error) {
      toast.error("題目更新失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("題目更新成功");
      onCompleted();
    },
  });

  const onSubmit = (data: UpdateQuestionFormData) => {
    try {
      updateQuestion({
        variables: {
          id,
          input: data,
        },
      });
    } catch (error) {
      toast.error("題目更新失敗", {
        description: error instanceof Error ? error.message : "未知錯誤",
      });
    }
  };

  return (
    <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle>編輯題目</DialogTitle>
        <DialogDescription>
          編輯 SQL 練習題目，包含題目內容、難度和相關資料庫。
        </DialogDescription>
      </DialogHeader>
      <UpdateQuestionForm
        defaultValues={{
          title: question?.question.title || "",
          description: question?.question.description || "",
          category: question?.question.category || "",
          difficulty: question?.question.difficulty || QuestionDifficulty.Easy,
          referenceAnswer: question?.question.referenceAnswer || "",
          databaseID: question?.question.database.id || "",
        }}
        onSubmit={onSubmit}
        action="update"
        databaseList={databaseList?.databases || []}
      />
    </DialogContent>
  );
}
