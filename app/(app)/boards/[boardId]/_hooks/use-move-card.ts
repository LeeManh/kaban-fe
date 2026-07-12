"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { BoardDetail, CardSummary } from "@/lib/api/boards";
import { moveCard, type MoveCardPayload } from "@/lib/api/cards";

interface MoveCardVars extends MoveCardPayload {
  cardId: string;
  sourceListId: string;
}

function insertAt(cards: CardSummary[], card: CardSummary, beforeId?: string, afterId?: string) {
  let toIndex: number;
  if (afterId) {
    const idx = cards.findIndex((c) => c.id === afterId);
    toIndex = idx === -1 ? cards.length : idx;
  } else if (beforeId) {
    const idx = cards.findIndex((c) => c.id === beforeId);
    toIndex = idx === -1 ? cards.length : idx + 1;
  } else {
    toIndex = cards.length;
  }
  const next = [...cards];
  next.splice(toIndex, 0, card);
  return next;
}

export function useMoveCard(boardId: string) {
  const queryClient = useQueryClient();
  const queryKey = ["boards", boardId];

  return useMutation({
    mutationFn: ({ cardId, listId, beforeId, afterId }: MoveCardVars) =>
      moveCard(boardId, cardId, { listId, beforeId, afterId }),
    onMutate: async ({ cardId, sourceListId, listId, beforeId, afterId }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousBoard = queryClient.getQueryData<BoardDetail>(queryKey);
      const targetListId = listId ?? sourceListId;

      queryClient.setQueryData<BoardDetail>(queryKey, (board) => {
        if (!board) return board;

        const sourceList = board.lists.find((list) => list.id === sourceListId);
        const card = sourceList?.cards.find((c) => c.id === cardId);
        if (!card) return board;

        const movedCard = targetListId === sourceListId ? card : { ...card, listId: targetListId };

        return {
          ...board,
          lists: board.lists.map((list) => {
            if (list.id === sourceListId && list.id === targetListId) {
              const remaining = list.cards.filter((c) => c.id !== cardId);
              return { ...list, cards: insertAt(remaining, movedCard, beforeId, afterId) };
            }
            if (list.id === sourceListId) {
              return { ...list, cards: list.cards.filter((c) => c.id !== cardId) };
            }
            if (list.id === targetListId) {
              return { ...list, cards: insertAt(list.cards, movedCard, beforeId, afterId) };
            }
            return list;
          }),
        };
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
