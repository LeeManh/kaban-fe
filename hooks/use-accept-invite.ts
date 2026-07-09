"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { acceptInvite } from "@/lib/api/invites";

export function useAcceptInvite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => acceptInvite(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
