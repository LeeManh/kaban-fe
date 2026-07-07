"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateList, type UpdateListPayload } from "@/lib/api/lists";

interface UpdateListVars extends UpdateListPayload {
  listId: string;
}

export function useUpdateList(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ listId, ...payload }: UpdateListVars) => updateList(boardId, listId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
