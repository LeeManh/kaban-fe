import { apiClient, type ApiSuccessResponse } from "@/lib/api/client";

export interface Board {
  id: string;
  name: string;
  background: string;
  ownerId: string;
  createdAt: string;
}

export interface CreateBoardPayload {
  name: string;
  background: string;
}

export async function createBoard(payload: CreateBoardPayload): Promise<Board> {
  const { data } = await apiClient.post<ApiSuccessResponse<Board>>("/boards", payload);
  return data.data;
}

export interface BoardMember {
  id: string;
  email: string;
  name: string | null;
}

export interface BoardWithMembers extends Board {
  members: BoardMember[];
  isStarred: boolean;
}

export async function listBoards(): Promise<BoardWithMembers[]> {
  const { data } = await apiClient.get<ApiSuccessResponse<BoardWithMembers[]>>("/boards");
  return data.data;
}

export type CardPriority = "LOW" | "MEDIUM" | "HIGH";

export interface CardLabel {
  id: string;
  name: string;
  color: string;
}

export interface CardAssignee {
  id: string;
  name: string | null;
  email: string;
}

export interface CardSummary {
  id: string;
  title: string;
  description: string | null;
  order: number;
  priority: CardPriority;
  dueDate: string | null;
  isDone: boolean;
  version: number;
  listId: string;
  createdAt: string;
  updatedAt: string;
  labels: CardLabel[];
  assignees: CardAssignee[];
  _count: { comments: number; attachments: number };
  checklistProgress: { done: number; total: number };
}

export interface ListWithCards {
  id: string;
  title: string;
  order: number;
  boardId: string;
  createdAt: string;
  updatedAt: string;
  cards: CardSummary[];
}

export interface BoardDetail extends BoardWithMembers {
  lists: ListWithCards[];
}

export async function getBoard(boardId: string): Promise<BoardDetail> {
  const { data } = await apiClient.get<ApiSuccessResponse<BoardDetail>>(`/boards/${boardId}`);
  return data.data;
}

export async function starBoard(boardId: string): Promise<{ boardId: string; isStarred: boolean }> {
  const { data } = await apiClient.post<ApiSuccessResponse<{ boardId: string; isStarred: boolean }>>(
    `/boards/${boardId}/star`,
  );
  return data.data;
}

export async function unstarBoard(
  boardId: string,
): Promise<{ boardId: string; isStarred: boolean }> {
  const { data } = await apiClient.delete<ApiSuccessResponse<{ boardId: string; isStarred: boolean }>>(
    `/boards/${boardId}/star`,
  );
  return data.data;
}

export interface UpdateBoardPayload {
  name?: string;
  background?: string;
}

export async function updateBoard(boardId: string, payload: UpdateBoardPayload): Promise<Board> {
  const { data } = await apiClient.patch<ApiSuccessResponse<Board>>(
    `/boards/${boardId}`,
    payload,
  );
  return data.data;
}

export const MAX_BOARD_BACKGROUND_SIZE = 5 * 1024 * 1024; // 5 MB

export const ALLOWED_BOARD_BACKGROUND_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export interface PresignBoardBackgroundPayload {
  filename: string;
  contentType: string;
  size: number;
}

export interface PresignBoardBackgroundResult {
  key: string;
  uploadUrl: string;
}

export async function presignBoardBackground(
  boardId: string,
  payload: PresignBoardBackgroundPayload,
): Promise<PresignBoardBackgroundResult> {
  const { data } = await apiClient.post<ApiSuccessResponse<PresignBoardBackgroundResult>>(
    `/boards/${boardId}/background/presign`,
    payload,
  );
  return data.data;
}

export async function uploadBoardBackgroundFile(uploadUrl: string, file: File): Promise<void> {
  await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
}
