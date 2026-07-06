import { Ellipsis } from "lucide-react";

import type { ListWithCards } from "@/lib/api/boards";

import { AddCardForm } from "./add-card-form";
import { BoardCardItem } from "./board-card-item";

export function BoardList({ list }: { list: ListWithCards }) {
  return (
    <div className="flex w-70 shrink-0 flex-col rounded-md bg-slate-100 p-2">
      <div className="mb-1 flex items-center gap-1.5 px-1.5 py-1">
        <span className="flex-1 truncate text-[13.5px] font-semibold text-slate-700">
          {list.title}
        </span>
        {list.cards.length > 0 && (
          <span className="text-xs font-medium text-slate-600">{list.cards.length}</span>
        )}
        <button
          type="button"
          aria-label="List actions"
          className="flex size-6 items-center justify-center rounded-md text-slate-500 hover:bg-slate-200"
        >
          <Ellipsis className="size-3.75" />
        </button>
      </div>

      <div className="flex flex-col gap-1.5 overflow-y-auto">
        {list.cards.map((card) => (
          <BoardCardItem key={card.id} card={card} />
        ))}
      </div>

      <AddCardForm boardId={list.boardId} listId={list.id} />
    </div>
  );
}
