import { axiosInstance } from "./axios";

type ApiResponse<T> = Promise<T>;

export const httpGet = <T>(path: string): ApiResponse<T> => {
  return axiosInstance
    .get<T>(path)
    .then((response) => response.data)
    .catch((error: unknown) => {
      throw error;
    });
};

export const httpPost = <T>(path: string, values: unknown): ApiResponse<T> => {
  return axiosInstance
    .post<T>(path, values)
    .then((response) => response.data)
    .catch((error: unknown) => {
      throw error;
    });
};

export const httpPut = <T>(path: string, values: unknown): ApiResponse<T> => {
  return axiosInstance
    .put<T>(path, values)
    .then((response) => response.data)
    .catch((error: unknown) => {
      throw error;
    });
};

export const httpPatch = <T>(path: string, values: unknown): ApiResponse<T> => {
  return axiosInstance
    .patch<T>(path, values)
    .then((response) => response.data)
    .catch((error: unknown) => {
      throw error;
    });
};

export const httpDelete = <T>(path: string): ApiResponse<T> => {
  return axiosInstance
    .delete<T>(path)
    .then((response) => response.data)
    .catch((error: unknown) => {
      throw error;
    });
};
