import { type FieldValues, type SubmitHandler, type UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useFormDirtyWarning } from "@/hooks/use-form-dirty-warning";
import React, { useEffect } from "react";

export interface UpdateFormBodyProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    onSubmit: SubmitHandler<T>;
    action: "update" | "create";
    onFormStateChange?: (isDirty: boolean) => void;

    children: React.ReactNode;
}

export function UpdateFormBody<T extends FieldValues>({
  form,
  onSubmit,
  action,
  onFormStateChange,
  children,
}: UpdateFormBodyProps<T>) {
  useFormDirtyWarning(form.formState.isDirty);

  // Notify parent component about form dirty state changes
  useEffect(() => {
    onFormStateChange?.(form.formState.isDirty);
  }, [form.formState.isDirty, onFormStateChange]);

  const handleSubmit = (data: T) => {
    form.reset();
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {children}

        <DialogFooter className="sm:justify-start">
          <Button type="submit">{action === "update" ? "更新" : "建立"}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
