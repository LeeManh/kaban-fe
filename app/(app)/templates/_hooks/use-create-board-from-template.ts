"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createBoardFromTemplate,
  type CreateBoardFromTemplatePayload,
} from "@/lib/api/templates";

export function useCreateBoardFromTemplate(templateId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload?: CreateBoardFromTemplatePayload) =>
      createBoardFromTemplate(templateId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
