import "axios";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    metadata?: { startTime: number };
    unencryptedData?: unknown;
    requestId?: string;
  }
}

export {};
