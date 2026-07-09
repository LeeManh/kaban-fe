import { apiClient, type ApiSuccessResponse } from "@/lib/api/client";

export const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024; // 10 MB

export const ALLOWED_ATTACHMENT_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "application/zip",
] as const;

export interface PresignAttachmentPayload {
  filename: string;
  contentType: string;
  size: number;
}

export interface PresignAttachmentResult {
  attachment: {
    id: string;
    filename: string;
    key: string;
    mimeType: string | null;
    size: number | null;
    cardId: string;
    uploadedById: string;
    createdAt: string;
  };
  uploadUrl: string;
}

export async function presignAttachment(
  boardId: string,
  cardId: string,
  payload: PresignAttachmentPayload,
): Promise<PresignAttachmentResult> {
  const { data } = await apiClient.post<ApiSuccessResponse<PresignAttachmentResult>>(
    `/boards/${boardId}/cards/${cardId}/attachments/presign`,
    payload,
  );
  return data.data;
}

export async function uploadAttachmentFile(uploadUrl: string, file: File): Promise<void> {
  await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
}

export interface AttachmentLink {
  id: string;
}

export async function deleteAttachment(boardId: string, attachmentId: string): Promise<AttachmentLink> {
  const { data } = await apiClient.delete<ApiSuccessResponse<AttachmentLink>>(
    `/boards/${boardId}/attachments/${attachmentId}`,
  );
  return data.data;
}

export interface AttachmentRecord {
  id: string;
  filename: string;
  key: string;
  mimeType: string | null;
  size: number | null;
  cardId: string;
  uploadedById: string;
  createdAt: string;
}

export async function renameAttachment(
  boardId: string,
  attachmentId: string,
  filename: string,
): Promise<AttachmentRecord> {
  const { data } = await apiClient.patch<ApiSuccessResponse<AttachmentRecord>>(
    `/boards/${boardId}/attachments/${attachmentId}`,
    { filename },
  );
  return data.data;
}
