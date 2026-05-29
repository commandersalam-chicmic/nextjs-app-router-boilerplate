import "@/types/axios-augmentation";
import axiosLib, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

import { logger } from "@/lib/default-logger";
import { hasEncryptedPayload, isSiteEncryptionEnabled } from "@/lib/http/site-encryption";
import { paths, ROUTES } from "@/routes";
import { useAuthStore } from "@/store/auth-store";
import { DEV_TOOL_REQUEST_STATUS, useDevToolStore } from "@/store/dev-tool-store";
import { decrypt, encrypt } from "@/utils/crypto";

export const axiosInstance: AxiosInstance = axiosLib.create({
  withCredentials: true,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
});

let csrfToken: string | null = null;
let isHandling401 = false;
const pendingRequests: AbortController[] = [];

export const setCSRFToken = (token: string): void => {
  csrfToken = token;
};

const createAbortController = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const controller = new AbortController();
  config.signal = controller.signal;
  pendingRequests.push(controller);
  return config;
};

const cancelPendingRequests = (): void => {
  pendingRequests.forEach((controller) => controller.abort());
  pendingRequests.length = 0;
};

const getRequestDuration = (config: InternalAxiosRequestConfig): number =>
  config.metadata ? performance.now() - config.metadata.startTime : 0;

// NOTE: This is a temporary solution to handle 401 errors.
// We should implement a proper authentication system in the future.
const handle401 = (): void => {
  if (isHandling401) return;
  isHandling401 = true;
  try {
    cancelPendingRequests();
    const store = useAuthStore.getState();
    if (store.user) {
      store.clearUser();
    }
    logger.debug("Handled 401: user cleared and pending requests aborted.");
    if (globalThis.window !== undefined) {
      const currentPath = globalThis.window.location.pathname;

      if (currentPath === ROUTES.LOGIN || currentPath === ROUTES.FORGET) {
        return;
      }

      const loginUrl = paths.login({ returnTo: currentPath });
      globalThis.window.location.href = loginUrl;
    }
  } finally {
    setTimeout(() => {
      isHandling401 = false;
    }, 500);
  }
};

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (csrfToken) {
      config.headers["X-CSRF-Token"] = csrfToken;
    }
    config.withCredentials = true;
    config = createAbortController(config);
    config.metadata = { startTime: performance.now() };

    if (isSiteEncryptionEnabled() && config.data && typeof config.data === "object") {
      config.unencryptedData = config.data;
      const encryptedStr = await encrypt(JSON.stringify(config.data));
      config.data = { encryptedData: encryptedStr };
      config.headers["X-Content-Encrypted"] = "true";
    }

    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
      const { addRequest } = useDevToolStore.getState();
      const cleanHeaders: Record<string, string> = {};
      Object.entries(config.headers || {}).forEach(([k, v]) => {
        cleanHeaders[k] = String(v);
      });
      const requestId = addRequest({
        url: config.url ?? "",
        method: config.method ?? "GET",
        headers: cleanHeaders,
        data: config.unencryptedData ?? config.data,
        status: DEV_TOOL_REQUEST_STATUS.Pending,
      });
      config.requestId = requestId;
    }

    return config;
  },
  async (error: AxiosError) => {
    logger.error("Axios request interceptor failed:", error);
    throw error instanceof Error ? error : new Error(String(error));
  },
);

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    pendingRequests.shift();
    const duration = getRequestDuration(response.config);

    logger.debug(`[Axios] ✅ ${response.status} ${response.config.url} (${duration}ms)`);

    if (isSiteEncryptionEnabled() && response.data && hasEncryptedPayload(response.data)) {
      try {
        const decryptedStr = await decrypt(response.data.encryptedData);
        response.data = JSON.parse(decryptedStr) as unknown;
      } catch (err) {
        logger.warn("Failed to decrypt response payload:", err);
      }
    }

    const requestId = response.config.requestId;
    if (requestId !== undefined && typeof window !== "undefined") {
      useDevToolStore.getState().updateRequest(requestId, {
        status: DEV_TOOL_REQUEST_STATUS.Success,
        statusCode: response.status,
        duration,
        data: response.data,
      });
    }

    return response;
  },
  async (error: AxiosError) => {
    if (axiosLib.isCancel(error) || error.code === "ERR_CANCELED") {
      logger.debug("Request aborted due to another 401", { message: error.message });
      return new Promise(() => {
        // avoid unhandled rejection
      });
    }

    const duration = getRequestDuration((error.config ?? {}) as InternalAxiosRequestConfig);
    logger.debug(
      `[Axios] ❌ ${error.response?.status ?? "NO_STATUS"} ${error.config?.url ?? ""} (${duration}ms)`,
    );

    if (
      error.response &&
      isSiteEncryptionEnabled() &&
      error.response.data &&
      hasEncryptedPayload(error.response.data)
    ) {
      try {
        const decryptedStr = await decrypt(error.response.data.encryptedData);
        error.response.data = JSON.parse(decryptedStr) as unknown;
      } catch (err) {
        logger.warn("Failed to decrypt error response payload:", err);
      }
    }

    const requestId = error.config?.requestId;
    if (requestId !== undefined && typeof window !== "undefined") {
      useDevToolStore.getState().updateRequest(requestId, {
        status: DEV_TOOL_REQUEST_STATUS.Error,
        statusCode: error.response?.status,
        duration,
      });
    }

    if (!error.response) {
      logger.error("Network error occurred", error);
      throw error instanceof Error ? error : new Error(String(error));
    }

    const { status } = error.response;

    if (status === 401) {
      handle401();
    }

    throw error instanceof Error ? error : new Error(String(error));
  },
);
