/**
 * Build query string from payload. Skips null, undefined, and "".
 * Use removeEmptyKeys first if you need to strip other empty values.
 */
export function generatePayloadQuery(
  params: Record<string, string | number | boolean | null | undefined>
): string {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined || value === "") continue;
    search.set(key, String(value));
  }

  const query = search.toString();
  return query ? `?${query}` : "";
}
