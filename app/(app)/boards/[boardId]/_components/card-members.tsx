"use client";

import { UserPlus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { CardAssignee } from "@/lib/api/boards";
import { getInitials } from "@/lib/utils";

export function CardMembers({ assignees }: { assignees: CardAssignee[] }) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-semibold text-slate-500">Members</div>
      <div className="flex items-center gap-1">
        {assignees.map((assignee) => (
          <Avatar key={assignee.id} className="size-7">
            <AvatarFallback className="bg-violet-500 text-[11px] font-bold text-white">
              {getInitials(assignee)}
            </AvatarFallback>
          </Avatar>
        ))}
        <button
          type="button"
          aria-label="Add member"
          className="flex size-7 cursor-pointer items-center justify-center rounded-full border border-dashed border-slate-300 text-slate-500 hover:bg-slate-100"
        >
          <UserPlus className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
