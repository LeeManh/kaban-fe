"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { BoardDetail } from "@/lib/api/boards";
import { moveList, type MoveListPayload } from "@/lib/api/lists";

interface MoveListVars extends MoveListPayload {
  listId: string;
}

export function useMoveList(boardId: string) {
  const queryClient = useQueryClient();
  const queryKey = ["boards", boardId];

  return useMutation({
    mutationFn: ({ listId, ...payload }: MoveListVars) => moveList(boardId, listId, payload),
    onMutate: async ({ listId, beforeId, afterId }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousBoard = queryClient.getQueryData<BoardDetail>(queryKey);

      queryClient.setQueryData<BoardDetail>(queryKey, (board) => {
        if (!board) return board;

        const lists = [...board.lists];
        const fromIndex = lists.findIndex((list) => list.id === listId);
        if (fromIndex === -1) return board;

        const [moving] = lists.splice(fromIndex, 1);

        let toIndex: number;
        if (afterId) {
          const idx = lists.findIndex((list) => list.id === afterId);
          toIndex = idx === -1 ? lists.length : idx;
        } else if (beforeId) {
          const idx = lists.findIndex((list) => list.id === beforeId);
          toIndex = idx === -1 ? lists.length : idx + 1;
        } else {
          toIndex = lists.length;
        }

        lists.splice(toIndex, 0, moving);
        return { ...board, lists };
      });

      return { previousBoard };
    },
    onError: (_error, _vars, context) => {
      if (context?.previousBoard) {
        queryClient.setQueryData(queryKey, context.previousBoard);
      }
    },
  });
}
