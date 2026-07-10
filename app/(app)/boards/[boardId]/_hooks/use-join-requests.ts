"use client";

import { useQuery } from "@tanstack/react-query";

import { listJoinRequests } from "@/lib/api/invite-links";

export function useJoinRequests(boardId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["boards", boardId, "join-requests"],
    queryFn: () => listJoinRequests(boardId),
    enabled: options?.enabled,
  });
}
