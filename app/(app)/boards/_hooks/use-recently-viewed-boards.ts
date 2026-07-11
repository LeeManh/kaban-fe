"use client";

import { useQuery } from "@tanstack/react-query";

import { listRecentlyViewedBoards } from "@/lib/api/boards";

export function useRecentlyViewedBoards(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["boards", "recently-viewed"],
    queryFn: listRecentlyViewedBoards,
    enabled: options?.enabled,
  });
}
