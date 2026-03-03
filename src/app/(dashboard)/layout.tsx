"use client";

import { AppHeader } from "@/components";
import { AuthGuard } from "@/guards";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Readonly<DashboardLayoutProps>) {
  return (
    <AuthGuard
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-muted-foreground">Loading…</p>
        </div>
      }
    >
      <div className="min-h-screen bg-background">
        <AppHeader title="App" />
        <main className="container mx-auto p-4">{children}</main>
      </div>
    </AuthGuard>
  );
}
