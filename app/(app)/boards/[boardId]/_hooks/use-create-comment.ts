"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createComment, type CreateCommentPayload } from "@/lib/api/comments";

export function useCreateComment(boardId: string, cardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCommentPayload) => createComment(boardId, cardId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
