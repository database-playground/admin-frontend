import type { FieldValues, SubmitHandler } from "react-hook-form";

export type UpdateFormAction = "create" | "update";

export type UpdateFormSubmitHandler<C, U> = <A extends UpdateFormAction>(
  action: A,
  newValues: A extends "create" ? C : A extends "update" ? U : never
) => void;

export interface UpdateFormBaseProps<T extends FieldValues> {
  defaultValues?: T;
  action: UpdateFormAction;
  onFormStateChange?: (isDirty: boolean) => void;
  onSubmit: SubmitHandler<T>;
}
