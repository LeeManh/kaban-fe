"use client";

import { useQuery } from "@tanstack/react-query";

import { getTemplate } from "@/lib/api/templates";

export function useTemplate(templateId: string) {
  return useQuery({
    queryKey: ["templates", "detail", templateId],
    queryFn: () => getTemplate(templateId),
  });
}
