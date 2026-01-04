"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { graphql } from "@/gql";
import { skipToken, useQuery } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedValue } from "foxact/use-debounced-value";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const createCheatRecordFormSchema = z.object({
  reason: z.string().min(1, "請輸入原因"),
  userID: z.string().min(1, "請輸入使用者 ID"),
});

const CREATE_CHEAT_RECORD_FORM_USER_INFO_QUERY = graphql(`
  query CreateCheatRecordFormUserInfo($id: ID!) {
    user(id: $id) {
      id
      email
      name
    }
  }
`);

export type CreateCheatRecordFormData = z.infer<
  typeof createCheatRecordFormSchema
>;

export function CreateCheatRecordForm({
  defaultValues,
  onSubmit,
  onFormStateChange,
}: {
  defaultValues: CreateCheatRecordFormData;
  onSubmit: (data: CreateCheatRecordFormData) => void;
  onFormStateChange?: (isDirty: boolean) => void;
}) {
  const form = useForm<CreateCheatRecordFormData>({
    resolver: zodResolver(createCheatRecordFormSchema),
    defaultValues,
  });

  const isDirty = form.formState.isDirty;

  useEffect(() => {
    onFormStateChange?.(isDirty);
  }, [isDirty, onFormStateChange]);

  const userID = useWatch({ control: form.control, name: "userID" });
  const userIDDebounced = useDebouncedValue(userID, 200);

  const { data: userInfoData, loading } = useQuery(
    CREATE_CHEAT_RECORD_FORM_USER_INFO_QUERY,
    userIDDebounced
      ? {
        variables: {
          id: userIDDebounced,
        },
        errorPolicy: "ignore",
      }
      : skipToken,
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="userID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>使用者 ID</FormLabel>
              <FormControl>
                <Input {...field} placeholder="請輸入使用者 ID" />
              </FormControl>
              <FormDescription>
                <div>
                  選擇要新增作弊記錄的使用者。可以到使用者管理頁面確認對應代號。
                </div>

                <div className="flex items-center gap-4">
                  {loading ? <Spinner className="mr-4 inline-block size-4" /> : null}
                  {userInfoData?.user
                    ? `您正要為：${userInfoData.user.name} (${userInfoData.user.email}) 新增作弊記錄`
                    : userIDDebounced
                      ? "您輸入的使用者 ID 不存在。"
                      : ""}
                </div>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>原因</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="請輸入作弊原因..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                請說明為什麼要新增這個作弊記錄。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit">新增記錄</Button>
        </div>
      </form>
    </Form>
  );
}
