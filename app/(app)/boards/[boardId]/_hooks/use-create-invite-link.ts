"use client";

import { useMutation } from "@tanstack/react-query";

import { createInviteLink, type CreateInviteLinkPayload } from "@/lib/api/invite-links";

export function useCreateInviteLink(boardId: string) {
  return useMutation({
    mutationFn: (payload: CreateInviteLinkPayload = {}) => createInviteLink(boardId, payload),
  });
}
