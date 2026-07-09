"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { presignAttachment, uploadAttachmentFile } from "@/lib/api/attachments";

interface PresignAttachmentVars {
  file: File;
  displayName?: string;
}

export function usePresignAttachment(boardId: string, cardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, displayName }: PresignAttachmentVars) => {
      const { uploadUrl } = await presignAttachment(boardId, cardId, {
        filename: displayName?.trim() || file.name,
        contentType: file.type,
        size: file.size,
      });
      await uploadAttachmentFile(uploadUrl, file);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
