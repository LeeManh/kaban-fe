import { apiClient, type ApiSuccessResponse } from "@/lib/api/client";

export type NotificationType =
  | "CARD_ASSIGNED"
  | "DUE_REMINDER"
  | "COMMENT_MENTION"
  | "BOARD_INVITATION"
  | "CARD_REMOVED"
  | "ATTACHMENT_ADDED"
  | "CARD_MOVED";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  link: string | null;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationListResult {
  items: Notification[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ListNotificationsParams {
  unread?: boolean;
  page?: number;
  pageSize?: number;
}

export async function listNotifications(
  params: ListNotificationsParams = {},
): Promise<NotificationListResult> {
  const { data } = await apiClient.get<ApiSuccessResponse<NotificationListResult>>(
    "/notifications",
    {
      params: {
        unread: params.unread ? "true" : undefined,
        page: params.page,
        pageSize: params.pageSize,
      },
    },
  );
  return data.data;
}

export async function getUnreadNotificationsCount(): Promise<number> {
  const { data } = await apiClient.get<ApiSuccessResponse<number>>(
    "/notifications/unread-count",
  );
  return data.data;
}

export async function markNotificationRead(notificationId: string): Promise<Notification> {
  const { data } = await apiClient.patch<ApiSuccessResponse<Notification>>(
    `/notifications/${notificationId}/read`,
  );
  return data.data;
}

export async function markAllNotificationsRead(): Promise<{ ok: boolean }> {
  const { data } = await apiClient.patch<ApiSuccessResponse<{ ok: boolean }>>(
    "/notifications/read-all",
  );
  return data.data;
}

export type EmailFrequency = "NEVER" | "INSTANT";

export interface NotificationPreference {
  userId: string;
  emailFrequency: EmailFrequency;
  commentsEnabled: boolean;
  dueDatesEnabled: boolean;
  removedFromCardEnabled: boolean;
  attachmentsEnabled: boolean;
  cardsMovedEnabled: boolean;
}

export async function getNotificationPreferences(): Promise<NotificationPreference> {
  const { data } = await apiClient.get<ApiSuccessResponse<NotificationPreference>>(
    "/notifications/preferences",
  );
  return data.data;
}

export interface UpdateNotificationPreferencePayload {
  emailFrequency?: EmailFrequency;
  commentsEnabled?: boolean;
  dueDatesEnabled?: boolean;
  removedFromCardEnabled?: boolean;
  attachmentsEnabled?: boolean;
  cardsMovedEnabled?: boolean;
}

export async function updateNotificationPreferences(
  payload: UpdateNotificationPreferencePayload,
): Promise<NotificationPreference> {
  const { data } = await apiClient.patch<ApiSuccessResponse<NotificationPreference>>(
    "/notifications/preferences",
    payload,
  );
  return data.data;
}
