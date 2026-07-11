"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateInviteLink, type InviteLink, type UpdateInviteLinkPayload } from "@/lib/api/invite-links";

export function useUpdateInviteLink(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateInviteLinkPayload) => updateInviteLink(boardId, payload),
    meta: { skipErrorToast: true },
    onSuccess: (link) => {
      queryClient.setQueryData<InviteLink>(["boards", boardId, "invite-link"], link);
    },
  });
}
