import { ROUTES } from "./paths";

/** Paths that require authentication */
export const PROTECTED_PATHS: string[] = [ROUTES.HOME];

/** Paths only for unauthenticated users (redirect to app when logged in) */
export const GUEST_ONLY_PATHS: string[] = [ROUTES.LOGIN, ROUTES.FORGET];

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function isGuestOnlyPath(pathname: string): boolean {
  return GUEST_ONLY_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}
