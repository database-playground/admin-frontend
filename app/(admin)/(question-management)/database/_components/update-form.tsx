import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UpdateFormBody } from "@/components/update-modal/form-body";
import type {
  UpdateFormBaseProps,
} from "@/components/update-modal/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  slug: z.string().min(1, "slug 不能為空"),
  description: z.string().optional(),
  schema: z.string().min(1, "資料結構不能為空"),
  relationFigure: z.string().min(1, "關係圖不能為空"),
});

export type UpdateDatabaseFormProps = UpdateFormBaseProps<z.infer<typeof formSchema>>;

export function UpdateDatabaseForm({
  defaultValues,
  onSubmit,
  action,
  onFormStateChange,
}: UpdateDatabaseFormProps) {
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
        render={({ field }) => (
          <FormItem>
            <FormLabel>slug</FormLabel>
            <FormControl>
              <Input {...field} placeholder="例如：sakila, northwind" disabled={action === "update"} />
            </FormControl>
            <FormDescription>
              資料庫的唯一識別符，通常為小寫英文。
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>描述（可選）</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="請輸入資料庫的描述"
                className="min-h-[80px]"
              />
            </FormControl>
            <FormDescription>資料庫的用途和背景說明。</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="schema"
        render={({ field }) => (
          <FormItem>
            <FormLabel>資料結構</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="請輸入完整的 SQL 建表語句"
                className="min-h-[200px] max-h-[500px] font-mono text-sm"
              />
            </FormControl>
            <FormDescription>
              完整的 SQL DDL 語句，包含所有表格定義。
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="relationFigure"
        render={({ field }) => (
          <FormItem>
            <FormLabel>關係圖</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="請輸入資料庫關係圖的描述或圖表代碼"
                className="min-h-[120px] font-mono text-sm"
              />
            </FormControl>
            <FormDescription>
              資料庫的 ER 圖或關係圖描述，可以是 Mermaid 語法、圖片 URL
              或文字描述。
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </UpdateFormBody>
  );
}
