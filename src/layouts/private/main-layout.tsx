import { DynamicLayout } from "./dynamic-layout";

import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: Readonly<MainLayoutProps>) {
  return <DynamicLayout>{children}</DynamicLayout>;
}
