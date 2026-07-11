"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProfile, type CurrentUser, type UpdateProfilePayload } from "@/lib/api/users";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    meta: { skipErrorToast: true },
    onSuccess: (data) => {
      queryClient.setQueryData<CurrentUser>(["users", "me"], data);
    },
  });
}
