"use client";

import * as React from "react";
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";

import { FormControl, FormHelperText, FormLabel, Input } from "@/components/atoms";
import { cn } from "@/utils";

import type { ReactElement, ReactNode } from "react";

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  /** Optional content on the same row as the label (e.g. “Forgot password?”). */
  labelEnd?: ReactNode;
  labelClassName?: string;
  /** Shown when the field has no validation error (neutral helper line). */
  helperText?: string;
  endAdornment?: ReactNode;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  /** Defaults to `"off"` to limit browser autofill. */
  autoComplete?: string;
}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  labelEnd,
  labelClassName,
  helperText,
  endAdornment,
  placeholder,
  type = "text",
  disabled,
  className,
  inputClassName,
  autoComplete = "off",
}: Readonly<FormFieldProps<TFieldValues, TName>>): ReactElement {
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
            <div className="relative">
              <Input
                aria-describedby={hasHelperSlot ? helperId : undefined}
                aria-invalid={Boolean(fieldState.error)}
                autoComplete={autoComplete}
                disabled={disabled}
                id={field.name}
                placeholder={placeholder}
                type={type}
                className={cn(
                  endAdornment && "pr-12",
                  inputClassName,
                  fieldState.error && "border-destructive focus-visible:ring-destructive/40",
                )}
                {...field}
              />
              {endAdornment ? (
                <div className="absolute inset-y-0 right-3 flex items-center">{endAdornment}</div>
              ) : null}
            </div>
            <FormHelperText error={Boolean(errorMessage)} id={helperId}>
              {errorMessage ?? helperText ?? "\u00A0"}
            </FormHelperText>
          </FormControl>
        );
      }}
    />
  );
}

FormField.displayName = "FormField";
