"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { listMyTemplates } from "@/lib/api/boards";

export function useMyTemplates(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["templates", "mine", page, pageSize],
    queryFn: () => listMyTemplates({ page, pageSize }),
    placeholderData: keepPreviousData,
  });
}
