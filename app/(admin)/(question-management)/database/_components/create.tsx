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
import { useDialogCloseConfirmation } from "@/hooks/use-dialog-close-confirmation";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { toast } from "sonner";
import { DATABASE_CREATE_MUTATION } from "./mutation";
import { DATABASES_TABLE_QUERY } from "./query";
import { UpdateDatabaseForm } from "./update-form";

export function CreateDatabaseTrigger() {
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
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogOpenChange}>
        <DialogTrigger className={buttonVariants()}>新增資料庫</DialogTrigger>
        <CreateDatabaseDialogContent
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

function CreateDatabaseDialogContent({
  onCompleted,
  onFormStateChange,
}: {
  onCompleted: () => void;
  onFormStateChange: (isDirty: boolean) => void;
}) {
  const [createDatabase] = useMutation(DATABASE_CREATE_MUTATION, {
    refetchQueries: [DATABASES_TABLE_QUERY],

    onError(error) {
      toast.error("資料庫建立失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("資料庫建立成功");
      onCompleted();
    },
  });

  return (
    <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle>新增資料庫</DialogTitle>
        <DialogDescription>
          建立一個新的 SQL 練習用資料庫，包含資料結構和關係圖。
        </DialogDescription>
      </DialogHeader>
      <UpdateDatabaseForm
        defaultValues={{
          slug: "",
          description: "",
          schema: "",
          relationFigure: "",
        }}
        onSubmit={(data) => {
          createDatabase({
            variables: {
              input: {
                slug: data.slug,
                description: data.description,
                schema: data.schema,
                relationFigure: data.relationFigure,
              },
            },
          });
        }}
        action="create"
        onFormStateChange={onFormStateChange}
      />
    </DialogContent>
  );
}
