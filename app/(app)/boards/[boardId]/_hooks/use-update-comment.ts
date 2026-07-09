"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateComment } from "@/lib/api/comments";

interface UpdateCommentVars {
  commentId: string;
  content: string;
}

export function useUpdateComment(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: UpdateCommentVars) =>
      updateComment(boardId, commentId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
