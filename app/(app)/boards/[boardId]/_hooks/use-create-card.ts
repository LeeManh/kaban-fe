"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCard, type CreateCardPayload } from "@/lib/api/cards";

export function useCreateCard(boardId: string, listId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCardPayload) => createCard(boardId, listId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
