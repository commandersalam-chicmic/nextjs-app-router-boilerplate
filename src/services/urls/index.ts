/**
 * API base URL. Use relative /api for same-origin Next.js API routes,
 * or set NEXT_PUBLIC_API_URL for an external backend.
 */

const getBaseUrl = (): string => {
  if (globalThis.window !== undefined) {
    return ""; // browser: same origin
  }
  return process.env.NEXT_PUBLIC_API_URL ?? "";
};

export const API_BASE_URL = getBaseUrl();

export const namespaces = "api";

export const API_VERSION = "v1";

export const API_BASE_PATH = `${API_BASE_URL}/${namespaces}/${API_VERSION}`;

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_PATH}/health`,
  USER: `${API_BASE_PATH}/user`,
  USER_ME: `${API_BASE_PATH}/user/me`,
  AUTH_LOGIN: `${API_BASE_PATH}/auth/login`,
  AUTH_LOGOUT: `${API_BASE_PATH}/auth/logout`,
} as const;

export type ApiEndpointKey = keyof typeof API_ENDPOINTS;
