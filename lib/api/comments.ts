import { apiClient, type ApiSuccessResponse } from "@/lib/api/client";
import type { CardComment } from "@/lib/api/cards";

export interface CreateCommentPayload {
  content: string;
}

export async function createComment(
  boardId: string,
  cardId: string,
  payload: CreateCommentPayload,
): Promise<CardComment> {
  const { data } = await apiClient.post<ApiSuccessResponse<CardComment>>(
    `/boards/${boardId}/cards/${cardId}/comments`,
    payload,
  );
  return data.data;
}

export interface UpdateCommentPayload {
  content: string;
}

export async function updateComment(
  boardId: string,
  commentId: string,
  payload: UpdateCommentPayload,
): Promise<CardComment> {
  const { data } = await apiClient.patch<ApiSuccessResponse<CardComment>>(
    `/boards/${boardId}/comments/${commentId}`,
    payload,
  );
  return data.data;
}

export interface CommentLink {
  id: string;
}

export async function deleteComment(boardId: string, commentId: string): Promise<CommentLink> {
  const { data } = await apiClient.delete<ApiSuccessResponse<CommentLink>>(
    `/boards/${boardId}/comments/${commentId}`,
  );
  return data.data;
}
