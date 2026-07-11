"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBoardMemberRole, type BoardRole } from "@/lib/api/boards";

export function useUpdateBoardMemberRole(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: BoardRole }) =>
      updateBoardMemberRole(boardId, userId, role),
    meta: { skipErrorToast: true },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
