"use client";

import { useQuery } from "@tanstack/react-query";

import { getUnreadNotificationsCount } from "@/lib/api/notifications";

export function useUnreadNotificationsCount() {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: getUnreadNotificationsCount,
  });
}
