/**
 * Centralized regex patterns for validation and parsing.
 */

export const REGEX = {
  EMAIL:
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  PHONE_E164: /^\+[1-9]\d{1,14}$/,
  URL: /^https?:\/\/.+/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
} as const;

export type RegexKey = keyof typeof REGEX;
