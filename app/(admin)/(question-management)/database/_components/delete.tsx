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
import { DATABASE_DELETE_MUTATION } from "./mutation";
import { DATABASE_BY_ID_QUERY, DATABASES_TABLE_QUERY } from "./query";

export function DeleteDatabaseDropdownTrigger({ id }: { id: string }) {
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
          刪除資料庫
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <Suspense>
        <DeleteDatabaseAlertDialogContent
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

export function DeleteDatabaseButtonTrigger({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className={buttonVariants({ variant: "destructive" })}>
        <Trash className="h-4 w-4" />
        <span>刪除</span>
      </AlertDialogTrigger>

      <Suspense>
        <DeleteDatabaseAlertDialogContent
          id={id}
          open={open}
          onCompleted={() => {
            setOpen(false);
            router.push("/database");
          }}
        />
      </Suspense>
    </AlertDialog>
  );
}

function DeleteDatabaseAlertDialogContent({
  id,
  open,
  onCompleted,
}: {
  id: string;
  open: boolean;
  onCompleted: () => void;
}) {
  const { data } = useSuspenseQuery(
    DATABASE_BY_ID_QUERY,
    open
      ? {
        variables: { id },
      }
      : skipToken,
  );

  const [deleteDatabase] = useMutation(DATABASE_DELETE_MUTATION, {
    refetchQueries: [DATABASES_TABLE_QUERY],

    onError(error) {
      toast.error("資料庫刪除失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("資料庫刪除成功");
      onCompleted();
    },
  });

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          確定要刪除「{data?.database.slug}」資料庫嗎？
        </AlertDialogTitle>
        <AlertDialogDescription>
          刪除後將無法復原此資料庫，且相關的題目可能會受到影響。請謹慎操作。
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>取消</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => deleteDatabase({ variables: { id } })}
        >
          刪除
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
