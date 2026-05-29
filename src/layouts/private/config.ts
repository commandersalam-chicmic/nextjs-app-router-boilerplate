/** Private shell navigation config (extend when adding dashboard nav). */
export interface LayoutNavItem {
  key: string;
  title: string;
  href: string;
}

export interface LayoutConfig {
  navItems: LayoutNavItem[];
}

export const layoutConfig = {
  navItems: [],
} satisfies LayoutConfig;
