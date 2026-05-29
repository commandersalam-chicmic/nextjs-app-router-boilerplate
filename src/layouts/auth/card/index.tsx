"use client";

import type { ReactNode } from "react";

interface AuthCardLayoutProps {
  children: ReactNode;
}

export default function AuthCardLayout({ children }: Readonly<AuthCardLayoutProps>) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/95 p-6 shadow-lg backdrop-blur-md md:p-8">
      {children}
    </div>
  );
}
