"use client";

import * as React from "react";

import { cn } from "@/utils";

export interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ className, active, children, ...props }, ref) => {
    let activeStyles =
      "text-palette-charcoal/80 hover:bg-palette-charcoal/5 hover:text-palette-charcoal dark:text-palette-sandstone/80 dark:hover:bg-palette-sandstone/5 dark:hover:text-palette-sandstone";
    if (active) {
      activeStyles =
        "bg-palette-charcoal text-palette-sandstone dark:bg-palette-sandstone dark:text-palette-charcoal";
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "w-full text-left px-3.5 py-2 text-[10px] font-semibold tracking-widest uppercase transition-all duration-200 rounded-lg",
          activeStyles,
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
MenuItem.displayName = "MenuItem";

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose?: () => void;
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  ({ className, isOpen, onClose, children, ...props }, ref) => {
    const menuRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          onClose?.();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <div
        className={cn(
          "absolute right-0 z-50 mt-2 w-44 rounded-2xl border border-palette-sandstone-border/50 bg-palette-sandstone/95 p-1.5 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-300 dark:border-neutral-800/60 dark:bg-palette-charcoal/95",
          className,
        )}
        ref={(node) => {
          menuRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Menu.displayName = "Menu";
