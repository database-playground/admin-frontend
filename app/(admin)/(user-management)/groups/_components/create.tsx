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
import { useMutation, useSuspenseQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { GROUP_CREATE_MUTATION } from "./mutation";
import { GROUPS_TABLE_QUERY, SCOPE_SET_LIST_QUERY } from "./query";
import { UpdateGroupForm, type UpdateGroupFormData } from "./update-form";

export function CreateGroupTrigger() {
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
        <DialogTrigger className={buttonVariants()}>新增群組</DialogTrigger>
        <CreateGroupDialogContent
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

function CreateGroupDialogContent({
  onCompleted,
  onFormStateChange,
}: {
  onCompleted: () => void;
  onFormStateChange: (isDirty: boolean) => void;
}) {
  const { data: scopeSetList } = useSuspenseQuery(SCOPE_SET_LIST_QUERY);

  const [createGroup] = useMutation(GROUP_CREATE_MUTATION, {
    refetchQueries: [{ query: GROUPS_TABLE_QUERY }],

    onError(error) {
      toast.error("群組建立失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("群組建立成功");
      onCompleted();
    },
  });

  const onSubmit = (data: UpdateGroupFormData) => {
    try {
      createGroup({
        variables: {
          input: {
            name: data.name,
            description: data.description,
            scopeSetIDs: data.scopeSetIDs,
          },
        },
      });
    } catch (error) {
      toast.error("群組建立失敗", {
        description: error instanceof Error ? error.message : "未知錯誤",
      });
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>新增群組</DialogTitle>
        <DialogDescription>
          建立一個群組，對成員進行分組並授予相關權限。
        </DialogDescription>
      </DialogHeader>
      <UpdateGroupForm
        defaultValues={{
          name: "",
          description: "",
          scopeSetSlugs: [],
        }}
        onSubmit={onSubmit}
        action="create"
        onFormStateChange={onFormStateChange}
        scopeSetList={scopeSetList.scopeSets}
      />
    </DialogContent>
  );
}
