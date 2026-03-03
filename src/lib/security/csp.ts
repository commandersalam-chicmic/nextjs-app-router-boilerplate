/**
 * Content Security Policy header value.
 * Inline and eval are disabled; extend per-environment as needed.
 */

export const CSP_HEADER =
  "default-src 'self'; " +
  "script-src 'self'; " +
  "style-src 'self'; " +
  "img-src 'self' data: blob: https:; " +
  "font-src 'self' data:; " +
  "connect-src 'self' https:; " +
  "frame-ancestors 'self'; " +
  "base-uri 'self'; " +
  "form-action 'self'; " +
  "object-src 'none'; " +
  "upgrade-insecure-requests";
