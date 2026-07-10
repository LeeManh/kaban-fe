"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  updateNotificationPreferences,
  type NotificationPreference,
  type UpdateNotificationPreferencePayload,
} from "@/lib/api/notifications";

export function useUpdateNotificationPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateNotificationPreferencePayload) =>
      updateNotificationPreferences(payload),
    onSuccess: (data) => {
      queryClient.setQueryData<NotificationPreference>(["notifications", "preferences"], data);
    },
  });
}
