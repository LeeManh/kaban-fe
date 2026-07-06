import {
  CircleCheckBig,
  MessageSquare,
  Paperclip,
  SquareCheckBig,
  TextAlignStart,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export interface MockCard {
  id: string;
  title: string;
  done?: boolean;
  hasDescription?: boolean;
  checklist?: { completed: number; total: number };
  comments?: number;
  attachments?: number;
  assignees?: string[];
}

export function BoardCardItem({ card }: { card: MockCard }) {
  const hasMeta = card.hasDescription || card.checklist || card.comments || card.attachments;

  return (
    <div
      role="button"
      tabIndex={0}
      className="cursor-pointer rounded-md bg-white p-2.5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
    >
      <p className="text-[13.5px] leading-snug text-slate-800 flex gap-2 items-center">
        {card.done && <CircleCheckBig className="size-4 text-emerald-600" />}
        <span>{card.title}</span>
      </p>

      {(hasMeta || card.assignees?.length) && (
        <div className="mt-2 flex items-center gap-2.5 text-slate-500">
          {card.hasDescription && <TextAlignStart className="size-3.75" />}
          {card.checklist && (
            <span className="flex items-center gap-1 text-xs font-medium">
              <SquareCheckBig className="size-3.75" />
              {card.checklist.completed}/{card.checklist.total}
            </span>
          )}
          {!!card.comments && (
            <span className="flex items-center gap-1 text-xs font-medium">
              <MessageSquare className="size-3.75" />
              {card.comments}
            </span>
          )}
          {!!card.attachments && (
            <span className="flex items-center gap-1 text-xs font-medium">
              <Paperclip className="size-3.75" />
              {card.attachments}
            </span>
          )}

          {!!card.assignees?.length && (
            <div className="ml-auto flex -space-x-1.5">
              {card.assignees.map((initials) => (
                <Avatar key={initials} className="size-5.5 ring-2 ring-white">
                  <AvatarFallback className="bg-violet-500 text-[9px] font-bold text-white">
                    {initials}
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
