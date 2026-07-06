"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCard, type UpdateCardPayload } from "@/lib/api/cards";

interface UpdateCardVars extends UpdateCardPayload {
  cardId: string;
}

export function useUpdateCard(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, ...payload }: UpdateCardVars) => updateCard(boardId, cardId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
