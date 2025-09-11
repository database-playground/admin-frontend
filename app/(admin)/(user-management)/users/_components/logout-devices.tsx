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
import { useMutation, useSuspenseQuery } from "@apollo/client/react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { USER_LOGOUT_DEVICES_MUTATION } from "./mutation";
import { USER_BY_ID_QUERY } from "./query";

export function LogoutUserDevicesDropdownTrigger({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          登出所有裝置
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <Suspense>
        <LogoutUserDevicesAlertDialogContent
          id={id}
          onCompleted={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </Suspense>
    </AlertDialog>
  );
}

export function LogoutUserDevicesButtonTrigger({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className={buttonVariants({ variant: "outline" })}>
        <LogOut className="h-4 w-4" />
        <span>登出所有裝置</span>
      </AlertDialogTrigger>

      <Suspense>
        <LogoutUserDevicesAlertDialogContent
          id={id}
          onCompleted={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </Suspense>
    </AlertDialog>
  );
}

function LogoutUserDevicesAlertDialogContent({
  id,
  onCompleted,
}: {
  id: string;
  onCompleted: () => void;
}) {
  const { data } = useSuspenseQuery(USER_BY_ID_QUERY, {
    variables: { id },
  });

  const [logoutUserDevices] = useMutation(USER_LOGOUT_DEVICES_MUTATION, {
    onError(error) {
      toast.error("登出所有裝置失敗", {
        description: error.message,
      });
    },

    onCompleted() {
      toast.success("已成功登出使用者的所有裝置");
      onCompleted();
    },
  });

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          確定要登出「{data.user.name}」的所有裝置嗎？
        </AlertDialogTitle>
        <AlertDialogDescription>
          此操作會強制登出該使用者在所有裝置上的登入狀態，使用者需要重新登入才能繼續使用服務。
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>取消</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => logoutUserDevices({ variables: { userID: id } })}
        >
          登出所有裝置
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
