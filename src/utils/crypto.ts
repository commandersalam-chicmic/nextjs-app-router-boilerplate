// Web Crypto API based symmetric AES-256-GCM encryption/decryption.
// Fully compatible with both Node.js (Next.js server-side) and browser environment.

const getCrypto = (): Crypto => {
  if (typeof globalThis !== "undefined" && globalThis.crypto) {
    return globalThis.crypto;
  }
  // Fallback for older Node versions in tests
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require("node:crypto").webcrypto;
};

async function getCryptoKey(password: string): Promise<CryptoKey> {
  const crypto = getCrypto();
  const encoder = new TextEncoder();
  const rawKey = encoder.encode(password);

  // Hash the passphrase to get a fixed 256-bit (32-byte) key
  const hash = await crypto.subtle.digest("SHA-256", rawKey);

  return await crypto.subtle.importKey("raw", hash, { name: "AES-GCM" }, false, [
    "encrypt",
    "decrypt",
  ]);
}

export async function encrypt(text: string): Promise<string> {
  const crypto = getCrypto();
  const keyStr =
    process.env.NEXT_PUBLIC_SITE_ENCRYPTION_KEY || "default-secret-key-32-chars-minimum";
  const key = await getCryptoKey(keyStr);
  const encoder = new TextEncoder();

  // AES-GCM standard IV size is 12 bytes
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedText = encoder.encode(text);

  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encodedText);

  // Prepend IV to ciphertext
  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(ciphertext), iv.length);

  return arrayBufferToBase64(combined);
}

export async function decrypt(encryptedBase64: string): Promise<string> {
  const crypto = getCrypto();
  const keyStr =
    process.env.NEXT_PUBLIC_SITE_ENCRYPTION_KEY || "default-secret-key-32-chars-minimum";
  const key = await getCryptoKey(keyStr);

  const combined = base64ToArrayBuffer(encryptedBase64);
  if (combined.length < 12) {
    throw new Error("Invalid encrypted data length.");
  }

  const iv = combined.slice(0, 12);
  const ciphertext = combined.slice(12);

  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

function arrayBufferToBase64(buffer: Uint8Array): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(buffer).toString("base64");
  }
  let binary = "";
  const len = buffer.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCodePoint(buffer[i]);
  }
  return globalThis.btoa(binary);
}

function base64ToArrayBuffer(base64: string): Uint8Array {
  if (typeof Buffer !== "undefined") {
    const buf = Buffer.from(base64, "base64");
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  const binaryString = globalThis.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.codePointAt(i) ?? 0;
  }
  return bytes;
}
