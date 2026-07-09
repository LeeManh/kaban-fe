"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAttachment } from "@/lib/api/attachments";

export function useDeleteAttachment(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attachmentId: string) => deleteAttachment(boardId, attachmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
