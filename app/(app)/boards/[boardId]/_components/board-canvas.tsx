import { Plus } from "lucide-react";

import type { ListWithCards } from "@/lib/api/boards";

import { BoardList } from "./board-list";

export function BoardCanvas({ lists }: { lists: ListWithCards[] }) {
  return (
    <div className="flex flex-1 items-start gap-3 overflow-x-auto p-3">
      {lists.map((list) => (
        <BoardList key={list.id} list={list} />
      ))}

      <button
        type="button"
        className="flex w-70 shrink-0 items-center gap-1.5 rounded-md bg-white/15 px-3 py-2 text-[13.5px] font-medium text-white hover:bg-white/25"
      >
        <Plus className="size-4" />
        Add another list
      </button>
    </div>
  );
}
