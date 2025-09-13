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
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { UPDATE_SCOPE_SET_MUTATION } from "./mutation";
import { SCOPE_SET_BY_ID_QUERY } from "./query";
import { SCOPE_SET_TABLE_QUERY } from "./query";
import { formSchema, UpdateScopeSetForm } from "./update-form";

export function UpdateScopeSetDropdownTrigger({ id }: { id: string }) {
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
          <DropdownMenuItem
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
          >
            編輯權限集
          </DropdownMenuItem>
        </DialogTrigger>
        <Suspense>
          <UpdateScopeSetDialogContent
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

export function UpdateScopeSetButtonTrigger({ id }: { id: string }) {
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
        <DialogTrigger className={buttonVariants()}>
          <Pencil className="h-4 w-4" />
          編輯
        </DialogTrigger>

        <Suspense>
          <UpdateScopeSetDialogContent
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

function UpdateScopeSetDialogContent({
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
  const { data } = useSuspenseQuery(
    SCOPE_SET_BY_ID_QUERY,
    open
      ? {
        variables: { id },
      }
      : skipToken,
  );

  const [updateScopeSet] = useMutation(UPDATE_SCOPE_SET_MUTATION, {
    refetchQueries: [
      { query: SCOPE_SET_TABLE_QUERY },
      { query: SCOPE_SET_BY_ID_QUERY, variables: { id } },
    ],

    onError(error) {
      toast.error("權限集更新失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("權限集更新成功");
      onCompleted();
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    updateScopeSet({
      variables: {
        id: id,
        input: {
          scopes: data.scopes ?? [],
          clearDescription: data.description === "",
          description: data.description || undefined,
        },
      },
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>編輯權限集</DialogTitle>
        <DialogDescription>
          編輯一個權限集，用來授予群組內的成員執行某項功能的權限。
          <br />
          完整的權限說明可以參考{" "}
          <a
            className="underline"
            href="https://github.com/database-playground/backend-v2/blob/main/docs/scope.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            權限對照表
          </a>
          。
        </DialogDescription>
      </DialogHeader>
      <UpdateScopeSetForm
        defaultValues={{
          slug: data?.scopeSet.slug || "",
          description: data?.scopeSet.description ?? "",
          scopes: data?.scopeSet.scopes ?? [],
        }}
        onSubmit={onSubmit}
        action="update"
        onFormStateChange={onFormStateChange}
      />
    </DialogContent>
  );
}
