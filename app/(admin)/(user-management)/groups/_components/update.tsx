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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          onCompleted={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </Suspense>
    </Dialog>
  );
}

export function UpdateGroupButtonTrigger({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants()}>
        <Pencil className="h-4 w-4" />
        編輯
      </DialogTrigger>

      <Suspense>
        <UpdateGroupDialogContent
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

function UpdateGroupDialogContent({
  id,
  open,
  onCompleted,
}: {
  id: string;
  open: boolean;
  onCompleted: () => void;
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
    refetchQueries: [GROUPS_TABLE_QUERY],

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
        scopeSetList={scopeSetList?.scopeSets || []}
      />
    </DialogContent>
  );
}
