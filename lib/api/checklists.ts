import { apiClient, type ApiSuccessResponse } from "@/lib/api/client";
import type { Checklist, ChecklistItem } from "@/lib/api/cards";

export interface CreateChecklistPayload {
  title: string;
}

export async function createChecklist(
  boardId: string,
  cardId: string,
  payload: CreateChecklistPayload,
): Promise<Checklist> {
  const { data } = await apiClient.post<ApiSuccessResponse<Checklist>>(
    `/boards/${boardId}/cards/${cardId}/checklists`,
    payload,
  );
  return data.data;
}

export interface ChecklistLink {
  id: string;
}

export async function deleteChecklist(boardId: string, checklistId: string): Promise<ChecklistLink> {
  const { data } = await apiClient.delete<ApiSuccessResponse<ChecklistLink>>(
    `/boards/${boardId}/checklists/${checklistId}`,
  );
  return data.data;
}

export interface CreateChecklistItemPayload {
  content: string;
}

export async function createChecklistItem(
  boardId: string,
  checklistId: string,
  payload: CreateChecklistItemPayload,
): Promise<ChecklistItem> {
  const { data } = await apiClient.post<ApiSuccessResponse<ChecklistItem>>(
    `/boards/${boardId}/checklists/${checklistId}/items`,
    payload,
  );
  return data.data;
}

export async function toggleChecklistItem(boardId: string, itemId: string): Promise<ChecklistItem> {
  const { data } = await apiClient.patch<ApiSuccessResponse<ChecklistItem>>(
    `/boards/${boardId}/checklist-items/${itemId}/toggle`,
  );
  return data.data;
}

export interface ChecklistItemLink {
  id: string;
}

export async function deleteChecklistItem(boardId: string, itemId: string): Promise<ChecklistItemLink> {
  const { data } = await apiClient.delete<ApiSuccessResponse<ChecklistItemLink>>(
    `/boards/${boardId}/checklist-items/${itemId}`,
  );
  return data.data;
}
