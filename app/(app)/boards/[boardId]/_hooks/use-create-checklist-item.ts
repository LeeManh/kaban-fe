"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createChecklistItem } from "@/lib/api/checklists";

interface CreateChecklistItemVars {
  checklistId: string;
  content: string;
}

export function useCreateChecklistItem(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ checklistId, content }: CreateChecklistItemVars) =>
      createChecklistItem(boardId, checklistId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
