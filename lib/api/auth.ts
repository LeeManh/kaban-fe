import { apiClient, type ApiSuccessResponse } from "@/lib/api/client";
import type { TokenPair } from "@/lib/api/tokens";

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe: boolean;
}

export async function login(payload: LoginPayload): Promise<TokenPair> {
  const { data } = await apiClient.post<ApiSuccessResponse<TokenPair>>("/auth/login", payload);
  return data.data;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export async function register(payload: RegisterPayload): Promise<TokenPair> {
  const { data } = await apiClient.post<ApiSuccessResponse<TokenPair>>("/auth/register", payload);
  return data.data;
}

export interface ForgotPasswordPayload {
  email: string;
}

export async function forgotPassword(
  payload: ForgotPasswordPayload,
): Promise<{ message: string }> {
  const { data } = await apiClient.post<ApiSuccessResponse<{ message: string }>>(
    "/auth/forgot-password",
    payload,
  );
  return data.data;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<{ message: string }> {
  const { data } = await apiClient.post<ApiSuccessResponse<{ message: string }>>(
    "/auth/reset-password",
    payload,
  );
  return data.data;
}
