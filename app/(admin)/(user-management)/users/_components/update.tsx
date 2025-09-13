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
import { USER_UPDATE_MUTATION } from "./mutation";
import { GROUP_LIST_QUERY, USER_BY_ID_QUERY, USERS_TABLE_QUERY } from "./query";
import { UpdateUserForm, type UpdateUserFormData } from "./update-form";

export function UpdateUserDropdownTrigger({ id }: { id: string }) {
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
          編輯使用者
        </DropdownMenuItem>
      </DialogTrigger>
      <Suspense>
        <UpdateUserDialogContent
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

export function UpdateUserButtonTrigger({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants()}>
        <Pencil className="h-4 w-4" />
        編輯
      </DialogTrigger>

      <Suspense>
        <UpdateUserDialogContent
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

function UpdateUserDialogContent({
  id,
  open,
  onCompleted,
}: {
  id: string;
  open: boolean;
  onCompleted: () => void;
}) {
  const { data: groupList } = useSuspenseQuery(
    GROUP_LIST_QUERY,
    open ? {} : skipToken,
  );
  const { data: user } = useSuspenseQuery(
    USER_BY_ID_QUERY,
    open
      ? {
        variables: { id },
      }
      : skipToken,
  );

  const [updateUser] = useMutation(USER_UPDATE_MUTATION, {
    refetchQueries: [USERS_TABLE_QUERY],

    onError(error) {
      toast.error("使用者更新失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("使用者更新成功");
      onCompleted();
    },
  });

  const onSubmit = (data: UpdateUserFormData) => {
    try {
      updateUser({
        variables: {
          id,
          input: data,
        },
      });
    } catch (error) {
      toast.error("使用者更新失敗", {
        description: error instanceof Error ? error.message : "未知錯誤",
      });
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>編輯使用者</DialogTitle>
        <DialogDescription>
          編輯一個使用者，可以為其授予權限。
        </DialogDescription>
      </DialogHeader>
      <UpdateUserForm
        defaultValues={{
          name: user?.user.name || "",
          avatar: user?.user.avatar ?? undefined,
          groupID: user?.user.group.id || "",
        }}
        onSubmit={onSubmit}
        action="update"
        groupList={groupList?.groups || []}
      />
    </DialogContent>
  );
}
