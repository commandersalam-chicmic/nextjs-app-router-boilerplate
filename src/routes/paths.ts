/**
 * Route path constants. Use path builders in paths.ts for dynamic segments.
 */

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  FORGET: "/forget",
  APP: "/app",
} as const;

export type RouteKey = keyof typeof ROUTES;
