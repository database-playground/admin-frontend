"use client";

import AppAvatar from "@/components/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BASIC_USER_INFO_QUERY } from "@/lib/user";
import { useUser } from "@/providers/use-user";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ME_UPDATE_MUTATION } from "./mutation";

const updateUserInput = z.object({
  name: z.string(),
  avatar: z.url().optional(),
});

export function MeForm() {
  const { user } = useUser();

  const form = useForm<z.infer<typeof updateUserInput>>({
    resolver: zodResolver(updateUserInput),
    defaultValues: {
      name: user?.name ?? "",
      avatar: user?.avatar ?? undefined,
    },
  });

  const avatar = useWatch({ control: form.control, name: "avatar" });

  useEffect(() => {
    if (!form.formState.isDirty) return;
    const message = "您有尚未儲存的更動。確定要關閉而不儲存嗎？您的更動將會遺失。";

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [form.formState.isDirty]);

  const [updateMe] = useMutation(ME_UPDATE_MUTATION, {
    refetchQueries: [BASIC_USER_INFO_QUERY],
    onError: (error) => {
      toast.error("更新使用者資訊失敗", {
        description: error.message,
      });
    },
    onCompleted: () => {
      toast.success("更新使用者資訊成功");
    },
  });

  const handleUpdateUserInfo = async (
    values: z.infer<typeof updateUserInput>,
  ) => {
    await updateMe({ variables: { input: values } });
  };

  return (
    <>
      <div className="flex w-full max-w-xl flex-col items-center">
        <AppAvatar
          src={avatar}
          name={user?.name ?? ""}
          className="mb-8 h-20 w-20"
        />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateUserInfo)}
          className="w-xl space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>姓名</FormLabel>
                <FormControl>
                  <Input placeholder="姓名" {...field} />
                </FormControl>
                <FormDescription>公開顯示的姓名。</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>頭貼連結</FormLabel>
                <FormControl>
                  <Input placeholder="頭貼連結" {...field} />
                </FormControl>
                <FormDescription>公開顯示的頭貼連結。</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">儲存</Button>
        </form>
      </Form>
    </>
  );
}
