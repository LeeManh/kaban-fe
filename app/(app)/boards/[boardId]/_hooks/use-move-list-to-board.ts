"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { moveList } from "@/lib/api/lists";

export function useMoveListToBoard(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      listId,
      targetBoardId,
      position,
    }: {
      listId: string;
      targetBoardId: string;
      position: number;
    }) => moveList(boardId, listId, { targetBoardId, position }),
    onSuccess: (_data, { targetBoardId }) => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
      if (targetBoardId !== boardId) {
        queryClient.invalidateQueries({ queryKey: ["boards", targetBoardId] });
      }
    },
  });
}
