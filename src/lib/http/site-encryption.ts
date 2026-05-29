/** Only the literal `"true"` enables encryption (case-sensitive). */
const ENCRYPTION_TRUE = "true";

export function isSiteEncryptionEnabled(): boolean {
  return process.env.NEXT_PUBLIC_SITE_ENCRYPTION === ENCRYPTION_TRUE;
}

export interface EncryptedPayload {
  encryptedData: string;
}

export function hasEncryptedPayload(data: unknown): data is EncryptedPayload {
  return (
    typeof data === "object" &&
    data !== null &&
    "encryptedData" in data &&
    typeof (data as EncryptedPayload).encryptedData === "string"
  );
}
