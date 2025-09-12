import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormDirtyWarning } from "@/hooks/use-form-dirty-warning";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

export interface UpdateUserFormProps {
  defaultValues?: z.infer<typeof formSchema>;
  onSubmit: (newValues: UpdateUserFormData) => void;
  action: "update" | "create";

  groupList: { id: string; name: string }[];
}

export function UpdateUserForm({
  defaultValues,
  onSubmit,
  action,
  groupList,
}: UpdateUserFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useFormDirtyWarning(form.formState.isDirty);

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    form.reset();

    onSubmit({
      name: data.name,
      avatar: data.avatar,
      clearAvatar: data.avatar === undefined,
      groupID: data.groupID,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
            <AvatarImage src={form.watch("avatar")} />
            <AvatarFallback>{form.watch("name")}</AvatarFallback>
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

        <Button type="submit">{action === "update" ? "編輯" : "建立"}</Button>
      </form>
    </Form>
  );
}
