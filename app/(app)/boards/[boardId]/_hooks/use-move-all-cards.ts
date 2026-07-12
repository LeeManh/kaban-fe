"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { moveAllCards, type MoveAllCardsPayload } from "@/lib/api/lists";

export function useMoveAllCards(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      listId,
      payload,
    }: {
      listId: string;
      payload: MoveAllCardsPayload;
    }) => moveAllCards(boardId, listId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
