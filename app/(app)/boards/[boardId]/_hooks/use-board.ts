"use client";

import { useQuery } from "@tanstack/react-query";

import { getBoard } from "@/lib/api/boards";

export function useBoard(boardId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["boards", boardId],
    queryFn: () => getBoard(boardId),
    enabled: options?.enabled,
  });
}
