"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { revokeBoardInvite } from "@/lib/api/invites";

export function useRevokeBoardInvite(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inviteId: string) => revokeBoardInvite(boardId, inviteId),
    meta: { skipErrorToast: true },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId, "invites"] });
    },
  });
}
