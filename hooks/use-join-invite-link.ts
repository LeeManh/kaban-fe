"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { joinInviteLink } from "@/lib/api/invite-links";

export function useJoinInviteLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => joinInviteLink(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
}
