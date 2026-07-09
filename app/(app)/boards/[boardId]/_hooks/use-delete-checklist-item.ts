"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteChecklistItem } from "@/lib/api/checklists";

export function useDeleteChecklistItem(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => deleteChecklistItem(boardId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
