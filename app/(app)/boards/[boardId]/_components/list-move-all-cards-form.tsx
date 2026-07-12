"use client";

import { toast } from "sonner";

import { PopoverSubHeader } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { useBoard } from "../_hooks/use-board";
import { useMoveAllCards } from "../_hooks/use-move-all-cards";

export function ListMoveAllCardsForm({
  open,
  boardId,
  listId,
  onBack,
  onDone,
}: {
  open: boolean;
  boardId: string;
  listId: string;
  onBack: () => void;
  onDone: () => void;
}) {
  const { data: board } = useBoard(boardId, { enabled: open });
  const moveAllCards = useMoveAllCards(boardId);
  const lists = board?.lists ?? [];

  function handleSelect(targetListId: string) {
    moveAllCards.mutate(
      { listId, payload: { targetListId } },
      {
        onSuccess: () => {
          toast.success("Cards moved.");
          onDone();
        },
      },
    );
  }

  return (
    <>
      <PopoverSubHeader title="Move all cards in list" onBack={onBack} />
      <div className="flex flex-col gap-0.5">
        {lists.map((list) => {
          const isCurrent = list.id === listId;
          return (
            <button
              key={list.id}
              type="button"
              disabled={isCurrent || moveAllCards.isPending}
              onClick={() => handleSelect(list.id)}
              className={cn(
                "flex w-full items-center rounded-md px-2 py-1.5 text-left text-[13.5px] font-medium",
                isCurrent
                  ? "cursor-not-allowed text-muted-foreground/60"
                  : "cursor-pointer text-foreground hover:bg-accent",
              )}
            >
              {list.title}
              {isCurrent && <span className="ml-1">(current)</span>}
            </button>
          );
        })}
      </div>
    </>
  );
}
