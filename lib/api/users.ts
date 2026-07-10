import { apiClient, type ApiSuccessResponse } from "@/lib/api/client";

export interface CurrentUser {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function getCurrentUser(): Promise<CurrentUser> {
  const { data } = await apiClient.get<ApiSuccessResponse<CurrentUser>>("/users/me");
  return data.data;
}

export interface UpdateProfilePayload {
  name?: string;
  avatar?: string;
  bio?: string;
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<CurrentUser> {
  const { data } = await apiClient.patch<ApiSuccessResponse<CurrentUser>>("/users/me", payload);
  return data.data;
}

export interface PresignAvatarPayload {
  filename: string;
  contentType: string;
  size: number;
}

export interface PresignAvatarResult {
  key: string;
  uploadUrl: string;
}

export async function presignAvatar(payload: PresignAvatarPayload): Promise<PresignAvatarResult> {
  const { data } = await apiClient.post<ApiSuccessResponse<PresignAvatarResult>>(
    "/users/me/avatar/presign",
    payload,
  );
  return data.data;
}

export async function uploadAvatarFile(uploadUrl: string, file: File): Promise<void> {
  await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
}
