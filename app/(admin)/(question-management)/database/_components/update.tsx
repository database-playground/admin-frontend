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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDialogCloseConfirmation } from "@/hooks/use-dialog-close-confirmation";
import { skipToken, useMutation, useSuspenseQuery } from "@apollo/client/react";
import { Pencil } from "lucide-react";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { DATABASE_UPDATE_MUTATION } from "./mutation";
import { DATABASE_BY_ID_QUERY, DATABASES_TABLE_QUERY } from "./query";
import {
  UpdateDatabaseForm,
} from "./update-form";

export function UpdateDatabaseDropdownTrigger({ id }: { id: string }) {
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
        <DialogTrigger asChild>
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
          >
            編輯資料庫
          </DropdownMenuItem>
        </DialogTrigger>
        <Suspense>
          <UpdateDatabaseDialogContent
            id={id}
            open={open}
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

export function UpdateDatabaseButtonTrigger({ id }: { id: string }) {
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
        <DialogTrigger className={buttonVariants()}>
          <Pencil className="h-4 w-4" />
          編輯
        </DialogTrigger>

        <Suspense>
          <UpdateDatabaseDialogContent
            id={id}
            open={open}
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

function UpdateDatabaseDialogContent({
  id,
  open,
  onCompleted,
  onFormStateChange,
}: {
  id: string;
  open: boolean;
  onCompleted: () => void;
  onFormStateChange: (isDirty: boolean) => void;
}) {
  const { data: database } = useSuspenseQuery(
    DATABASE_BY_ID_QUERY,
    open
      ? {
          variables: { id },
        }
      : skipToken
  );

  const [updateDatabase] = useMutation(DATABASE_UPDATE_MUTATION, {
    refetchQueries: [
      { query: DATABASES_TABLE_QUERY },
      { query: DATABASE_BY_ID_QUERY, variables: { id } },
    ],

    onError(error) {
      toast.error("資料庫更新失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("資料庫更新成功");
      onCompleted();
    },
  });

  return (
    <DialogContent className="max-h-[85vh] sm:max-w-3xl overflow-y-auto">
      <DialogHeader>
        <DialogTitle>編輯資料庫</DialogTitle>
        <DialogDescription>
          編輯 SQL 練習用資料庫，包含資料結構和關係圖。
        </DialogDescription>
      </DialogHeader>
      <UpdateDatabaseForm
        defaultValues={{
          slug: database?.database.slug || "",
          description: database?.database.description || undefined,
          schema: database?.database.schema || "",
          relationFigure: database?.database.relationFigure || "",
        }}
        onSubmit={(data) => {
          updateDatabase({
            variables: {
              id,
              input: {
                description: data.description || undefined,
                schema: data.schema || undefined,
                relationFigure: data.relationFigure || undefined,
                clearDescription: data.description === "",
              },
            }
          });
        }}
        action="update"
        onFormStateChange={onFormStateChange}
      />
    </DialogContent>
  );
}
