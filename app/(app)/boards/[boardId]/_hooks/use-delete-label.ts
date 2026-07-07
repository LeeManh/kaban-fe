"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteLabel } from "@/lib/api/labels";

export function useDeleteLabel(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (labelId: string) => deleteLabel(boardId, labelId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
