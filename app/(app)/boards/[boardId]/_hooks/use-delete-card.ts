"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCard } from "@/lib/api/cards";

export function useDeleteCard(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardId: string) => deleteCard(boardId, cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
