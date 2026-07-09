"use client";

import { useQuery } from "@tanstack/react-query";

import { listBoardInvites } from "@/lib/api/invites";

export function useBoardInvites(boardId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["boards", boardId, "invites"],
    queryFn: () => listBoardInvites(boardId),
    enabled: options?.enabled,
  });
}
