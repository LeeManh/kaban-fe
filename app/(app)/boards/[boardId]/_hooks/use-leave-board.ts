"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { leaveBoard } from "@/lib/api/boards";

export function useLeaveBoard(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => leaveBoard(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
