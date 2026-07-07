"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addBoardMember, type AddBoardMemberPayload } from "@/lib/api/boards";

export function useAddBoardMember(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddBoardMemberPayload) => addBoardMember(boardId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
