import DOMPurify, { type Config } from "dompurify";

const defaultConfig: Config = {
  ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li"],
  ALLOWED_ATTR: ["href", "target", "rel"],
  ADD_ATTR: ["target"],
};

/**
 * Sanitize HTML to prevent XSS. Use for user-generated or external content.
 */
export function sanitizeHtml(dirty: string, config?: Config): string {
  if (globalThis.window === undefined) {
    return dirty.replaceAll(/<[^>]*>/g, "");
  }
  return DOMPurify.sanitize(dirty, config ?? defaultConfig);
}

/**
 * Sanitize for plain text only (strip all HTML).
 */
export function sanitizeText(dirty: string): string {
  if (globalThis.window === undefined) {
    return dirty.replaceAll(/<[^>]*>/g, "");
  }
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [] });
}
