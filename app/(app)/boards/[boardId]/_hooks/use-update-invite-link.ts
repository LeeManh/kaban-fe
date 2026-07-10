"use client";

import { useMutation } from "@tanstack/react-query";

import { updateInviteLink, type UpdateInviteLinkPayload } from "@/lib/api/invite-links";

export function useUpdateInviteLink(boardId: string) {
  return useMutation({
    mutationFn: (payload: UpdateInviteLinkPayload) => updateInviteLink(boardId, payload),
  });
}
