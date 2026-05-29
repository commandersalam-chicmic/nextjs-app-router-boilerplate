"use client";

import * as React from "react";
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";

import { FormControl, FormHelperText, FormLabel, Textarea } from "@/components/atoms";
import { cn } from "@/utils";

import type { ReactElement, ReactNode } from "react";

export interface FormFieldTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  labelEnd?: ReactNode;
  labelClassName?: string;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
  textareaClassName?: string;
  /** Defaults to `"off"` to limit browser autofill. */
  autoComplete?: string;
}

export function FormFieldTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  labelEnd,
  labelClassName,
  helperText,
  placeholder,
  disabled,
  rows = 3,
  className,
  textareaClassName,
  autoComplete = "off",
}: Readonly<FormFieldTextareaProps<TFieldValues, TName>>): ReactElement {
  const helperId = React.useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message;
        const hasHelperSlot = Boolean(errorMessage) || Boolean(helperText);
        const showLabelRow = label != null || labelEnd != null;

        return (
          <FormControl className={className} invalid={Boolean(fieldState.error)}>
            {showLabelRow ? (
              <div className="flex items-center justify-between gap-2">
                {label === null || label === undefined ? (
                  <span aria-hidden className="min-w-0 flex-1" />
                ) : (
                  <FormLabel className={labelClassName} htmlFor={field.name}>
                    {label}
                  </FormLabel>
                )}
                {labelEnd}
              </div>
            ) : null}
            <Textarea
              aria-describedby={hasHelperSlot ? helperId : undefined}
              aria-invalid={Boolean(fieldState.error)}
              autoComplete={autoComplete}
              disabled={disabled}
              id={field.name}
              placeholder={placeholder}
              rows={rows}
              className={cn(
                textareaClassName,
                fieldState.error && "border-destructive focus-visible:ring-destructive/40",
              )}
              {...field}
            />
            <FormHelperText error={Boolean(errorMessage)} id={helperId}>
              {errorMessage ?? helperText}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
}

FormFieldTextarea.displayName = "FormFieldTextarea";
