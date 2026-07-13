"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { starBoard, unstarBoard, type BoardDetail, type BoardWithMembers } from "@/lib/api/boards";

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
      await queryClient.cancelQueries({ queryKey: ["boards"], exact: true });
      await queryClient.cancelQueries({ queryKey: ["boards", boardId] });

      const previousBoards = queryClient.getQueryData<BoardWithMembers[]>(["boards"]);
      const previousBoard = queryClient.getQueryData<BoardDetail>(["boards", boardId]);
      const nextIsStarred = !isStarred;

      queryClient.setQueryData<BoardWithMembers[]>(["boards"], (boards) =>
        boards?.map((board) =>
          board.id === boardId ? { ...board, isStarred: nextIsStarred } : board,
        ),
      );
      queryClient.setQueryData<BoardDetail>(["boards", boardId], (board) =>
        board ? { ...board, isStarred: nextIsStarred } : board,
      );

      return { previousBoards, previousBoard, boardId };
    },
    onError: (_error, _vars, context) => {
      if (context?.previousBoards) {
        queryClient.setQueryData(["boards"], context.previousBoards);
      }
      if (context?.previousBoard) {
        queryClient.setQueryData(["boards", context.boardId], context.previousBoard);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"], exact: true });
    },
  });
}
