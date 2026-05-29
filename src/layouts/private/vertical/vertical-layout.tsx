import type { ReactNode } from "react";

export interface VerticalLayoutProps {
  children?: ReactNode;
}

export function VerticalLayout({ children }: Readonly<VerticalLayoutProps>) {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background text-foreground">
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
