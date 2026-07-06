"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createList, type CreateListPayload } from "@/lib/api/lists";

export function useCreateList(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateListPayload) => createList(boardId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
