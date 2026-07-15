"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateChecklistItem } from "@/lib/api/checklists";

interface UpdateChecklistItemVars {
  itemId: string;
  content: string;
}

export function useUpdateChecklistItem(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, content }: UpdateChecklistItemVars) =>
      updateChecklistItem(boardId, itemId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
