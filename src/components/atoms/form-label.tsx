"use client";

import * as React from "react";

import { cn } from "@/utils";

import { Label, type LabelProps } from "./label";

export type FormLabelProps = LabelProps;

/** Label tuned for use inside {@link FormControl} (invalid state via `group-data-[invalid]`). */
export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => (
    <Label
      className={cn("text-foreground group-data-[invalid]:text-destructive", className)}
      ref={ref}
      {...props}
    />
  ),
);

FormLabel.displayName = "FormLabel";
