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
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { RESOLVE_CHEAT_RECORD_MUTATION } from "./mutation";
import { CHEAT_RECORD_BY_ID_QUERY, CHEAT_RECORDS_TABLE_QUERY } from "./query";
import { ResolveCheatRecordForm, type ResolveCheatRecordFormData } from "./resolve-form";

export function ResolveCheatRecordDropdownTrigger({ id }: { id: string }) {
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
            解決記錄
          </DropdownMenuItem>
        </DialogTrigger>
        <Suspense>
          <ResolveCheatRecordDialogContent
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

export function ResolveCheatRecordButtonTrigger({ id }: { id: string }) {
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
          <CheckCircle2 className="h-4 w-4" />
          解決記錄
        </DialogTrigger>

        <Suspense>
          <ResolveCheatRecordDialogContent
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

function ResolveCheatRecordDialogContent({
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
  const { data: cheatRecord } = useSuspenseQuery(
    CHEAT_RECORD_BY_ID_QUERY,
    open
      ? {
        variables: { id },
      }
      : skipToken,
  );

  const [resolveCheatRecord] = useMutation(RESOLVE_CHEAT_RECORD_MUTATION, {
    refetchQueries: [
      { query: CHEAT_RECORDS_TABLE_QUERY },
      { query: CHEAT_RECORD_BY_ID_QUERY, variables: { id } },
    ],
    awaitRefetchQueries: true,

    onError(error) {
      toast.error("解決記錄失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("記錄已解決");
      onCompleted();
    },
  });

  const onSubmit = (data: ResolveCheatRecordFormData) => {
    try {
      resolveCheatRecord({
        variables: {
          cheatRecordID: id,
          reason: data.reason,
        },
      });
    } catch (error) {
      toast.error("解決記錄失敗", {
        description: error instanceof Error ? error.message : "未知錯誤",
      });
    }
  };

  if (!cheatRecord?.cheatRecord) {
    return null;
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>解決作弊記錄</DialogTitle>
        <DialogDescription>
          為此作弊記錄標記為已解決，並提供解決原因。
        </DialogDescription>
      </DialogHeader>
      <ResolveCheatRecordForm
        defaultValues={{
          reason: "",
        }}
        onSubmit={onSubmit}
        onFormStateChange={onFormStateChange}
      />
    </DialogContent>
  );
}
