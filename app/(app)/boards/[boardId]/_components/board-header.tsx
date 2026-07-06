import { Ellipsis, ListFilter, Plus, Share2, Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { BoardTitle } from "./board-title";

export function BoardHeader() {
  return (
    <div className="flex h-14 flex-none items-center gap-1.5 bg-linear-to-br from-amber-700 to-amber-600 px-4">
      <BoardTitle />

      <div className="flex-1" />
      <AvatarGroup>
        <Avatar className="size-6.5">
          <AvatarFallback className="bg-violet-500 text-[11px] font-bold text-white">
            CP
          </AvatarFallback>
        </Avatar>
        <Avatar className="size-6.5">
          <AvatarFallback className="bg-sky-500 text-[11px] font-bold text-white">
            PV
          </AvatarFallback>
        </Avatar>
      </AvatarGroup>

      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              aria-label="Invite members"
              className="flex size-7.5 items-center justify-center rounded-full border border-dashed border-white/60 text-white hover:bg-white/15"
            />
          }
        >
          <Plus className="size-3.75" />
        </TooltipTrigger>
        <TooltipContent side="bottom" showArrow={false}>
          Invite members
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
              aria-label="Favorite board"
              className="flex size-8 items-center justify-center rounded-md text-white hover:bg-white/15"
            />
          }
        >
          <Star className="size-4" />
        </TooltipTrigger>
        <TooltipContent side="bottom" showArrow={false}>
          Favorite board
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
    </div>
  );
}
