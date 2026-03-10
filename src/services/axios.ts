import { paths, ROUTES } from "@/routes";
import { useAuthStore } from "@/store/auth-store";
import axiosLib, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

export const axiosInstance: AxiosInstance = axiosLib.create({
  // No baseURL: API endpoints are absolute (e.g. "/api/auth/login" or full URLs when using NEXT_PUBLIC_API_URL).
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

const getRequestDuration = (
  config: InternalAxiosRequestConfig & { metadata?: { startTime: number } },
): number => (config?.metadata ? performance.now() - config.metadata.startTime : 0);

const handle401 = (): void => {
  if (isHandling401) return;
  isHandling401 = true;
  try {
    cancelPendingRequests();
    const store = useAuthStore.getState();
    if (store.user) {
      store.clearUser();
    }
    if (globalThis.window !== undefined) {
      const currentPath = globalThis.window.location.pathname;

      // Avoid redirect loops on guest-only routes like /login and /forget.
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
    (config as InternalAxiosRequestConfig & { metadata?: { startTime: number } }).metadata = {
      startTime: performance.now(),
    };
    return config;
  },
  async (error: AxiosError) => {
    throw error instanceof Error ? error : new Error(String(error));
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    pendingRequests.shift();
    const duration = getRequestDuration(
      response.config as InternalAxiosRequestConfig & { metadata?: { startTime: number } },
    );
    // Basic debug logging; projects can swap in a real logger or telemetry later.
    // eslint-disable-next-line no-console
    console.debug(`[Axios] ✅ ${response.status} ${response.config.url} (${duration}ms)`);
    return response;
  },
  async (error: AxiosError) => {
    if (axiosLib.isCancel(error) || error.code === "ERR_CANCELED") {
      // eslint-disable-next-line no-console
      console.debug("Request aborted due to another 401", { message: error.message });
      return new Promise(() => {
        // avoid unhandled rejection
      });
    }

    const duration = getRequestDuration(
      (error.config ?? {}) as InternalAxiosRequestConfig & { metadata?: { startTime: number } },
    );
    // eslint-disable-next-line no-console
    console.debug(
      `[Axios] ❌ ${error.response?.status ?? "NO_STATUS"} ${error.config?.url ?? ""} (${duration}ms)`,
    );

    if (!error.response) {
      // eslint-disable-next-line no-console
      console.error("Network error occurred", error);
      throw error instanceof Error ? error : new Error(String(error));
    }

    const { status } = error.response;

    if (status === 401) {
      handle401();
    }

    throw error instanceof Error ? error : new Error(String(error));
  },
);
