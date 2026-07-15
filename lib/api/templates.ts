import { apiClient, type ApiSuccessResponse } from "@/lib/api/client";

export type TemplateCategory =
  | "BUSINESS"
  | "DESIGN"
  | "EDUCATION"
  | "ENGINEERING"
  | "MARKETING"
  | "PRODUCT_MANAGEMENT"
  | "REMOTE_WORK";

export interface BoardTemplate {
  id: string;
  name: string;
  background: string;
  createdAt: string;
  isTemplate: boolean;
  templateCategory: TemplateCategory | null;
  templateDescription: string | null;
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

export async function getTemplate(templateId: string): Promise<BoardTemplate> {
  const { data } = await apiClient.get<ApiSuccessResponse<BoardTemplate>>(
    `/boards/templates/${templateId}`,
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
