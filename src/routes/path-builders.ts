import { ROUTES } from "./paths";

/**
 * Build path with optional query params. Use for links and redirects.
 */
export function buildPath(
  path: string,
  params?: Record<string, string>
): string {
  if (!params || Object.keys(params).length === 0) return path;
  const search = new URLSearchParams(params).toString();
  return `${path}${search ? `?${search}` : ""}`;
}

export const paths = {
  home: () => ROUTES.HOME,
  login: (params?: { returnTo?: string }) =>
    buildPath(ROUTES.LOGIN, params?.returnTo ? { returnTo: params.returnTo } : undefined),
  forget: () => ROUTES.FORGET,
  app: () => ROUTES.APP,
};
