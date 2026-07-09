"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { renameAttachment } from "@/lib/api/attachments";

interface RenameAttachmentVars {
  attachmentId: string;
  filename: string;
}

export function useRenameAttachment(boardId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ attachmentId, filename }: RenameAttachmentVars) =>
      renameAttachment(boardId, attachmentId, filename),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards", boardId] });
    },
  });
}
