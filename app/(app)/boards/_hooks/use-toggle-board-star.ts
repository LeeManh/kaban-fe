"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { starBoard, unstarBoard, type BoardWithMembers } from "@/lib/api/boards";

interface ToggleBoardStarVars {
  boardId: string;
  isStarred: boolean;
}

export function useToggleBoardStar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ boardId, isStarred }: ToggleBoardStarVars) =>
      isStarred ? unstarBoard(boardId) : starBoard(boardId),
    onMutate: async ({ boardId, isStarred }) => {
      await queryClient.cancelQueries({ queryKey: ["boards"] });
      const previousBoards = queryClient.getQueryData<BoardWithMembers[]>(["boards"]);

      queryClient.setQueryData<BoardWithMembers[]>(["boards"], (boards) =>
        boards?.map((board) => (board.id === boardId ? { ...board, isStarred: !isStarred } : board)),
      );

      return { previousBoards };
    },
    onError: (_error, _vars, context) => {
      if (context?.previousBoards) {
        queryClient.setQueryData(["boards"], context.previousBoards);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
