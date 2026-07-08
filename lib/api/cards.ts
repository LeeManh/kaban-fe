import { apiClient, type ApiSuccessResponse } from "@/lib/api/client";
import type { Card, CardAssignee, CardLabel, CardPriority } from "@/lib/api/boards";

export interface ChecklistItem {
  id: string;
  content: string;
  isDone: boolean;
  order: number;
  checklistId: string;
}

export interface Checklist {
  id: string;
  title: string;
  order: number;
  cardId: string;
  createdAt: string;
  items: ChecklistItem[];
}

export interface CardAttachment {
  id: string;
  filename: string;
  key: string;
  mimeType: string | null;
  size: number | null;
  cardId: string;
  uploadedById: string;
  createdAt: string;
  downloadUrl: string;
}

export interface CardComment {
  id: string;
  content: string;
  cardId: string;
  authorId: string;
  author: CardAssignee;
  createdAt: string;
  updatedAt: string;
}

export interface CardDetail extends Card {
  labels: CardLabel[];
  assignees: CardAssignee[];
  checklists: Checklist[];
  attachments: CardAttachment[];
  comments: CardComment[];
  checklistProgress: { done: number; total: number };
}

export async function getCard(boardId: string, cardId: string): Promise<CardDetail> {
  const { data } = await apiClient.get<ApiSuccessResponse<CardDetail>>(
    `/boards/${boardId}/cards/${cardId}`,
  );
  return data.data;
}

export interface CreateCardPayload {
  title: string;
  description?: string;
  priority?: CardPriority;
  dueDate?: string;
}

export async function createCard(
  boardId: string,
  listId: string,
  payload: CreateCardPayload,
): Promise<Card> {
  const { data } = await apiClient.post<ApiSuccessResponse<Card>>(
    `/boards/${boardId}/lists/${listId}/cards`,
    payload,
  );
  return data.data;
}

export interface UpdateCardPayload {
  version: number;
  title?: string;
  description?: string;
  priority?: CardPriority;
  dueDate?: string | null;
  reminderOffsetMinutes?: number | null;
  isDone?: boolean;
  cover?: string | null;
}

export async function updateCard(
  boardId: string,
  cardId: string,
  payload: UpdateCardPayload,
): Promise<Card> {
  const { data } = await apiClient.patch<ApiSuccessResponse<Card>>(
    `/boards/${boardId}/cards/${cardId}`,
    payload,
  );
  return data.data;
}

export interface MoveCardPayload {
  listId?: string;
  beforeId?: string;
  afterId?: string;
}

export async function moveCard(
  boardId: string,
  cardId: string,
  payload: MoveCardPayload,
): Promise<Card> {
  const { data } = await apiClient.patch<ApiSuccessResponse<Card>>(
    `/boards/${boardId}/cards/${cardId}/move`,
    payload,
  );
  return data.data;
}

export interface CardAssigneeLink {
  cardId: string;
  userId: string;
}

export async function assignCardMember(
  boardId: string,
  cardId: string,
  userId: string,
): Promise<CardAssigneeLink> {
  const { data } = await apiClient.post<ApiSuccessResponse<CardAssigneeLink>>(
    `/boards/${boardId}/cards/${cardId}/assignees/${userId}`,
  );
  return data.data;
}

export async function unassignCardMember(
  boardId: string,
  cardId: string,
  userId: string,
): Promise<CardAssigneeLink> {
  const { data } = await apiClient.delete<ApiSuccessResponse<CardAssigneeLink>>(
    `/boards/${boardId}/cards/${cardId}/assignees/${userId}`,
  );
  return data.data;
}
