"use client";

import { buttonVariants } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QuestionDifficulty } from "@/gql/graphql";
import { useDialogCloseConfirmation } from "@/hooks/use-dialog-close-confirmation";
import { useMutation, useSuspenseQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { QUESTION_CREATE_MUTATION } from "./mutation";
import { QUESTIONS_TABLE_QUERY } from "./query";
import { UpdateQuestionForm, type UpdateQuestionFormData } from "./update-form";
import { graphql } from "@/gql";

export function CreateQuestionTrigger() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const {
    showConfirmation,
    handleDialogOpenChange,
    handleConfirmClose,
    handleCancelClose,
  } = useDialogCloseConfirmation({
    isDirty: isFormDirty,
    setOpen,
    onConfirmedClose: () => {
      setIsFormDirty(false);
    },
  });

  const handleFormStateChange = (isDirty: boolean) => {
    setIsFormDirty(isDirty);
  };

  const handleCompleted = () => {
    setIsFormDirty(false);
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogOpenChange}>
        <DialogTrigger className={buttonVariants()}>新增題目</DialogTrigger>
        <CreateQuestionDialogContent
          onCompleted={handleCompleted}
          onFormStateChange={handleFormStateChange}
        />
      </Dialog>

      <ConfirmationDialog
        open={showConfirmation}
        onOpenChange={() => {}}
        onConfirm={handleConfirmClose}
        onCancel={handleCancelClose}
      />
    </>
  );
}

const CREATE_QUESTION_DIALOG_CONTENT_QUERY = graphql(`
  query CreateQuestionDialogContent {
    ...QuestionUpdateForm
  }
`);

function CreateQuestionDialogContent({
  onCompleted,
  onFormStateChange,
}: {
  onCompleted: () => void;
  onFormStateChange: (isDirty: boolean) => void;
}) {
  const { data } = useSuspenseQuery(CREATE_QUESTION_DIALOG_CONTENT_QUERY);

  const [createQuestion] = useMutation(QUESTION_CREATE_MUTATION, {
    refetchQueries: [{ query: QUESTIONS_TABLE_QUERY }],

    onError(error) {
      toast.error("題目建立失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("題目建立成功");
      onCompleted();
    },
  });

  const onSubmit = (data: UpdateQuestionFormData) => {
    try {
      if (!data.databaseID) {
        toast.error("必須選擇一個資料庫");
        return;
      }

      createQuestion({
        variables: {
          input: {
            title: data.title,
            description: data.description,
            category: data.category,
            difficulty: data.difficulty,
            referenceAnswer: data.referenceAnswer,
            databaseID: data.databaseID, // Now single ID as per new schema
          },
        },
      });
    } catch (error) {
      toast.error("題目建立失敗", {
        description: error instanceof Error ? error.message : "未知錯誤",
      });
    }
  };

  return (
    <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle>新增題目</DialogTitle>
        <DialogDescription>
          建立一個新的 SQL 練習題目，包含題目內容、難度和相關資料庫。
        </DialogDescription>
      </DialogHeader>
      <UpdateQuestionForm
        defaultValues={{
          title: "",
          description: "",
          category: "",
          difficulty: QuestionDifficulty.Unspecified,
          referenceAnswer: "",
          databaseID: undefined,
        }}
        onSubmit={onSubmit}
        action="create"
        onFormStateChange={onFormStateChange}
        fragment={data}
      />
    </DialogContent>
  );
}
