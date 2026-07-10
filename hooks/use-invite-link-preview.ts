"use client";

import { useQuery } from "@tanstack/react-query";

import { previewInviteLink } from "@/lib/api/invite-links";

export function useInviteLinkPreview(token: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["invite-links", token],
    queryFn: () => previewInviteLink(token),
    enabled: options?.enabled,
    retry: false,
  });
}
