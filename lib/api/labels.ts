import { apiClient, type ApiSuccessResponse } from "@/lib/api/client";

export interface Label {
  id: string;
  name: string;
  color: string;
  boardId: string;
}

export interface CreateLabelPayload {
  name: string;
  color: string;
}

export async function createLabel(
  boardId: string,
  payload: CreateLabelPayload,
): Promise<Label> {
  const { data } = await apiClient.post<ApiSuccessResponse<Label>>(
    `/boards/${boardId}/labels`,
    payload,
  );
  return data.data;
}

export async function listLabels(boardId: string): Promise<Label[]> {
  const { data } = await apiClient.get<ApiSuccessResponse<Label[]>>(`/boards/${boardId}/labels`);
  return data.data;
}

export interface UpdateLabelPayload {
  name?: string;
  color?: string;
}

export async function updateLabel(
  boardId: string,
  labelId: string,
  payload: UpdateLabelPayload,
): Promise<Label> {
  const { data } = await apiClient.patch<ApiSuccessResponse<Label>>(
    `/boards/${boardId}/labels/${labelId}`,
    payload,
  );
  return data.data;
}

export async function deleteLabel(boardId: string, labelId: string): Promise<{ id: string }> {
  const { data } = await apiClient.delete<ApiSuccessResponse<{ id: string }>>(
    `/boards/${boardId}/labels/${labelId}`,
  );
  return data.data;
}

export interface CardLabelLink {
  cardId: string;
  labelId: string;
}

export async function assignLabelToCard(
  boardId: string,
  cardId: string,
  labelId: string,
): Promise<CardLabelLink> {
  const { data } = await apiClient.post<ApiSuccessResponse<CardLabelLink>>(
    `/boards/${boardId}/cards/${cardId}/labels/${labelId}`,
  );
  return data.data;
}

export async function removeLabelFromCard(
  boardId: string,
  cardId: string,
  labelId: string,
): Promise<CardLabelLink> {
  const { data } = await apiClient.delete<ApiSuccessResponse<CardLabelLink>>(
    `/boards/${boardId}/cards/${cardId}/labels/${labelId}`,
  );
  return data.data;
}
