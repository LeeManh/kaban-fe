"use client";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { listTemplates, type TemplateCategory } from "@/lib/api/templates";

export function useCategoryTemplates(category: TemplateCategory | undefined, pageSize: number) {
  return useInfiniteQuery({
    queryKey: ["templates", "category", category, pageSize],
    queryFn: ({ pageParam }) => listTemplates({ category, page: pageParam, pageSize }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: !!category,
    placeholderData: keepPreviousData,
  });
}
