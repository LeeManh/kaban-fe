"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteList } from "@/lib/api/lists";

export function useDeleteList(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (listId: string) => deleteList(boardId, listId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
