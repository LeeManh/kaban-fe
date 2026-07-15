"use client";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { listTemplates } from "@/lib/api/templates";

export function useSearchTemplates(
  name: string,
  pageSize: number,
  options?: { enabled?: boolean },
) {
  return useInfiniteQuery({
    queryKey: ["templates", "search", name, pageSize],
    queryFn: ({ pageParam }) => listTemplates({ name, page: pageParam, pageSize }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: options?.enabled,
    placeholderData: keepPreviousData,
  });
}
