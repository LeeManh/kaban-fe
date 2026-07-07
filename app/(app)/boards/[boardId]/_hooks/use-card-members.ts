"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { assignCardMember, unassignCardMember } from "@/lib/api/cards";

export function useAssignCardMember(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, userId }: { cardId: string; userId: string }) =>
      assignCardMember(boardId, cardId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}

export function useUnassignCardMember(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cardId, userId }: { cardId: string; userId: string }) =>
      unassignCardMember(boardId, cardId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
