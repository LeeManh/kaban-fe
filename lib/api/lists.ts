import { apiClient, type ApiSuccessResponse } from "@/lib/api/client";
import type { List } from "@/lib/api/boards";

export interface CreateListPayload {
  title: string;
}

export async function createList(boardId: string, payload: CreateListPayload): Promise<List> {
  const { data } = await apiClient.post<ApiSuccessResponse<List>>(
    `/boards/${boardId}/lists`,
    payload,
  );
  return data.data;
}

export interface UpdateListPayload {
  title?: string;
}

export async function updateList(
  boardId: string,
  listId: string,
  payload: UpdateListPayload,
): Promise<List> {
  const { data } = await apiClient.patch<ApiSuccessResponse<List>>(
    `/boards/${boardId}/lists/${listId}`,
    payload,
  );
  return data.data;
}

export interface MoveListPayload {
  beforeId?: string;
  afterId?: string;
  targetBoardId?: string;
  position?: number;
}

export async function moveList(
  boardId: string,
  listId: string,
  payload: MoveListPayload,
): Promise<List> {
  const { data } = await apiClient.patch<ApiSuccessResponse<List>>(
    `/boards/${boardId}/lists/${listId}/move`,
    payload,
  );
  return data.data;
}

export async function deleteList(boardId: string, listId: string): Promise<void> {
  await apiClient.delete(`/boards/${boardId}/lists/${listId}`);
}

export interface CopyListPayload {
  title?: string;
}

export async function copyList(
  boardId: string,
  listId: string,
  payload: CopyListPayload,
): Promise<List> {
  const { data } = await apiClient.post<ApiSuccessResponse<List>>(
    `/boards/${boardId}/lists/${listId}/copy`,
    payload,
  );
  return data.data;
}

export interface MoveAllCardsPayload {
  targetListId: string;
}

export async function moveAllCards(
  boardId: string,
  listId: string,
  payload: MoveAllCardsPayload,
): Promise<void> {
  await apiClient.patch(`/boards/${boardId}/lists/${listId}/move-all-cards`, payload);
}
