import { apiClient, type ApiSuccessResponse } from "@/lib/api/client";
import type { CardSummary } from "@/lib/api/boards";
import type { CardDetail } from "@/lib/api/cards";

export type TemplateCategory =
  | "BUSINESS"
  | "DESIGN"
  | "EDUCATION"
  | "ENGINEERING"
  | "MARKETING"
  | "PRODUCT_MANAGEMENT"
  | "REMOTE_WORK";

export type TemplateVisibility = "PRIVATE" | "PUBLIC";

export interface TemplateOwner {
  id: string;
  name: string | null;
  email: string;
  avatar: string | null;
}

export interface BoardTemplate {
  id: string;
  name: string;
  background: string;
  ownerId: string;
  owner?: TemplateOwner;
  createdAt: string;
  isTemplate: boolean;
  templateCategory: TemplateCategory | null;
  templateDescription: string | null;
  templateVisibility: TemplateVisibility | null;
}

export interface ListTemplatesParams {
  name?: string;
  category?: TemplateCategory;
  page?: number;
  pageSize?: number;
}

export interface PaginatedTemplates {
  items: BoardTemplate[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function listTemplates(
  params?: ListTemplatesParams,
): Promise<PaginatedTemplates> {
  const { data } = await apiClient.get<ApiSuccessResponse<PaginatedTemplates>>(
    "/boards/templates",
    { params },
  );
  return data.data;
}

export interface TemplateListPreview {
  id: string;
  title: string;
  order: number;
  cards: CardSummary[];
}

export interface BoardTemplateDetail extends BoardTemplate {
  lists: TemplateListPreview[];
}

export async function getTemplate(templateId: string): Promise<BoardTemplateDetail> {
  const { data } = await apiClient.get<ApiSuccessResponse<BoardTemplateDetail>>(
    `/boards/templates/${templateId}`,
  );
  return data.data;
}

export type TemplateCardDetail = Omit<CardDetail, "comments">;

export async function getTemplateCard(
  templateId: string,
  cardId: string,
): Promise<TemplateCardDetail> {
  const { data } = await apiClient.get<ApiSuccessResponse<TemplateCardDetail>>(
    `/boards/templates/${templateId}/cards/${cardId}`,
  );
  return data.data;
}

export interface CreateBoardFromTemplatePayload {
  name?: string;
  background?: string;
}

export interface CreatedBoard {
  id: string;
  name: string;
  background: string;
}

export async function createBoardFromTemplate(
  templateId: string,
  payload?: CreateBoardFromTemplatePayload,
): Promise<CreatedBoard> {
  const { data } = await apiClient.post<ApiSuccessResponse<CreatedBoard>>(
    `/boards/templates/${templateId}/use`,
    payload ?? {},
  );
  return data.data;
}

export interface CreateTemplateFromBoardPayload {
  name?: string;
  templateCategory: TemplateCategory;
  templateDescription?: string;
}

export async function createTemplateFromBoard(
  boardId: string,
  payload: CreateTemplateFromBoardPayload,
): Promise<BoardTemplate> {
  const { data } = await apiClient.post<ApiSuccessResponse<BoardTemplate>>(
    `/boards/${boardId}/make-template`,
    payload,
  );
  return data.data;
}
