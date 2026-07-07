"use client";

import { useQuery } from "@tanstack/react-query";

import { listBoardMembers } from "@/lib/api/boards";

export function useBoardMembers(boardId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["boards", boardId, "members"],
    queryFn: () => listBoardMembers(boardId),
    enabled: options?.enabled,
  });
}
