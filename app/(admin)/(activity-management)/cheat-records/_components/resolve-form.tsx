"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const resolveCheatRecordFormSchema = z.object({
  reason: z.string().min(1, "請輸入解決原因"),
});

export type ResolveCheatRecordFormData = z.infer<
  typeof resolveCheatRecordFormSchema
>;

export function ResolveCheatRecordForm({
  defaultValues,
  onSubmit,
  onFormStateChange,
}: {
  defaultValues: ResolveCheatRecordFormData;
  onSubmit: (data: ResolveCheatRecordFormData) => void;
  onFormStateChange?: (isDirty: boolean) => void;
}) {
  const form = useForm<ResolveCheatRecordFormData>({
    resolver: zodResolver(resolveCheatRecordFormSchema),
    defaultValues,
  });

  const isDirty = form.formState.isDirty;

  useEffect(() => {
    onFormStateChange?.(isDirty);
  }, [isDirty, onFormStateChange]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>解決原因</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="請輸入解決此作弊記錄的原因..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                請說明為什麼要解決這個作弊記錄。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit">解決記錄</Button>
        </div>
      </form>
    </Form>
  );
}
