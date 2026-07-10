"use client";

import { Ellipsis, Share2, Star } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { BoardDetail } from "@/lib/api/boards";
import { getInitials } from "@/lib/utils";

import { useLabels } from "../_hooks/use-labels";
import { useToggleBoardStar } from "../../_hooks/use-toggle-board-star";
import type { BoardFilterState } from "../_lib/board-filter";
import { BoardFilterPopover } from "./board-filter-popover";
import { BoardShareDialog } from "./board-share-dialog";
import { BoardTitle } from "./board-title";

export function BoardHeader({
  board,
  filter,
  onFilterChange,
}: {
  board: BoardDetail;
  filter: BoardFilterState;
  onFilterChange: (next: BoardFilterState) => void;
}) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const toggleStar = useToggleBoardStar();
  const { data: labels = [] } = useLabels(board.id);

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

      <div className="mx-1 h-5 w-px bg-white/25" />

      <BoardFilterPopover
        filter={filter}
        onFilterChange={onFilterChange}
        members={board.members}
        labels={labels}
      />

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
        onClick={() => setIsShareOpen(true)}
        className="cursor-pointer gap-1.5 bg-white/90 text-slate-900 hover:bg-white"
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

      <BoardShareDialog open={isShareOpen} onOpenChange={setIsShareOpen} boardId={board.id} />
    </div>
  );
}
