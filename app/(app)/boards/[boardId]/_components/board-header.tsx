"use client";

import { Ellipsis, ListFilter, Plus, Share2, Star } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { BoardDetail } from "@/lib/api/boards";
import { getInitials } from "@/lib/utils";

import { useToggleBoardStar } from "../../_hooks/use-toggle-board-star";
import { BoardAddMembersDialog } from "./board-add-members-dialog";
import { BoardTitle } from "./board-title";

export function BoardHeader({ board }: { board: BoardDetail }) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const toggleStar = useToggleBoardStar();

  return (
    <div className="flex h-14 flex-none items-center gap-1.5 bg-black/10 px-4">
      <BoardTitle boardId={board.id} name={board.name} />

      <div className="flex-1" />
      <AvatarGroup>
        {board.members.map((member) => {
          return (
            <div key={member.id} className="relative">
              <Avatar key={member.id} className="size-5.5 ring-2 ring-white">
                <AvatarFallback className="bg-violet-500 text-[9px] font-bold text-white">
                  {getInitials(member)}
                </AvatarFallback>
              </Avatar>
            </div>
          );
        })}
      </AvatarGroup>

      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              aria-label="Add members"
              onClick={() => setIsShareOpen(true)}
              className="flex size-6.5 items-center justify-center rounded-full border border-white/60 text-white hover:bg-white/15"
            />
          }
        >
          <Plus className="size-3.75" />
        </TooltipTrigger>
        <TooltipContent side="bottom" showArrow={false}>
          Add members
        </TooltipContent>
      </Tooltip>

      <div className="mx-1 h-5 w-px bg-white/25" />

      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              aria-label="Filter"
              className="flex size-8 items-center justify-center rounded-md text-white hover:bg-white/15"
            />
          }
        >
          <ListFilter className="size-4" />
        </TooltipTrigger>
        <TooltipContent side="bottom" showArrow={false}>
          Filter
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              aria-label={board.isStarred ? "Unstar board" : "Star board"}
              onClick={() => toggleStar.mutate({ boardId: board.id, isStarred: board.isStarred })}
              className="flex size-8 cursor-pointer items-center justify-center rounded-md text-white hover:bg-white/15"
            />
          }
        >
          <Star className="size-4" fill={board.isStarred ? "currentColor" : "none"} />
        </TooltipTrigger>
        <TooltipContent side="bottom" showArrow={false}>
          {board.isStarred ? "Unstar board" : "Star board"}
        </TooltipContent>
      </Tooltip>

      <Button
        size="sm"
        variant="secondary"
        className="gap-1.5 bg-white/90 text-slate-900 hover:bg-white"
      >
        <Share2 className="size-3.75" />
        Share
      </Button>

      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              aria-label="More options"
              className="flex size-8 items-center justify-center rounded-md text-white hover:bg-white/15"
            />
          }
        >
          <Ellipsis className="size-4" />
        </TooltipTrigger>
        <TooltipContent side="bottom" showArrow={false}>
          More options
        </TooltipContent>
      </Tooltip>

      <BoardAddMembersDialog
        open={isShareOpen}
        onOpenChange={setIsShareOpen}
        boardId={board.id}
      />
    </div>
  );
}
