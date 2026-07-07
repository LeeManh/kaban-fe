"use client";

import { useQuery } from "@tanstack/react-query";

import { listLabels } from "@/lib/api/labels";

export function useLabels(boardId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["boards", boardId, "labels"],
    queryFn: () => listLabels(boardId),
    enabled: options?.enabled,
  });
}
