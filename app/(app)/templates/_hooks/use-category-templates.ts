"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { listTemplates, type TemplateCategory } from "@/lib/api/templates";

export function useCategoryTemplates(
  category: TemplateCategory | undefined,
  page: number,
  pageSize: number,
) {
  return useQuery({
    queryKey: ["templates", "category", category, page, pageSize],
    queryFn: () => listTemplates({ category, page, pageSize }),
    enabled: !!category,
    placeholderData: keepPreviousData,
  });
}
