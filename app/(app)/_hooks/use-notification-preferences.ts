"use client";

import { useQuery } from "@tanstack/react-query";

import { getNotificationPreferences } from "@/lib/api/notifications";

export function useNotificationPreferences() {
  return useQuery({
    queryKey: ["notifications", "preferences"],
    queryFn: getNotificationPreferences,
  });
}
