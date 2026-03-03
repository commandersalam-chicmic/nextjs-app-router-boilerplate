"use client";

import type { ReactElement, ReactNode } from "react";

export interface WhenProps {
  condition: boolean;
  children: ReactNode | (() => ReactNode);
  fallback?: ReactNode;
}

export function When({
  condition,
  children,
  fallback = null,
}: Readonly<WhenProps>): ReactElement | null {
  if (!condition) return <>{fallback}</>;
  const content = typeof children === "function" ? children() : children;
  return <>{content}</>;
}

When.displayName = "When";
