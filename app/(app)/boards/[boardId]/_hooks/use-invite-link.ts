"use client";

import { useQuery } from "@tanstack/react-query";

import { getInviteLink } from "@/lib/api/invite-links";

export function useInviteLink(boardId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["boards", boardId, "invite-link"],
    queryFn: () => getInviteLink(boardId),
    enabled: options?.enabled,
    retry: false,
  });
}
