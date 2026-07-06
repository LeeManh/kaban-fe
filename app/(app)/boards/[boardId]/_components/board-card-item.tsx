"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  CircleCheckBig,
  MessageSquare,
  Paperclip,
  SquareCheckBig,
  TextAlignStart,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { CardSummary } from "@/lib/api/boards";
import { cn, getInitials } from "@/lib/utils";

function CardBody({ card }: { card: CardSummary }) {
  const hasDescription = !!card.description;
  const hasChecklist = card.checklistProgress.total > 0;
  const commentCount = card._count.comments;
  const attachmentCount = card._count.attachments;
  const hasMeta = hasDescription || hasChecklist || commentCount > 0 || attachmentCount > 0;

  return (
    <>
      <p className="flex items-center gap-2 text-[13.5px] leading-snug text-slate-800">
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
    </>
  );
}

export function BoardCardItem({ card }: { card: CardSummary }) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: { type: "card", listId: card.listId },
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className={cn(
        "rounded-md p-2.5 transition-shadow",
        isDragging
          ? "bg-slate-300/30"
          : "cursor-pointer bg-white shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
      )}
    >
      <div className={cn(isDragging && "invisible")}>
        <CardBody card={card} />
      </div>
    </div>
  );
}

export function BoardCardPreview({ card }: { card: CardSummary }) {
  return (
    <div className="cursor-grabbing rounded-md bg-white p-2.5 shadow-lg">
      <CardBody card={card} />
    </div>
  );
}
