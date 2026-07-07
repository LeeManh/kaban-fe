"use client";

import { type QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

import type { BoardDetail, CardLabel } from "@/lib/api/boards";
import { assignLabelToCard, removeLabelFromCard } from "@/lib/api/labels";

function updateCardLabels(
  queryClient: QueryClient,
  boardId: string,
  cardId: string,
  updater: (labels: CardLabel[]) => CardLabel[],
) {
  const queryKey = ["boards", boardId];
  const previousBoard = queryClient.getQueryData<BoardDetail>(queryKey);

  queryClient.setQueryData<BoardDetail>(queryKey, (board) => {
    if (!board) return board;
    return {
      ...board,
      lists: board.lists.map((list) => ({
        ...list,
        cards: list.cards.map((card) =>
          card.id === cardId ? { ...card, labels: updater(card.labels) } : card,
        ),
      })),
    };
  });

  return previousBoard;
}

export function useAssignCardLabel(boardId: string) {
  const queryClient = useQueryClient();
  const queryKey = ["boards", boardId];

  return useMutation({
    mutationFn: ({ cardId, label }: { cardId: string; label: CardLabel }) =>
      assignLabelToCard(boardId, cardId, label.id),
    onMutate: async ({ cardId, label }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousBoard = updateCardLabels(queryClient, boardId, cardId, (labels) =>
        labels.some((l) => l.id === label.id) ? labels : [...labels, label],
      );
      return { previousBoard };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousBoard) queryClient.setQueryData(queryKey, context.previousBoard);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

export function useRemoveCardLabel(boardId: string) {
  const queryClient = useQueryClient();
  const queryKey = ["boards", boardId];

  return useMutation({
    mutationFn: ({ cardId, labelId }: { cardId: string; labelId: string }) =>
      removeLabelFromCard(boardId, cardId, labelId),
    onMutate: async ({ cardId, labelId }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousBoard = updateCardLabels(queryClient, boardId, cardId, (labels) =>
        labels.filter((label) => label.id !== labelId),
      );
      return { previousBoard };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousBoard) queryClient.setQueryData(queryKey, context.previousBoard);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
