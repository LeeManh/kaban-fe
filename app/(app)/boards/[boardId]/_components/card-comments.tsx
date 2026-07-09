"use client";

import { Link2, MessageSquare } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { CardComment } from "@/lib/api/cards";
import { getCurrentUserId } from "@/lib/api/tokens";
import { formatTimeAgo, getInitials } from "@/lib/utils";

import { useCreateComment } from "../_hooks/use-create-comment";
import { useDeleteComment } from "../_hooks/use-delete-comment";
import { useUpdateComment } from "../_hooks/use-update-comment";
import { CardCommentDeletePopover } from "./card-comment-delete-popover";
import { CardDescriptionViewer } from "./card-description-viewer";
import { MarkdownEditor } from "./markdown-editor";

export function CardComments({
  boardId,
  cardId,
  comments,
}: {
  boardId: string;
  cardId: string;
  comments: CardComment[];
}) {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [composeKey, setComposeKey] = useState(0);
  const currentUserId = getCurrentUserId();

  const createComment = useCreateComment(boardId, cardId);
  const updateComment = useUpdateComment(boardId);
  const deleteComment = useDeleteComment(boardId);

  function handleCreateComment(markdown: string) {
    createComment.mutate(
      { content: markdown },
      { onSuccess: () => setComposeKey((key) => key + 1) },
    );
  }

  function handleUpdateComment(commentId: string, markdown: string) {
    updateComment.mutate(
      { commentId, content: markdown },
      { onSuccess: () => setEditingCommentId(null) },
    );
  }

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <MessageSquare className="size-4" />
          Comments
        </div>
      </div>

      <MarkdownEditor
        key={composeKey}
        boardId={boardId}
        cardId={cardId}
        placeholder="Write a comment…"
        minHeightClassName="min-h-16"
        isSaving={createComment.isPending}
        onSave={handleCreateComment}
      />

      <div className="flex flex-col gap-3">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-2.5">
            <Avatar className="size-7 shrink-0">
              <AvatarFallback className="bg-amber-500 text-[11px] font-bold text-white">
                {getInitials(comment.author)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              {editingCommentId === comment.id ? (
                <MarkdownEditor
                  boardId={boardId}
                  cardId={cardId}
                  initialValue={comment.content}
                  placeholder="Write a comment…"
                  minHeightClassName="min-h-16"
                  autoFocus
                  isSaving={updateComment.isPending}
                  onSave={(markdown) => handleUpdateComment(comment.id, markdown)}
                  onCancel={() => setEditingCommentId(null)}
                />
              ) : (
                <>
                  <div className="flex items-center gap-1.5 text-[13px]">
                    <span className="font-semibold text-slate-800">
                      {comment.author.name ?? comment.author.email}
                    </span>
                    <span className="text-slate-500">{formatTimeAgo(comment.createdAt)}</span>
                    <Link2 className="size-3 text-slate-400" />
                  </div>
                  <div className="mt-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-[13.5px] text-slate-700">
                    <CardDescriptionViewer description={comment.content} expanded />
                  </div>
                  {comment.authorId === currentUserId && (
                    <div className="mt-1 flex items-center gap-2 text-xs font-medium text-slate-500">
                      <button
                        type="button"
                        className="cursor-pointer hover:underline"
                        onClick={() => setEditingCommentId(comment.id)}
                      >
                        Edit
                      </button>
                      <span>·</span>
                      <CardCommentDeletePopover
                        isDeleting={deleteComment.isPending}
                        onConfirm={() => deleteComment.mutate(comment.id)}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
