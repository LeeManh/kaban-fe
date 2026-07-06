import { Ellipsis, Plus } from "lucide-react";

import { BoardCardItem, type MockCard } from "./board-card-item";

export interface MockList {
  id: string;
  title: string;
  cards: MockCard[];
}

export function BoardList({ list }: { list: MockList }) {
  return (
    <div className="flex w-70 shrink-0 flex-col rounded-md bg-slate-100 p-2">
      <div className="mb-1 flex items-center gap-1.5 px-1.5 py-1">
        <span className="flex-1 truncate text-[13.5px] font-semibold text-slate-700">
          {list.title}
        </span>
        <span className="text-xs font-medium text-slate-400">{list.cards.length}</span>
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

      <button
        type="button"
        className="mt-1.5 flex items-center gap-1.5 rounded-md px-1.5 py-1.5 text-left text-[13px] font-medium text-slate-500 hover:bg-slate-200"
      >
        <Plus className="size-3.75" />
        Add a card
      </button>
    </div>
  );
}
