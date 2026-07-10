import { apiClient, type ApiSuccessResponse } from "@/lib/api/client";
import type { BoardRole } from "@/lib/api/boards";

export type InviteLinkPermission = "OPEN" | "APPROVAL";

export interface InviteLink {
  role: BoardRole;
  permission: InviteLinkPermission;
  joinUrl: string;
  createdAt: string;
}

export interface CreateInviteLinkPayload {
  role?: BoardRole;
  permission?: InviteLinkPermission;
}

export async function createInviteLink(
  boardId: string,
  payload: CreateInviteLinkPayload = {},
): Promise<InviteLink> {
  const { data } = await apiClient.post<ApiSuccessResponse<InviteLink>>(
    `/boards/${boardId}/invite-link`,
    payload,
  );
  return data.data;
}

export async function getInviteLink(boardId: string): Promise<InviteLink> {
  const { data } = await apiClient.get<ApiSuccessResponse<InviteLink>>(
    `/boards/${boardId}/invite-link`,
  );
  return data.data;
}

export type UpdateInviteLinkPayload = CreateInviteLinkPayload;

export async function updateInviteLink(
  boardId: string,
  payload: UpdateInviteLinkPayload,
): Promise<InviteLink> {
  const { data } = await apiClient.patch<ApiSuccessResponse<InviteLink>>(
    `/boards/${boardId}/invite-link`,
    payload,
  );
  return data.data;
}

export interface RevokeInviteLinkResult {
  boardId: string;
}

export async function revokeInviteLink(boardId: string): Promise<RevokeInviteLinkResult> {
  const { data } = await apiClient.delete<ApiSuccessResponse<RevokeInviteLinkResult>>(
    `/boards/${boardId}/invite-link`,
  );
  return data.data;
}

export interface InviteLinkPreview {
  boardName: string;
  permission: InviteLinkPermission;
}

export async function previewInviteLink(token: string): Promise<InviteLinkPreview> {
  const { data } = await apiClient.get<ApiSuccessResponse<InviteLinkPreview>>(
    `/invite-links/${token}`,
  );
  return data.data;
}

export interface JoinInviteLinkResult {
  status: "joined" | "pending";
  boardId: string;
}

export async function joinInviteLink(token: string): Promise<JoinInviteLinkResult> {
  const { data } = await apiClient.post<ApiSuccessResponse<JoinInviteLinkResult>>(
    `/invite-links/${token}/join`,
  );
  return data.data;
}

export type JoinRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface JoinRequest {
  id: string;
  status: JoinRequestStatus;
  createdAt: string;
  user: {
    id: string;
    email: string;
    name: string | null;
  };
}

export async function listJoinRequests(boardId: string): Promise<JoinRequest[]> {
  const { data } = await apiClient.get<ApiSuccessResponse<JoinRequest[]>>(
    `/boards/${boardId}/join-requests`,
  );
  return data.data;
}

export async function decideJoinRequest(
  boardId: string,
  requestId: string,
  status: "APPROVED" | "REJECTED",
): Promise<JoinRequest> {
  const { data } = await apiClient.patch<ApiSuccessResponse<JoinRequest>>(
    `/boards/${boardId}/join-requests/${requestId}`,
    { status },
  );
  return data.data;
}
