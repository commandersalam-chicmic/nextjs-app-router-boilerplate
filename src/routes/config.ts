import { ROUTES } from "./paths";

export type GuardType = "auth" | "guest" | "acl";

export interface RouteConfig {
  path: string;
  guard?: GuardType;
  /** Required permission when guard is "acl" */
  permission?: string;
}

export const ROUTE_CONFIG: Record<string, RouteConfig> = {
  home: { path: ROUTES.HOME },
  login: { path: ROUTES.LOGIN, guard: "guest" },
  forget: { path: ROUTES.FORGET, guard: "guest" },
  app: { path: ROUTES.APP, guard: "auth" },
};

/** Paths that require authentication */
export const PROTECTED_PATHS: string[] = [ROUTES.APP];

/** Paths only for unauthenticated users (redirect to app when logged in) */
export const GUEST_ONLY_PATHS: string[] = [ROUTES.LOGIN, ROUTES.FORGET];

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function isGuestOnlyPath(pathname: string): boolean {
  return GUEST_ONLY_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}
