import { create } from "zustand";

export const DEV_TOOL_REQUEST_STATUS = {
  Pending: "pending",
  Success: "success",
  Error: "error",
} as const;

export type DevToolRequestStatus =
  (typeof DEV_TOOL_REQUEST_STATUS)[keyof typeof DEV_TOOL_REQUEST_STATUS];

export interface NetworkRequestLog {
  id: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  data: unknown;
  timestamp: number;
  status: DevToolRequestStatus;
  statusCode?: number;
  duration?: number;
  curl: string;
}

interface DevToolState {
  requests: NetworkRequestLog[];
  addRequest: (req: Omit<NetworkRequestLog, "id" | "timestamp" | "curl">) => string;
  updateRequest: (
    id: string,
    updates: Partial<Omit<NetworkRequestLog, "id" | "timestamp" | "curl">>,
  ) => void;
  clearRequests: () => void;
}

/** Safe string for curl `-d '…'` (no `[object Object]` from `String(unknown)`). */
function bodyToCurlLiteral(data: unknown): string {
  if (typeof data === "string") {
    return data;
  }
  if (typeof data === "number" || typeof data === "boolean") {
    return String(data);
  }
  if (typeof data === "bigint") {
    return data.toString();
  }
  if (typeof data === "symbol") {
    return data.description ?? data.toString();
  }
  if (typeof data === "function") {
    return "[Function]";
  }
  if (data == null) {
    return "";
  }
  return JSON.stringify(data);
}

function generateCurl(
  method: string,
  url: string,
  headers: Record<string, string> | undefined | null,
  data: unknown,
): string {
  let resolvedUrl = url;
  if (!url.startsWith("http")) {
    if (typeof globalThis.window !== "undefined") {
      resolvedUrl = `${globalThis.window.location.origin}${url}`;
    }
  }

  let curl = `curl -X ${method.toUpperCase()} "${resolvedUrl}"`;

  if (headers) {
    Object.entries(headers).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (typeof value === "object") return;
      // Skip axios internal configuration headers or headers that we don't need in cURL
      const lowerKey = key.toLowerCase();
      if (
        lowerKey === "common" ||
        lowerKey === "delete" ||
        lowerKey === "get" ||
        lowerKey === "head" ||
        lowerKey === "post" ||
        lowerKey === "put" ||
        lowerKey === "patch"
      ) {
        return;
      }
      curl += ` \\\n  -H "${key}: ${value}"`;
    });
  }

  if (data) {
    const dataStr = bodyToCurlLiteral(data);
    const escapedData = dataStr.replaceAll("'", String.raw`'"'"'`);
    curl += ` \\\n  -d '${escapedData}'`;
  }

  return curl;
}

export const useDevToolStore = create<DevToolState>((set) => ({
  requests: [],
  addRequest: (req) => {
    const id = Math.random().toString(36).substring(7);
    const timestamp = Date.now();

    // Parse headers to avoid Axios internal header objects
    const cleanHeaders: Record<string, string> = {};
    if (req.headers) {
      Object.entries(req.headers).forEach(([key, value]) => {
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
          cleanHeaders[key] = String(value);
        }
      });
    }

    const curl = generateCurl(req.method, req.url, cleanHeaders, req.data);

    const newLog: NetworkRequestLog = {
      ...req,
      headers: cleanHeaders,
      id,
      timestamp,
      curl,
    };

    set((state) => ({
      requests: [newLog, ...state.requests].slice(0, 50), // Limit to 50 logs
    }));

    return id;
  },
  updateRequest: (id, updates) => {
    set((state) => ({
      requests: state.requests.map((r) => {
        if (r.id !== id) return r;

        const merged = { ...r, ...updates };
        // Regenerate cURL on updates if data/headers changed
        const curl = generateCurl(merged.method, merged.url, merged.headers, merged.data);
        return { ...merged, curl };
      }),
    }));
  },
  clearRequests: () => set({ requests: [] }),
}));
