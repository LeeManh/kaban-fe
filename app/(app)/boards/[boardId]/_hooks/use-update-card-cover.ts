"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCard } from "@/lib/api/cards";

interface UpdateCardCoverVars {
  cardId: string;
  version: number;
  cover: string | null;
}

export function useUpdateCardCover(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, version, cover }: UpdateCardCoverVars) =>
      updateCard(boardId, cardId, { version, cover }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
