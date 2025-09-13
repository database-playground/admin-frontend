"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { skipToken, useMutation, useSuspenseQuery } from "@apollo/client/react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { USER_DELETE_MUTATION } from "./mutation";
import { USER_BY_ID_QUERY, USERS_TABLE_QUERY } from "./query";

export function DeleteUserDropdownTrigger({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          variant="destructive"
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          刪除使用者
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <Suspense>
        <DeleteUserAlertDialogContent
          id={id}
          open={open}
          onCompleted={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </Suspense>
    </AlertDialog>
  );
}

export function DeleteUserButtonTrigger({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className={buttonVariants({ variant: "destructive" })}>
        <Trash className="h-4 w-4" />
        <span>刪除</span>
      </AlertDialogTrigger>

      <Suspense>
        <DeleteUserAlertDialogContent
          id={id}
          open={open}
          onCompleted={() => {
            setOpen(false);
            router.push(".");
          }}
        />
      </Suspense>
    </AlertDialog>
  );
}

function DeleteUserAlertDialogContent({
  id,
  open,
  onCompleted,
}: {
  id: string;
  open: boolean;
  onCompleted: () => void;
}) {
  const { data } = useSuspenseQuery(
    USER_BY_ID_QUERY,
    open
      ? {
        variables: { id },
      }
      : skipToken,
  );

  const [deleteUser] = useMutation(USER_DELETE_MUTATION, {
    refetchQueries: [USERS_TABLE_QUERY],

    onError(error) {
      toast.error("使用者刪除失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("使用者刪除成功");
      onCompleted();
    },
  });

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          確定要刪除「{data?.user.name}」使用者嗎？
        </AlertDialogTitle>
        <AlertDialogDescription>
          刪除後將無法復原此使用者。請謹慎操作。
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>取消</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => deleteUser({ variables: { id } })}
        >
          刪除
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
