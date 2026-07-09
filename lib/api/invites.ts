import { apiClient, type ApiSuccessResponse } from "@/lib/api/client";
import type { BoardRole } from "@/lib/api/boards";

export interface CreateBoardInvitePayload {
  email: string;
  role?: BoardRole;
}

export interface CreateBoardInviteResult {
  id: string;
  email: string;
  role: BoardRole;
}

export async function createBoardInvite(
  boardId: string,
  payload: CreateBoardInvitePayload,
): Promise<CreateBoardInviteResult> {
  const { data } = await apiClient.post<ApiSuccessResponse<CreateBoardInviteResult>>(
    `/boards/${boardId}/invites`,
    payload,
  );
  return data.data;
}

export interface BoardInvite {
  id: string;
  email: string;
  role: BoardRole;
  expiresAt: string;
  createdAt: string;
}

export async function listBoardInvites(boardId: string): Promise<BoardInvite[]> {
  const { data } = await apiClient.get<ApiSuccessResponse<BoardInvite[]>>(
    `/boards/${boardId}/invites`,
  );
  return data.data;
}

export interface BoardInviteLink {
  id: string;
}

export async function revokeBoardInvite(
  boardId: string,
  inviteId: string,
): Promise<BoardInviteLink> {
  const { data } = await apiClient.delete<ApiSuccessResponse<BoardInviteLink>>(
    `/boards/${boardId}/invites/${inviteId}`,
  );
  return data.data;
}

export interface InvitePreview {
  boardName: string;
  invitedByName: string;
  email: string;
}

export async function previewInvite(token: string): Promise<InvitePreview> {
  const { data } = await apiClient.get<ApiSuccessResponse<InvitePreview>>(`/invites/${token}`);
  return data.data;
}

export interface AcceptInviteResult {
  boardId: string;
}

export async function acceptInvite(token: string): Promise<AcceptInviteResult> {
  const { data } = await apiClient.post<ApiSuccessResponse<AcceptInviteResult>>(
    `/invites/${token}/accept`,
  );
  return data.data;
}
