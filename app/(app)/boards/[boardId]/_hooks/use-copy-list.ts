"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { copyList, type CopyListPayload } from "@/lib/api/lists";

export function useCopyList(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ listId, payload }: { listId: string; payload: CopyListPayload }) =>
      copyList(boardId, listId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
