"use client";

import { useQuery } from "@tanstack/react-query";

import { getTemplateCard } from "@/lib/api/templates";

export function useTemplateCard(templateId: string, cardId: string | null) {
  return useQuery({
    queryKey: ["templates", "card", templateId, cardId],
    queryFn: () => getTemplateCard(templateId, cardId as string),
    enabled: !!cardId,
  });
}
