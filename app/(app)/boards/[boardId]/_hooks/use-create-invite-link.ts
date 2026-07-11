"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createInviteLink, type CreateInviteLinkPayload, type InviteLink } from "@/lib/api/invite-links";

export function useCreateInviteLink(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateInviteLinkPayload = {}) => createInviteLink(boardId, payload),
    meta: { skipErrorToast: true },
    onSuccess: (link) => {
      queryClient.setQueryData<InviteLink>(["boards", boardId, "invite-link"], link);
    },
  });
}
