"use client";

import { GuestGuard } from "@/guards";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}
export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <GuestGuard>
      <div className="min-h-screen flex items-center justify-center bg-muted/30">{children}</div>
    </GuestGuard>
  );
}
