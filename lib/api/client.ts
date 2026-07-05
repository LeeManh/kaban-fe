import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
  type TokenPair,
} from "@/lib/api/tokens";

export interface ApiSuccessResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface ApiFieldError {
  field: string;
  message: string;
}

export interface ApiErrorPayload {
  statusCode?: number;
  message?: string;
  errors?: ApiFieldError[];
  timestamp?: string;
  path?: string;
}

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (axios.isAxiosError(error)) {
    const message = (error.response?.data as ApiErrorPayload | undefined)?.message;
    if (message) return message;
  }
  return fallback;
}

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const AUTH_ENDPOINTS_WITHOUT_REFRESH = ["/auth/login", "/auth/register", "/auth/refresh"];

function isAuthEndpoint(url: string | undefined): boolean {
  return !!url && AUTH_ENDPOINTS_WITHOUT_REFRESH.some((path) => url.includes(path));
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({ baseURL });
const refreshClient = axios.create({ baseURL });

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let refreshQueue: Array<(accessToken: string) => void> = [];

function onRefreshed(accessToken: string) {
  refreshQueue.forEach((resolve) => resolve(accessToken));
  refreshQueue = [];
}

function redirectToLogin() {
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isAuthEndpoint(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        refreshQueue.push((accessToken) => {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          resolve(apiClient(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) throw error;

      const { data } = await refreshClient.post<ApiSuccessResponse<TokenPair>>("/auth/refresh", {
        refreshToken,
      });

      setTokens(data.data);
      onRefreshed(data.data.accessToken);

      originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      refreshQueue = [];
      clearTokens();
      redirectToLogin();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
