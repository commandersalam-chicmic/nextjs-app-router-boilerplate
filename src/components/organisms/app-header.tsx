"use client";

import { cn } from "@/utils";

interface AppHeaderProps {
  title?: string;
  className?: string;
}

export function AppHeader({ title = "App", className }: Readonly<AppHeaderProps>) {
  return (
    <header className={cn("border-b bg-card", className)}>
      <div className="container mx-auto flex h-14 items-center px-4">
        <span className="font-semibold">{title}</span>
      </div>
    </header>
  );
}
