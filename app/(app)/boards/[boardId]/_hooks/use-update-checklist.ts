"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateChecklist } from "@/lib/api/checklists";

interface UpdateChecklistVars {
  checklistId: string;
  title: string;
}

export function useUpdateChecklist(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ checklistId, title }: UpdateChecklistVars) =>
      updateChecklist(boardId, checklistId, { title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
