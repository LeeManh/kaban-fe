"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBoardInvite, type CreateBoardInvitePayload } from "@/lib/api/invites";

export function useCreateBoardInvite(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBoardInvitePayload) => createBoardInvite(boardId, payload),
    meta: { skipErrorToast: true },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId, "invites"] });
    },
  });
}
