"use client";

import { ChevronDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { CardAssignee } from "@/lib/api/boards";
import { toBackgroundStyle } from "@/lib/utils";

import { CardCoverPopover } from "./card-cover-popover";
import { CardMoreOptionsMenu } from "./card-more-options-menu";

function CardBannerActions({
  boardId,
  cardId,
  assignees,
  overlay,
}: {
  boardId: string;
  cardId: string;
  assignees: CardAssignee[];
  overlay: boolean;
}) {
  const buttonClassName = overlay
    ? "cursor-pointer rounded-full bg-white/90 text-slate-800 hover:bg-white"
    : "cursor-pointer rounded-full";

  return (
    <>
      <CardMoreOptionsMenu
        boardId={boardId}
        cardId={cardId}
        assignees={assignees}
        buttonClassName={buttonClassName}
      />
      <Tooltip>
        <TooltipTrigger
          render={
            <DialogClose
              render={
                <Button
                  variant="secondary"
                  size="icon-sm"
                  aria-label="Close"
                  className={buttonClassName}
                />
              }
            >
              <X className="size-4" />
            </DialogClose>
          }
        />
        <TooltipContent side="bottom" showArrow={false}>
          Close
        </TooltipContent>
      </Tooltip>
    </>
  );
}

export function CardCoverBanner({
  boardId,
  cardId,
  assignees,
  listTitle,
  cover,
  onCoverChange,
  onRemoveCover,
}: {
  boardId: string;
  cardId: string;
  assignees: CardAssignee[];
  listTitle: string;
  cover: string | null;
  onCoverChange: (value: string) => void;
  onRemoveCover: () => void;
}) {
  if (!cover) {
    return (
      <div className="flex items-center justify-between gap-3 p-3">
        <Button variant="secondary" size="sm" className="cursor-pointer gap-1 text-foreground">
          {listTitle}
          <ChevronDown className="size-3.5" />
        </Button>

        <div className="flex items-center gap-1.5">
          <CardCoverPopover value="" onChange={onCoverChange} />
          <CardBannerActions
            boardId={boardId}
            cardId={cardId}
            assignees={assignees}
            overlay={false}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ background: toBackgroundStyle(cover) }}
      className="group relative h-40 shrink-0 bg-cover bg-center"
    >
      <Button
        variant="secondary"
        size="sm"
        className="absolute top-3 left-3 cursor-pointer gap-1 bg-white/90 text-slate-800 hover:bg-white"
      >
        {listTitle}
        <ChevronDown className="size-3.5" />
      </Button>

      <Button
        variant="secondary"
        size="sm"
        onClick={onRemoveCover}
        className="absolute right-3 bottom-3 cursor-pointer bg-white/90 text-slate-800 opacity-0 pointer-events-none transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 hover:bg-white"
      >
        Remove cover
      </Button>

      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <CardCoverPopover value={cover} onChange={onCoverChange} />
        <CardBannerActions boardId={boardId} cardId={cardId} assignees={assignees} overlay />
      </div>
    </div>
  );
}
