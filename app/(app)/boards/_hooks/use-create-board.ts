"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createBoard } from "@/lib/api/boards";

export function useCreateBoard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
