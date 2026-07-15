"use client";

import { useQuery } from "@tanstack/react-query";

import { listTemplates, type ListTemplatesParams } from "@/lib/api/templates";

export function useTemplates(params?: ListTemplatesParams, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["templates", params ?? {}],
    queryFn: () => listTemplates(params),
    enabled: options?.enabled,
  });
}
