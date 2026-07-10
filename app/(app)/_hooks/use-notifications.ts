"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { listNotifications } from "@/lib/api/notifications";

const PAGE_SIZE = 10;

export function useNotifications(enabled: boolean, unreadOnly: boolean) {
  return useInfiniteQuery({
    queryKey: ["notifications", "list", unreadOnly],
    queryFn: ({ pageParam }) =>
      listNotifications({ unread: unreadOnly, page: pageParam, pageSize: PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled,
  });
}
