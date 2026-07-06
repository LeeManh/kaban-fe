import {
  CircleCheckBig,
  MessageSquare,
  Paperclip,
  SquareCheckBig,
  TextAlignStart,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { CardSummary } from "@/lib/api/boards";
import { getInitials } from "@/lib/utils";

export function BoardCardItem({ card }: { card: CardSummary }) {
  const hasDescription = !!card.description;
  const hasChecklist = card.checklistProgress.total > 0;
  const commentCount = card._count.comments;
  const attachmentCount = card._count.attachments;
  const hasMeta = hasDescription || hasChecklist || commentCount > 0 || attachmentCount > 0;

  return (
    <div
      role="button"
      tabIndex={0}
      className="cursor-pointer rounded-md bg-white p-2.5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
    >
      <p className="text-[13.5px] leading-snug text-slate-800 flex gap-2 items-center">
        {card.isDone && <CircleCheckBig className="size-4 text-emerald-600" />}
        <span>{card.title}</span>
      </p>

      {(hasMeta || card.assignees.length > 0) && (
        <div className="mt-2 flex items-center gap-2.5 text-slate-500">
          {hasDescription && <TextAlignStart className="size-3.75" />}
          {hasChecklist && (
            <span className="flex items-center gap-1 text-xs font-medium">
              <SquareCheckBig className="size-3.75" />
              {card.checklistProgress.done}/{card.checklistProgress.total}
            </span>
          )}
          {commentCount > 0 && (
            <span className="flex items-center gap-1 text-xs font-medium">
              <MessageSquare className="size-3.75" />
              {commentCount}
            </span>
          )}
          {attachmentCount > 0 && (
            <span className="flex items-center gap-1 text-xs font-medium">
              <Paperclip className="size-3.75" />
              {attachmentCount}
            </span>
          )}

          {card.assignees.length > 0 && (
            <div className="ml-auto flex -space-x-1.5">
              {card.assignees.map((assignee) => (
                <Avatar key={assignee.id} className="size-5.5 ring-2 ring-white">
                  <AvatarFallback className="bg-violet-500 text-[9px] font-bold text-white">
                    {getInitials(assignee)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
