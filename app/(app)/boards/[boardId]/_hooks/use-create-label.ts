"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createLabel, type CreateLabelPayload } from "@/lib/api/labels";

export function useCreateLabel(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateLabelPayload) => createLabel(boardId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
