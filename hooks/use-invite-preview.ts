"use client";

import { useQuery } from "@tanstack/react-query";

import { previewInvite } from "@/lib/api/invites";

export function useInvitePreview(token: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["invites", token],
    queryFn: () => previewInvite(token),
    enabled: options?.enabled,
    retry: false,
  });
}
