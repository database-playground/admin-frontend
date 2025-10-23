import SQLEditor from "@/components/sql-editor";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UpdateFormBody } from "@/components/update-modal/form-body";
import type { UpdateFormBaseProps } from "@/components/update-modal/types";
import { type FragmentType, graphql, useFragment } from "@/gql";
import { QuestionDifficulty } from "@/gql/graphql";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "題目標題不能為空"),
  description: z.string().min(1, "題目描述不能為空"),
  category: z.string().min(1, "分類不能為空"),
  difficulty: z.enum(QuestionDifficulty),
  referenceAnswer: z.string().min(1, "參考答案不能為空"),
  databaseID: z.string().optional(), // Optional, validation handled dynamically
});

export interface UpdateQuestionFormData {
  title: string;
  description: string;
  category: string;
  difficulty: QuestionDifficulty;
  referenceAnswer: string;
  databaseID?: string; // Changed to single databaseID for 1-N relationship
}

const QUESTION_UPDATE_FORM_FRAGMENT = graphql(`
  fragment QuestionUpdateForm on Query {
    databases {
      id
      slug
    }

    questionCategories
  }
`);

export interface UpdateQuestionFormProps extends Omit<UpdateFormBaseProps<z.infer<typeof formSchema>>, "onSubmit"> {
  onSubmit: (newValues: UpdateQuestionFormData) => void;
  fragment: FragmentType<typeof QUESTION_UPDATE_FORM_FRAGMENT>;
}

const difficultyOptions = [
  { value: "easy", label: "簡單" },
  { value: "medium", label: "中等" },
  { value: "hard", label: "困難" },
  { value: "unspecified", label: "未指定" },
];

export function UpdateQuestionForm({
  defaultValues,
  onSubmit,
  action,
  onFormStateChange,
  fragment,
}: UpdateQuestionFormProps) {
  const { databases, questionCategories } = useFragment(QUESTION_UPDATE_FORM_FRAGMENT, fragment);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // For creation, require databaseID
    if (action === "create" && !data.databaseID) {
      form.setError("databaseID", { message: "建立題目時必須選擇一個資料庫" });
      return;
    }

    onSubmit({
      title: data.title,
      description: data.description,
      category: data.category,
      difficulty: data.difficulty,
      referenceAnswer: data.referenceAnswer,
      databaseID: data.databaseID,
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
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>題目標題</FormLabel>
            <FormControl>
              <Input {...field} placeholder="請輸入題目標題" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>題目描述</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="請輸入詳細的題目描述"
                className="min-h-[100px]"
              />
            </FormControl>
            <FormDescription>詳細說明題目要求和背景。</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>分類</FormLabel>
            <FormControl>
              <Input {...field} placeholder="例如：query, join, aggregation" list="question-categories" />
            </FormControl>
            <FormDescription>題目的分類標籤。</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="difficulty"
        render={({ field }) => (
          <FormItem>
            <FormLabel>難度</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇難度" />
                </SelectTrigger>
                <SelectContent>
                  {difficultyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="referenceAnswer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>參考答案</FormLabel>
            <FormControl>
              <SQLEditor
                {...field}
                placeholder="請輸入 SQL 參考答案"
              />
            </FormControl>
            <FormDescription>提供標準的 SQL 解答。</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="databaseID"
        render={({ field }) => (
          <FormItem>
            <FormLabel>資料庫</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇資料庫" />
                </SelectTrigger>
                <SelectContent>
                  {databases.map((database) => (
                    <SelectItem key={database.id} value={database.id}>
                      {database.slug}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>選擇此題目所屬的資料庫（一個題目只能屬於一個資料庫）。</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <datalist id="question-categories">
        {questionCategories.map((category) => <option key={category} value={category} />)}
      </datalist>
    </UpdateFormBody>
  );
}
