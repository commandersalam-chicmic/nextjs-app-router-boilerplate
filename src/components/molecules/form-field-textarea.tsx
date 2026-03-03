"use client";

import { When } from "@/components";
import { ErrorMessage, Label, Textarea } from "@/components/atoms";
import { cn } from "@/utils";
import type { ReactElement } from "react";
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";

interface FormFieldLabelProps {
  fieldName: string;
  labelValue: string;
}

function FormFieldLabel({ fieldName, labelValue }: Readonly<FormFieldLabelProps>): ReactElement {
  return <Label htmlFor={fieldName}>{labelValue}</Label>;
}

function createLabelRenderer(fieldName: string, labelValue: string): () => ReactElement {
  return () => <FormFieldLabel fieldName={fieldName} labelValue={labelValue} />;
}

function createErrorMessageRenderer(message: string): () => ReactElement {
  return () => <ErrorMessage>{message}</ErrorMessage>;
}

export interface FormFieldTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

function FormFieldTextareaInner<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder,
  disabled,
  rows = 3,
  className,
}: Readonly<FormFieldTextareaProps<TFieldValues, TName>>): ReactElement {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message;
        return (
          <div className={cn("space-y-1", className)}>
            <When condition={label != null}>{createLabelRenderer(field.name, label ?? "")}</When>
            <Textarea
              id={field.name}
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              aria-invalid={Boolean(fieldState.error)}
              {...field}
            />
            <When condition={errorMessage != null}>
              {createErrorMessageRenderer(errorMessage ?? "")}
            </When>
          </div>
        );
      }}
    />
  );
}

export const FormFieldTextarea = FormFieldTextareaInner;
