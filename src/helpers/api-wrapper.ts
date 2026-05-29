import { NextRequest, NextResponse } from "next/server";

import { hasEncryptedPayload, isSiteEncryptionEnabled } from "@/lib/http/site-encryption";
import { decrypt, encrypt } from "@/utils/crypto";

const HEADER_CONTENT_TYPE = "content-type";
const HEADER_CONTENT_LENGTH = "content-length";

export type ApiHandler<TBody = unknown> = (
  request: NextRequest,
  body: TBody,
  context: unknown,
) => Promise<NextResponse>;

/**
 * Wraps API Route Handlers: decrypts JSON body when encrypted; encrypts JSON responses when enabled.
 */
export function wrapApiHandler<TBody = unknown>(handler: ApiHandler<TBody>) {
  return async (request: NextRequest, context: unknown) => {
    let body: unknown = undefined;

    if (request.method !== "GET" && request.method !== "HEAD") {
      try {
        const rawBody: unknown = await request.json().catch(() => null);
        if (rawBody && typeof rawBody === "object" && rawBody !== null) {
          if (isSiteEncryptionEnabled() && hasEncryptedPayload(rawBody)) {
            const decryptedStr = await decrypt(rawBody.encryptedData);
            body = JSON.parse(decryptedStr) as unknown;
          } else {
            body = rawBody;
          }
        }
      } catch {
        // body remains undefined
      }
    }

    const response = await handler(request, body as TBody, context);

    if (!isSiteEncryptionEnabled()) {
      return response;
    }

    const contentType = response.headers.get(HEADER_CONTENT_TYPE);
    if (!contentType?.includes("application/json")) {
      return response;
    }

    try {
      const data: unknown = await response.json();
      const encryptedStr = await encrypt(JSON.stringify(data));

      const newResponse = NextResponse.json(
        { encryptedData: encryptedStr },
        {
          status: response.status,
          statusText: response.statusText,
        },
      );

      response.headers.forEach((value, key) => {
        const lower = key.toLowerCase();
        if (lower !== HEADER_CONTENT_TYPE && lower !== HEADER_CONTENT_LENGTH) {
          newResponse.headers.set(key, value);
        }
      });

      newResponse.headers.set("X-Content-Encrypted", "true");
      return newResponse;
    } catch {
      return response;
    }
  };
}
