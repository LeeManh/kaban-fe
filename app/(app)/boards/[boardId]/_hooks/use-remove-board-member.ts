"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeBoardMember } from "@/lib/api/boards";

export function useRemoveBoardMember(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => removeBoardMember(boardId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
