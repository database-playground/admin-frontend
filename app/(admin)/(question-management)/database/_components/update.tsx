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
import { DATABASE_UPDATE_MUTATION } from "./mutation";
import { DATABASE_BY_ID_QUERY, DATABASES_TABLE_QUERY } from "./query";
import { UpdateDatabaseForm, type UpdateDatabaseFormData } from "./update-form";

export function UpdateDatabaseDropdownTrigger({ id }: { id: string }) {
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
          編輯資料庫
        </DropdownMenuItem>
      </DialogTrigger>
      <Suspense>
        <UpdateDatabaseDialogContent
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

export function UpdateDatabaseButtonTrigger({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants()}>
        <Pencil className="h-4 w-4" />
        編輯
      </DialogTrigger>

      <Suspense>
        <UpdateDatabaseDialogContent
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

function UpdateDatabaseDialogContent({
  id,
  open,
  onCompleted,
}: {
  id: string;
  open: boolean;
  onCompleted: () => void;
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
    refetchQueries: [DATABASES_TABLE_QUERY],

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

  const onSubmit = (data: UpdateDatabaseFormData) => {
    try {
      updateDatabase({
        variables: {
          id,
          input: {
            description: data.description,
            schema: data.schema,
            relationFigure: data.relationFigure,
            clearDescription: data.clearDescription,
          },
        },
      });
    } catch (error) {
      toast.error("資料庫更新失敗", {
        description: error instanceof Error ? error.message : "未知錯誤",
      });
    }
  };

  return (
    <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto">
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
          onSubmit={onSubmit}
          action="update"
        />
    </DialogContent>
  );
}
