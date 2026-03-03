"use client";

import * as React from "react";
import { cn } from "@/utils";

export interface ErrorMessageProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const ErrorMessage = React.forwardRef<HTMLSpanElement, ErrorMessageProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="alert"
      className={cn("text-sm text-destructive", className)}
      {...props}
    />
  )
);

ErrorMessage.displayName = "ErrorMessage";

export { ErrorMessage };
