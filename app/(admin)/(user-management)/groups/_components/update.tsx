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
import { GROUP_UPDATE_MUTATION } from "./mutation";
import { GROUP_BY_ID_QUERY, GROUPS_TABLE_QUERY, SCOPE_SET_LIST_QUERY } from "./query";
import { UpdateGroupForm, type UpdateGroupFormData } from "./update-form";

export function UpdateGroupDropdownTrigger({ id }: { id: string }) {
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
          <UpdateGroupDialogContent
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

export function UpdateGroupButtonTrigger({ id }: { id: string }) {
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
          <UpdateGroupDialogContent
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

function UpdateGroupDialogContent({
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
  const { data: scopeSetList } = useSuspenseQuery(
    SCOPE_SET_LIST_QUERY,
    open ? {} : skipToken,
  );
  const { data: group } = useSuspenseQuery(
    GROUP_BY_ID_QUERY,
    open
      ? {
        variables: { id },
      }
      : skipToken,
  );

  const [updateGroup] = useMutation(GROUP_UPDATE_MUTATION, {
    refetchQueries: [
      { query: GROUPS_TABLE_QUERY },
      { query: GROUP_BY_ID_QUERY, variables: { id } },
    ],

    onError(error) {
      toast.error("群組更新失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("群組更新成功");
      onCompleted();
    },
  });

  const onSubmit = (data: UpdateGroupFormData) => {
    try {
      const addScopeSetIDs = data.scopeSetIDs.filter(
        (id) => !group?.group.scopeSets?.some((scopeSet) => scopeSet.id === id),
      );
      const removeScopeSetIDs = group?.group.scopeSets
        ?.filter((scopeSet) => !data.scopeSetIDs.includes(scopeSet.id))
        .map((scopeSet) => scopeSet.id) ?? undefined;
      const clearScopeSets = data.scopeSetIDs.length === 0;

      updateGroup({
        variables: {
          id,
          input: {
            name: data.name,
            description: data.description,
            addScopeSetIDs,
            removeScopeSetIDs,
            clearScopeSets,
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
        <DialogTitle>編輯群組</DialogTitle>
        <DialogDescription>
          編輯一個群組，對成員進行分組並授予相關權限。
        </DialogDescription>
      </DialogHeader>
      <UpdateGroupForm
        defaultValues={{
          name: group?.group.name || "",
          description: group?.group.description ?? undefined,
          scopeSetSlugs: group?.group.scopeSets?.map((scopeSet) => scopeSet.slug) ?? [],
        }}
        onSubmit={onSubmit}
        action="update"
        onFormStateChange={onFormStateChange}
        scopeSetList={scopeSetList?.scopeSets || []}
      />
    </DialogContent>
  );
}
