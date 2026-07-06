import { apiClient, type ApiSuccessResponse } from "@/lib/api/client";
import type { Card, CardPriority } from "@/lib/api/boards";

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
