"use client";

import { cn } from "@/utils";
import * as React from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

export interface FormProps<TFieldValues extends FieldValues = FieldValues> extends Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  "onSubmit"
> {
  form: UseFormReturn<TFieldValues>;
  onSubmit: (data: TFieldValues) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
}

export function Form<TFieldValues extends FieldValues = FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...formProps
}: Readonly<FormProps<TFieldValues>>): React.ReactElement {
  const handleSubmit = form.handleSubmit((data: TFieldValues) => {
    void onSubmit(data);
  });

  return (
    <form className={cn("space-y-4", className)} onSubmit={handleSubmit} noValidate {...formProps}>
      {children}
    </form>
  );
}

Form.displayName = "Form";
