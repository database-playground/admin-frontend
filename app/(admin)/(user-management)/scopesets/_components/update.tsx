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
import { z } from "zod";
import { UPDATE_SCOPE_SET_MUTATION } from "./mutation";
import { SCOPE_SET_BY_ID_QUERY } from "./query";
import { SCOPE_SET_TABLE_QUERY } from "./query";
import { formSchema, UpdateScopeSetForm } from "./update-form";

export function UpdateScopeSetDropdownTrigger({ id }: { id: string }) {
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
        <UpdateScopeSetDialogContent
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

export function UpdateScopeSetButtonTrigger({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants()}>
        <Pencil className="h-4 w-4" />
        編輯
      </DialogTrigger>

      <Suspense>
        <UpdateScopeSetDialogContent
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

function UpdateScopeSetDialogContent({
  id,
  open,
  onCompleted,
}: {
  id: string;
  open: boolean;
  onCompleted: () => void;
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
    refetchQueries: [SCOPE_SET_TABLE_QUERY, SCOPE_SET_BY_ID_QUERY],

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
      />
    </DialogContent>
  );
}
