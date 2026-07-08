"use client";

import { Link2, MessageSquare } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CardComment } from "@/lib/api/cards";
import { formatTimeAgo, getInitials } from "@/lib/utils";

export function CardComments({
  comments,
  commentText,
  onCommentTextChange,
}: {
  comments: CardComment[];
  commentText: string;
  onCommentTextChange: (value: string) => void;
}) {
  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <MessageSquare className="size-4" />
          Comments and activity
        </div>
        <Button variant="outline" size="sm" className="cursor-pointer">
          Show details
        </Button>
      </div>

      <Input
        value={commentText}
        onChange={(e) => onCommentTextChange(e.target.value)}
        placeholder="Write a comment…"
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
              <div className="flex items-center gap-1.5 text-[13px]">
                <span className="font-semibold text-slate-800">
                  {comment.author.name ?? comment.author.email}
                </span>
                <span className="text-slate-500">{formatTimeAgo(comment.createdAt)}</span>
                <Link2 className="size-3 text-slate-400" />
              </div>
              <div className="mt-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-[13.5px] text-slate-700">
                {comment.content}
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs font-medium text-slate-500">
                <button type="button" className="cursor-pointer hover:underline">
                  Edit
                </button>
                <span>·</span>
                <button type="button" className="cursor-pointer hover:underline">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
