"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createChecklist } from "@/lib/api/checklists";

interface CreateChecklistVars {
  cardId: string;
  title: string;
}

export function useCreateChecklist(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, title }: CreateChecklistVars) =>
      createChecklist(boardId, cardId, { title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
