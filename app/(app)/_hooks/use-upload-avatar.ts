"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { presignAvatar, updateProfile, uploadAvatarFile, type CurrentUser } from "@/lib/api/users";

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const { key, uploadUrl } = await presignAvatar({
        filename: file.name,
        contentType: file.type,
        size: file.size,
      });
      await uploadAvatarFile(uploadUrl, file);
      return updateProfile({ avatar: key });
    },
    onSuccess: (data) => {
      queryClient.setQueryData<CurrentUser>(["users", "me"], data);
    },
  });
}
