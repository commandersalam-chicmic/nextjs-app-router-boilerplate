"use client";

import * as React from "react";

import { cn } from "@/utils";

export interface FormHelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** When true, use destructive styling and `role="alert"` (field error). */
  error?: boolean;
}

export const FormHelperText = React.forwardRef<HTMLParagraphElement, FormHelperTextProps>(
  ({ className, error, children, id, ...props }, ref) => {
    if (children === null || children === undefined || children === "") {
      return null;
    }

    return (
      <p
        id={id}
        ref={ref}
        role={error ? "alert" : undefined}
        className={cn(
          "text-[13px] leading-snug",
          error ? "text-destructive" : "text-muted-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </p>
    );
  },
);

FormHelperText.displayName = "FormHelperText";
