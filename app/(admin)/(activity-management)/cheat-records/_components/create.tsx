"use client";

import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDialogCloseConfirmation } from "@/hooks/use-dialog-close-confirmation";
import { useMutation } from "@apollo/client/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { CreateCheatRecordForm, type CreateCheatRecordFormData } from "./create-form";
import { CREATE_CHEAT_RECORD_MUTATION } from "./mutation";
import { CHEAT_RECORDS_TABLE_QUERY } from "./query";

export function CreateCheatRecordButtonTrigger({
  userId,
}: {
  userId?: string;
}) {
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
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4" />
            新增作弊記錄
          </Button>
        </DialogTrigger>

        <Suspense>
          <CreateCheatRecordDialogContent
            userId={userId}
            onCompleted={handleCompleted}
            onFormStateChange={handleFormStateChange}
          />
        </Suspense>
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

function CreateCheatRecordDialogContent({
  userId,
  onCompleted,
  onFormStateChange,
}: {
  userId?: string;
  onCompleted: () => void;
  onFormStateChange: (isDirty: boolean) => void;
}) {
  const [createCheatRecord] = useMutation(CREATE_CHEAT_RECORD_MUTATION, {
    refetchQueries: [{ query: CHEAT_RECORDS_TABLE_QUERY }],
    awaitRefetchQueries: true,

    onError(error) {
      toast.error("新增作弊記錄失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("作弊記錄已新增");
      onCompleted();
    },
  });

  const onSubmit = (data: CreateCheatRecordFormData) => {
    try {
      createCheatRecord({
        variables: {
          reason: data.reason,
          userID: data.userID,
        },
      });
    } catch (error) {
      toast.error("新增作弊記錄失敗", {
        description: error instanceof Error ? error.message : "未知錯誤",
      });
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>新增作弊記錄</DialogTitle>
        <DialogDescription>
          為使用者新增一個作弊記錄，並提供原因。
        </DialogDescription>
      </DialogHeader>
      <CreateCheatRecordForm
        defaultValues={{
          reason: "",
          userID: userId || "",
        }}
        onSubmit={onSubmit}
        onFormStateChange={onFormStateChange}
      />
    </DialogContent>
  );
}
