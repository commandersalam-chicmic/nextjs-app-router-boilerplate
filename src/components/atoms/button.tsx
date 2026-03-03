"use client";

import * as React from "react";
import { cn } from "@/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50",
          variant === "primary" && "bg-primary text-primary-foreground",
          variant === "secondary" &&
            "border border-input bg-background hover:bg-accent",
          variant === "ghost" && "hover:bg-accent",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
