import { VerticalLayout } from "./vertical/vertical-layout";

import type { ReactNode } from "react";

export interface DynamicLayoutProps {
  children: ReactNode;
}

export function DynamicLayout({ children }: Readonly<DynamicLayoutProps>) {
  return <VerticalLayout>{children}</VerticalLayout>;
}
