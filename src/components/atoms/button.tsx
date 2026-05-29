"use client";

import * as React from "react";

import { cn } from "@/utils";

export const BUTTON_VARIANT = {
  Primary: "primary",
  Secondary: "secondary",
  Ghost: "ghost",
} as const;

export type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Lift + shadow on hover/active. Ignored when `iconOnly`. Default: off. */
  hoverAnimation?: boolean;
  /** Skip lift/shadow motion even when `hoverAnimation` is true (e.g. icon-only controls). */
  iconOnly?: boolean;
}

const motionInteractive = cn(
  "transition-[transform,box-shadow,background-color,color,opacity] duration-200 ease-out",
  "hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-sm active:duration-100",
  "motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none motion-reduce:active:shadow-none",
);

const colorMotion = "transition-colors duration-200 ease-out";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = BUTTON_VARIANT.Primary,
      hoverAnimation = false,
      iconOnly = false,
      ...props
    },
    ref,
  ) => {
    const useLiftMotion = hoverAnimation && !iconOnly;

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold disabled:pointer-events-none disabled:opacity-50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          useLiftMotion && motionInteractive,
          !useLiftMotion && colorMotion,
          variant === BUTTON_VARIANT.Primary &&
            cn(
              "bg-palette-sandstone text-palette-charcoal shadow-lg hover:bg-white dark:bg-palette-sandstone dark:text-palette-charcoal dark:hover:bg-white",
            ),
          variant === BUTTON_VARIANT.Secondary &&
            cn(
              "bg-palette-charcoal text-palette-sandstone shadow-md hover:bg-palette-charcoal/90 dark:bg-palette-sandstone dark:text-palette-charcoal dark:hover:text-palette-sandstone dark:hover:bg-palette-sandstone/90",
            ),
          variant === BUTTON_VARIANT.Ghost && "hover:bg-accent/80",
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button };
