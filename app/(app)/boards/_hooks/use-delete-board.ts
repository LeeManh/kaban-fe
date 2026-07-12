"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBoard } from "@/lib/api/boards";

export function useDeleteBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boardId: string) => deleteBoard(boardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
