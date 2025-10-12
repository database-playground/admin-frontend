import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UpdateFormBody } from "@/components/update-modal/form-body";
import type { UpdateFormBaseProps } from "@/components/update-modal/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1),
  avatar: z.string().optional(),
  groupID: z.string(),
});

export interface UpdateUserFormData {
  name: string;
  avatar?: string;
  clearAvatar?: boolean;
  groupID: string;
}

export interface UpdateUserFormProps extends Omit<UpdateFormBaseProps<z.infer<typeof formSchema>>, "onSubmit"> {
  onSubmit: (newValues: UpdateUserFormData) => void;
  groupList: { id: string; name: string }[];
}

export function UpdateUserForm({
  defaultValues,
  onSubmit,
  action,
  onFormStateChange,
  groupList,
}: UpdateUserFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const avatar = useWatch({ control: form.control, name: "avatar" });
  const name = useWatch({ control: form.control, name: "name" });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit({
      name: data.name,
      avatar: data.avatar,
      clearAvatar: data.avatar === undefined,
      groupID: data.groupID,
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
            <FormLabel>名稱</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex items-center gap-4">
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>頭貼</FormLabel>
              <FormControl>
                <Input {...field} placeholder="頭貼 URL" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      </div>

      <FormField
        control={form.control}
        name="groupID"
        render={({ field }) => (
          <FormItem>
            <FormLabel>群組</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇群組" />
                </SelectTrigger>
                <SelectContent>
                  {groupList.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
            <FormDescription>選擇這個使用者屬於的群組。</FormDescription>
          </FormItem>
        )}
      />
    </UpdateFormBody>
  );
}
