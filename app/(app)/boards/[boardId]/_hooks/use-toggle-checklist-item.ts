"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleChecklistItem } from "@/lib/api/checklists";

export function useToggleChecklistItem(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => toggleChecklistItem(boardId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
