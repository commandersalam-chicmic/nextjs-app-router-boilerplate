"use client";

import { usePathname } from "next/navigation";

import type { ReactNode } from "react";

interface CommonTemplateProps {
  children: ReactNode;
}

export default function CommonTemplate({ children }: Readonly<CommonTemplateProps>) {
  const pathname = usePathname();
  return (
    <div className="min-h-full animate-page-route-enter" key={pathname}>
      {children}
    </div>
  );
}
