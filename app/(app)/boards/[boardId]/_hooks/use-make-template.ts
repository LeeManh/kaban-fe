"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTemplateFromBoard, type CreateTemplateFromBoardPayload } from "@/lib/api/templates";

export function useMakeTemplate(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTemplateFromBoardPayload) =>
      createTemplateFromBoard(boardId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
    },
  });
}
