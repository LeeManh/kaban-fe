"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteComment } from "@/lib/api/comments";

export function useDeleteComment(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteComment(boardId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
