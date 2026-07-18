"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTemplateVisibility, type TemplateVisibility } from "@/lib/api/boards";

export function useUpdateTemplateVisibility(templateId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (templateVisibility: TemplateVisibility) =>
      updateTemplateVisibility(templateId, templateVisibility),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      queryClient.invalidateQueries({ queryKey: ["boards", templateId] });
    },
  });
}
