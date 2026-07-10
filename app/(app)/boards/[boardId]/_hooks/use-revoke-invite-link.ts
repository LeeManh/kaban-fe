"use client";

import { useMutation } from "@tanstack/react-query";

import { revokeInviteLink } from "@/lib/api/invite-links";

export function useRevokeInviteLink(boardId: string) {
  return useMutation({
    mutationFn: () => revokeInviteLink(boardId),
  });
}
