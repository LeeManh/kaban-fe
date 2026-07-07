"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateLabel, type UpdateLabelPayload } from "@/lib/api/labels";

interface UpdateLabelVars extends UpdateLabelPayload {
  labelId: string;
}

export function useUpdateLabel(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ labelId, ...payload }: UpdateLabelVars) =>
      updateLabel(boardId, labelId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
