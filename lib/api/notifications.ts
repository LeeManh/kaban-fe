import { apiClient, type ApiSuccessResponse } from "@/lib/api/client";

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
