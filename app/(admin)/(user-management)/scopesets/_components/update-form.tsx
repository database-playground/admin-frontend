import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputTags } from "@/components/ui/input-tags";
import { Textarea } from "@/components/ui/textarea";
import { UpdateFormBody } from "@/components/update-modal/form-body";
import type { UpdateFormBaseProps } from "@/components/update-modal/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  slug: z.string().min(1),
  description: z.string().optional(),
  scopes: z.array(z.string()).optional(),
});

export type UpdateScopeSetFormProps = UpdateFormBaseProps<z.infer<typeof formSchema>>;

export function UpdateScopeSetForm({
  defaultValues,
  onSubmit,
  action,
  onFormStateChange,
}: UpdateScopeSetFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <UpdateFormBody
      form={form}
      onSubmit={onSubmit}
      action={action}
      onFormStateChange={onFormStateChange}
    >
        <FormField
          control={form.control}
          name="slug"
          disabled={action === "update"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>權限集名稱</FormLabel>
              <FormControl>
                <Input placeholder="e.g. question-reader" {...field} />
              </FormControl>
              <FormDescription>引用權限集時，人類可讀的代號。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>權限集描述</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g. 可以閱讀問題" {...field} />
              </FormControl>
              <FormDescription>幫助管理者理解權限集的用途。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scopes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>權限</FormLabel>
              <FormControl>
                <InputTags
                  value={field.value ?? []}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

    </UpdateFormBody>
  );
}
