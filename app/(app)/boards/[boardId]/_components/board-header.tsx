"use client";

import { Share2, Star } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { AvatarGroup } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { UserAvatar } from "@/components/user-avatar";
import type { BoardDetail } from "@/lib/api/boards";
import { cn } from "@/lib/utils";

import { useLabels } from "../_hooks/use-labels";
import { useToggleBoardStar } from "../../_hooks/use-toggle-board-star";
import type { BoardFilterState } from "../_lib/board-filter";
import { BoardFilterPopover } from "./board-filter-popover";
import { BoardMoreOptionsMenu } from "./board-more-options-menu";
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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const shareTabParam = searchParams.get("share");
  const shareRequested = shareTabParam === "requests";
  const [isShareOpen, setIsShareOpen] = useState(shareRequested);
  const [wasShareRequested, setWasShareRequested] = useState(shareRequested);
  const openedAtRef = useRef(0);
  const toggleStar = useToggleBoardStar();
  const { data: labels = [] } = useLabels(board.id);

  if (shareRequested !== wasShareRequested) {
    setWasShareRequested(shareRequested);
    if (shareRequested) setIsShareOpen(true);
  }

  useEffect(() => {
    if (isShareOpen) openedAtRef.current = Date.now();
  }, [isShareOpen]);

  function handleShareOpenChange(open: boolean) {
    if (!open && Date.now() - openedAtRef.current < 400) return;
    setIsShareOpen(open);
    if (!open && shareTabParam) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("share");
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }
  }

  return (
    <div className="flex h-14 flex-none items-center gap-1.5 bg-black/30 px-4">
      <BoardTitle boardId={board.id} name={board.name} />

      <div className="flex-1" />
      <AvatarGroup>
        {board.members.map((member) => (
          <UserAvatar
            key={member.id}
            user={member}
            className="size-5.5 ring-2 ring-white"
            fallbackClassName="text-[9px]"
          />
        ))}
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
              className={cn(
                "flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-white/15",
                board.isStarred ? "text-yellow-400" : "text-white",
              )}
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

      <BoardMoreOptionsMenu board={board} onOpenShare={() => setIsShareOpen(true)} />

      <BoardShareDialog
        open={isShareOpen}
        onOpenChange={handleShareOpenChange}
        boardId={board.id}
        initialTab={shareTabParam === "requests" ? "requests" : undefined}
      />
    </div>
  );
}
