"use client";

import * as React from "react";

import { cn } from "@/utils";

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Mirrors MUI FormControl `error` — sets `data-invalid` for styling hooks. */
  invalid?: boolean;
}

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, invalid, ...props }, ref) => (
    <div
      className={cn("group flex flex-col gap-2", className)}
      data-invalid={invalid ? true : undefined}
      ref={ref}
      {...props}
    />
  ),
);

FormControl.displayName = "FormControl";
