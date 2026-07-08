"use client";

import { useMutation } from "@tanstack/react-query";

import { presignDescriptionImage, uploadDescriptionImageFile } from "@/lib/api/cards";

export function usePresignDescriptionImage(boardId: string, cardId: string) {
  return useMutation({
    mutationFn: async (file: File) => {
      const { uploadUrl, viewUrl } = await presignDescriptionImage(boardId, cardId, {
        filename: file.name,
        contentType: file.type,
        size: file.size,
      });
      await uploadDescriptionImageFile(uploadUrl, file);
      return viewUrl;
    },
  });
}
