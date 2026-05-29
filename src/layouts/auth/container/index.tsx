"use client";

import type { ReactNode } from "react";

interface AuthSectionContainerProps {
  children: ReactNode;
  title?: string;
  subTitle?: string;
}

export default function AuthSectionContainer({
  title,
  subTitle,
  children,
}: Readonly<AuthSectionContainerProps>) {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      {title ? (
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
          {subTitle ? <p className="text-sm text-muted-foreground">{subTitle}</p> : null}
        </header>
      ) : null}
      {children}
    </div>
  );
}
