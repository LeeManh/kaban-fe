"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { decideJoinRequest } from "@/lib/api/invite-links";

export function useDecideJoinRequest(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ requestId, status }: { requestId: string; status: "APPROVED" | "REJECTED" }) =>
      decideJoinRequest(boardId, requestId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
