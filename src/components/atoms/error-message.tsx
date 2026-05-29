"use client";

import * as React from "react";

import { cn } from "@/utils";

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const ErrorMessage = React.forwardRef<HTMLSpanElement, ErrorMessageProps>(
  ({ className, ...props }, ref) => (
    <span
      className={cn("text-sm text-destructive", className)}
      ref={ref}
      role="alert"
      {...props}
    />
  )
);

ErrorMessage.displayName = "ErrorMessage";

export { ErrorMessage };
