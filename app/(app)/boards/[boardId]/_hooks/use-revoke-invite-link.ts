"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { revokeInviteLink, type InviteLink } from "@/lib/api/invite-links";

export function useRevokeInviteLink(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => revokeInviteLink(boardId),
    onSuccess: () => {
      queryClient.setQueryData<InviteLink | null>(["boards", boardId, "invite-link"], null);
    },
  });
}
