"use client";

import { UserPlus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { CardAssignee } from "@/lib/api/boards";
import { getInitials } from "@/lib/utils";

import { useUnassignCardMember } from "../_hooks/use-card-members";
import { CardMemberPopoverContent } from "./card-member-popover";
import { CardMembersPopoverContent } from "./card-members-popover";

export function CardMembers({
  boardId,
  cardId,
  assignees,
}: {
  boardId: string;
  cardId: string;
  assignees: CardAssignee[];
}) {
  const unassignMember = useUnassignCardMember(boardId);

  return (
    <div>
      <div className="mb-1.5 text-xs font-semibold text-slate-500">Members</div>
      <div className="flex items-center gap-1">
        {assignees.map((assignee) => (
          <Popover key={assignee.id}>
            <PopoverTrigger render={<button type="button" className="cursor-pointer rounded-full" />}>
              <Avatar className="size-7">
                <AvatarFallback className="bg-violet-500 text-[11px] font-bold text-white">
                  {getInitials(assignee)}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-72 gap-0 overflow-hidden p-0">
              <CardMemberPopoverContent
                assignee={assignee}
                onRemove={() => unassignMember.mutate({ cardId, userId: assignee.id })}
              />
            </PopoverContent>
          </Popover>
        ))}
        <Popover>
          <PopoverTrigger
            nativeButton={false}
            render={
              <span
                aria-label="Add member"
                className="flex size-7 cursor-pointer items-center justify-center rounded-full border border-slate-300 text-slate-500 hover:bg-slate-100"
              />
            }
          >
            <UserPlus className="size-3.5" />
          </PopoverTrigger>
          <PopoverContent align="start" className="w-72 gap-2">
            <CardMembersPopoverContent boardId={boardId} cardId={cardId} assignees={assignees} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
