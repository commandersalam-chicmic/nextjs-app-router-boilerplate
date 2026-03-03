/**
 * Remove keys with empty values (null, undefined, "").
 * Optionally treat empty arrays and empty objects as empty.
 */
export function removeEmptyKeys<T extends Record<string, unknown>>(
  obj: T,
  options?: { removeEmptyArrays?: boolean; removeEmptyObjects?: boolean }
): Partial<T> {
  const result: Record<string, unknown> = {};
  const opts = options ?? {};

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined || value === "") continue;
    if (opts.removeEmptyArrays && Array.isArray(value) && value.length === 0) continue;
    if (
      opts.removeEmptyObjects &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.keys(value as Record<string, unknown>).length === 0
    ) {
      continue;
    }
    result[key] = value;
  }

  return result as Partial<T>;
}
