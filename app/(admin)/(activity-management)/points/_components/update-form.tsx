import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { UpdateFormBody } from "@/components/update-modal/form-body";
import type { UpdateFormBaseProps } from "@/components/update-modal/types";
import { graphql } from "@/gql";
import { skipToken, useQuery } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebouncedValue } from "foxact/use-debounced-value";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  userID: z.string(),
  points: z.number(),
  description: z.string().optional(),
});

export type UpdatePointsFormData = z.infer<typeof formSchema>;

export interface UpdatePointsFormProps extends Omit<UpdateFormBaseProps<z.infer<typeof formSchema>>, "onSubmit"> {
  onSubmit: (newValues: {
    userID: string;
    points: number;
    description?: string;
  }) => void;
}

const UPDATE_POINTS_FORM_USER_INFO_QUERY = graphql(`
  query UpdatePointsFormUserInfo($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`);

export function UpdatePointsForm({
  defaultValues,
  onSubmit,
  action,
  onFormStateChange,
}: UpdatePointsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userID: "",
      points: 0,
      description: "",
      ...defaultValues,
    } as z.infer<typeof formSchema>,
  });

  const userID = useWatch({ control: form.control, name: "userID" });
  const userIDDebounced = useDebouncedValue(userID, 200);

  const { data: userInfoData, loading } = useQuery(
    UPDATE_POINTS_FORM_USER_INFO_QUERY,
    userIDDebounced
      ? {
        variables: {
          id: userIDDebounced,
        },
        errorPolicy: "ignore",
      }
      : skipToken,
  );

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit({
      userID: data.userID,
      points: data.points as number,
      description: data.description,
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
        name="userID"
        render={({ field }) => (
          <FormItem>
            <FormLabel>使用者 ID</FormLabel>
            <FormControl>
              <Input {...field} placeholder="請輸入使用者 ID" />
            </FormControl>
            <FormDescription>
              選擇要發放點數的使用者。可以到使用者管理頁面確認對應代號。<br />
              {loading ? <Spinner className="mr-4 inline-block size-4" /> : null}
              {userInfoData?.user
                ? `您正要發放給：${userInfoData.user.name} (${userInfoData.user.email})`
                : "您輸入的使用者 ID 不存在。"}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="points"
        render={() => (
          <FormItem>
            <FormLabel>點數</FormLabel>
            <FormControl>
              <Input
                {...form.register("points", { valueAsNumber: true })}
                type="number"
                placeholder="請輸入要發放的點數"
              />
            </FormControl>
            <FormDescription>要發放給使用者的點數數量。</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>備註（可選）</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="請輸入發放點數的原因或備註"
                className="min-h-[80px]"
              />
            </FormControl>
            <FormDescription>發放點數的原因說明。</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </UpdateFormBody>
  );
}
