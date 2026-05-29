import { ROUTES } from "./paths";

/**
 * Build path with optional query params. Use for links and redirects.
 */
export function buildPath(path: string, params?: Record<string, string>): string {
  if (!params || Object.keys(params).length === 0) return path;
  const search = new URLSearchParams(params).toString();
  if (search === "") return path;
  return `${path}?${search}`;
}

export const paths = {
  /** Static home path. For dynamic routes use functions, e.g. `paths.module: (id: string) => buildPath(\`/module/${id}\`)`. */
  home: ROUTES.HOME,
  login: (params?: { returnTo?: string }) =>
    buildPath(ROUTES.LOGIN, params?.returnTo ? { returnTo: params.returnTo } : undefined),
  forget: () => ROUTES.FORGET,
};
