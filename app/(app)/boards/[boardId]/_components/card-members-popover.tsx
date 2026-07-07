"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PopoverClose, PopoverTitle } from "@/components/ui/popover";
import type { CardAssignee } from "@/lib/api/boards";
import { getInitials } from "@/lib/utils";

import { useBoardMembers } from "../_hooks/use-board-members";
import { useAssignCardMember, useUnassignCardMember } from "../_hooks/use-card-members";

export function CardMembersPopoverContent({
  boardId,
  cardId,
  assignees,
}: {
  boardId: string;
  cardId: string;
  assignees: CardAssignee[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: boardMembers = [] } = useBoardMembers(boardId);
  const assignMember = useAssignCardMember(boardId);
  const unassignMember = useUnassignCardMember(boardId);

  const assigneeIds = new Set(assignees.map((assignee) => assignee.id));
  const otherMembers = boardMembers
    .map((member) => member.user)
    .filter((user) => !assigneeIds.has(user.id));

  const query = searchQuery.trim().toLowerCase();
  const filteredAssignees = assignees.filter((assignee) =>
    (assignee.name ?? assignee.email).toLowerCase().includes(query),
  );
  const filteredOtherMembers = otherMembers.filter((user) =>
    (user.name ?? user.email).toLowerCase().includes(query),
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <PopoverTitle className="mx-auto text-sm font-semibold text-slate-900">Members</PopoverTitle>
        <PopoverClose render={<Button variant="ghost" size="icon-xs" className="cursor-pointer" />}>
          <X className="size-3.5" />
          <span className="sr-only">Close</span>
        </PopoverClose>
      </div>

      <Input
        autoFocus
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search members"
      />

      {filteredAssignees.length > 0 && (
        <div>
          <div className="mb-1.5 text-xs font-semibold text-slate-700">Card members</div>
          <div className="flex flex-col gap-0.5">
            {filteredAssignees.map((assignee) => (
              <div
                key={assignee.id}
                className="flex items-center gap-2.5 rounded-md px-1.5 py-1 hover:bg-slate-100"
              >
                <Avatar className="size-7">
                  <AvatarFallback className="bg-violet-500 text-[11px] font-bold text-white">
                    {getInitials(assignee)}
                  </AvatarFallback>
                </Avatar>
                <span className="flex-1 text-[13.5px] text-slate-800">
                  {assignee.name ?? assignee.email}
                </span>
                <button
                  type="button"
                  aria-label="Remove member"
                  onClick={() => unassignMember.mutate({ cardId, userId: assignee.id })}
                  className="flex size-6 cursor-pointer items-center justify-center rounded-md text-slate-500 hover:bg-slate-200"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="mb-1.5 text-xs font-semibold text-slate-700">Board members</div>
        {filteredOtherMembers.length > 0 ? (
          <div className="flex flex-col gap-0.5">
            {filteredOtherMembers.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => assignMember.mutate({ cardId, userId: user.id })}
                className="flex cursor-pointer items-center gap-2.5 rounded-md px-1.5 py-1 text-left hover:bg-slate-100"
              >
                <Avatar className="size-7">
                  <AvatarFallback className="bg-violet-500 text-[11px] font-bold text-white">
                    {getInitials(user)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-[13.5px] text-slate-800">{user.name ?? user.email}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="px-1.5 py-1 text-[13px] text-slate-500">No results</p>
        )}
      </div>
    </div>
  );
}
