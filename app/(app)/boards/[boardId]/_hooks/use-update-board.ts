"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateBoard, type UpdateBoardPayload } from "@/lib/api/boards";

export function useUpdateBoard(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateBoardPayload) => updateBoard(boardId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
