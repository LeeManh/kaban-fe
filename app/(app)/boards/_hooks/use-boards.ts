"use client";

import { useQuery } from "@tanstack/react-query";

import { listBoards } from "@/lib/api/boards";

export function useBoards(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["boards"],
    queryFn: listBoards,
    enabled: options?.enabled,
  });
}
