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
