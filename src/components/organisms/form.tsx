"use client";

import * as React from "react";

import { cn } from "@/utils";

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
  autoComplete = "off",
  ...formProps
}: Readonly<FormProps<TFieldValues>>): React.ReactElement {
  const handleSubmit = form.handleSubmit((data: TFieldValues) => {
    void onSubmit(data);
  });

  return (
    <form
      noValidate
      autoComplete={autoComplete}
      className={cn("space-y-4", className)}
      onSubmit={handleSubmit}
      {...formProps}
    >
      {children}
    </form>
  );
}

Form.displayName = "Form";
