"use client";

import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Ellipsis } from "lucide-react";

import type { ListWithCards } from "@/lib/api/boards";
import { cn } from "@/lib/utils";

import { AddCardForm } from "./add-card-form";
import { BoardCardItem } from "./board-card-item";
import { ListTitle } from "./list-title";

export function BoardList({ list }: { list: ListWithCards }) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: list.id,
    data: { type: "list" },
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "flex w-70 shrink-0 flex-col rounded-md p-2",
        isDragging ? "bg-slate-300/20" : "bg-slate-100",
      )}
    >
      <div className={cn("flex flex-1 flex-col", isDragging && "invisible")}>
        <div
          {...attributes}
          {...listeners}
          className="mb-1 flex cursor-grab items-center gap-1.5 px-1.5 py-1 active:cursor-grabbing"
        >
          <ListTitle boardId={list.boardId} listId={list.id} title={list.title} />
          {list.cards.length > 0 && (
            <span className="text-xs font-medium text-slate-600">{list.cards.length}</span>
          )}
          <button
            type="button"
            aria-label="List actions"
            onPointerDown={(e) => e.stopPropagation()}
            className="flex size-6 items-center justify-center rounded-md text-slate-500 hover:bg-slate-200"
          >
            <Ellipsis className="size-3.75" />
          </button>
        </div>

        <div className="flex flex-col gap-1.5 overflow-y-auto">
          <SortableContext
            items={list.cards.map((card) => card.id)}
            strategy={verticalListSortingStrategy}
          >
            {list.cards.map((card) => (
              <BoardCardItem key={card.id} boardId={list.boardId} card={card} />
            ))}
          </SortableContext>
        </div>

        <AddCardForm boardId={list.boardId} listId={list.id} />
      </div>
    </div>
  );
}
