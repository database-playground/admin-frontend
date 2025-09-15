"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useMutation } from "@apollo/client/react";
import { Copy, Key, X } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import revokeSpecificToken from "../_actions/revoke-token";
import { USER_IMPERSONATE_MUTATION } from "./mutation";

export function ImpersonateUserDropdownTrigger({
  userId,
}: {
  userId: string;
}) {
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
          取得代理憑證
        </DropdownMenuItem>
      </DialogTrigger>

      <ImpersonateUserDialogContent
        userId={userId}
        onCompleted={() => setOpen(false)}
      />
    </Dialog>
  );
}

export function ImpersonateUserButtonTrigger({
  userId,
}: {
  userId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ variant: "outline" })}>
        <Key className="h-4 w-4" />
        取得代理憑證
      </DialogTrigger>

      <ImpersonateUserDialogContent
        userId={userId}
        onCompleted={() => setOpen(false)}
      />
    </Dialog>
  );
}

function ImpersonateUserDialogContent({
  userId,
  onCompleted,
}: {
  userId: string;
  onCompleted: () => void;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [impersonateUser, { loading }] = useMutation(USER_IMPERSONATE_MUTATION, {
    onError(error) {
      toast.error("無法取得代理操作憑證", {
        description: error.message,
      });
    },

    onCompleted(data) {
      setToken(data.impersonateUser);
      toast.success("已產生代理操作憑證");
    },
  });

  const handleImpersonate = () => {
    impersonateUser({
      variables: {
        userID: userId,
      },
    });
  };

  const handleCopy = async () => {
    if (!token) return;

    try {
      await navigator.clipboard.writeText(token);
      toast.success("已將憑證複製到剪貼簿");
    } catch (error) {
      toast.error("複製憑證失敗", {
        description: error instanceof Error ? error.message : undefined,
      });
    }
  };

  const handleRevoke = () => {
    if (!token) return;

    startTransition(async () => {
      try {
        await revokeSpecificToken(token);
        toast.success("已撤銷憑證");
        setToken(null);
        onCompleted();
      } catch (error) {
        toast.error("撤銷憑證失敗", {
          description: error instanceof Error ? error.message : undefined,
        });
      }
    });
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>取得代理憑證</DialogTitle>
        <DialogDescription>
          產生代理憑證，以在 API 層面代理使用者執行動作。代理憑證有效期為 8 小時。
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        {!token
          ? (
            <div className="py-4 text-center">
              <p className="mb-4 text-sm text-muted-foreground">
                點選下方按鈕以產生代理憑證
              </p>
              <Button
                onClick={handleImpersonate}
                disabled={loading}
                className="w-full"
              >
                <Key className="mr-2 h-4 w-4" />
                {loading ? "產生中……" : "產生代理憑證"}
              </Button>
            </div>
          )
          : (
            <div className="space-y-3">
              <div className="rounded-md bg-muted p-3">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  代理憑證
                </p>
                <code className="font-mono text-sm break-all">
                  {token}
                </code>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="flex-1"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  複製
                </Button>
                <Button
                  onClick={handleRevoke}
                  variant="destructive"
                  disabled={isPending}
                  className="flex-1"
                >
                  <X className="mr-2 h-4 w-4" />
                  {isPending ? "撤銷中……" : "撤銷"}
                </Button>
              </div>
            </div>
          )}
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">關閉</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
