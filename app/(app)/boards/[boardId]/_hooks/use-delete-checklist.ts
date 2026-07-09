"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteChecklist } from "@/lib/api/checklists";

export function useDeleteChecklist(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (checklistId: string) => deleteChecklist(boardId, checklistId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
