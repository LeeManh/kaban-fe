"use client";

import { useQuery } from "@tanstack/react-query";

import { getCard } from "@/lib/api/cards";

export function useCard(boardId: string, cardId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["boards", boardId, "cards", cardId],
    queryFn: () => getCard(boardId, cardId),
    enabled: options?.enabled,
  });
}
