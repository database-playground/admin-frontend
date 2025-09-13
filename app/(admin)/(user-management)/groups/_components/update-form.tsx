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
  name: z.string().min(1),
  description: z.string().optional(),
  scopeSetSlugs: z.array(z.string()).optional(),
});

export interface UpdateGroupFormData {
  name: string;
  description?: string;
  scopeSetIDs: string[];
}

export interface UpdateGroupFormProps extends Omit<UpdateFormBaseProps<z.infer<typeof formSchema>>, 'onSubmit'> {
  onSubmit: (newValues: UpdateGroupFormData) => void;
  scopeSetList: { id: string; slug: string }[];
}

export function UpdateGroupForm({
  defaultValues,
  onSubmit,
  action,
  onFormStateChange,
  scopeSetList,
}: UpdateGroupFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // map scope set slugs to scope set ids
    const scopeSetIDs = data.scopeSetSlugs?.map((slug) => {
      const scopeSet = scopeSetList.find((scopeSet) => scopeSet.slug === slug);
      if (!scopeSet) {
        throw new Error(`權限集「${slug}」不存在`);
      }
      return scopeSet.id;
    });

    onSubmit({
      ...data,
      scopeSetIDs: scopeSetIDs ?? [],
    });
  };

  return (
    <UpdateFormBody
      form={form}
      onSubmit={handleSubmit}
      action={action}
      onFormStateChange={onFormStateChange}
    >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>群組名稱</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 甲班" {...field} />
              </FormControl>
              <FormDescription>群組名稱，用於辨識群組。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>群組描述</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g. 114 學年度的甲班同學，具有普通使用者權限"
                  {...field}
                />
              </FormControl>
              <FormDescription>幫助管理者理解群組的用途。</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scopeSetSlugs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>權限集</FormLabel>
              <FormControl>
                <InputTags
                  name="scopeSetSlugs"
                  value={field.value ?? []}
                  onChange={field.onChange}
                  list="scopeSetList"
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                輸入要套用的權限集 slug，例如 <code>admin</code>。
              </FormDescription>
            </FormItem>
          )}
        />

        {/* scope set list */}
        <datalist id="scopeSetList">
          {scopeSetList.map((scopeSet) => <option key={scopeSet.id} value={scopeSet.slug} />)}
        </datalist>

    </UpdateFormBody>
  );
}
