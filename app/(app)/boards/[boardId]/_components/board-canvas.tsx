import type { ListWithCards } from "@/lib/api/boards";

import { AddListForm } from "./add-list-form";
import { BoardList } from "./board-list";

export function BoardCanvas({ boardId, lists }: { boardId: string; lists: ListWithCards[] }) {
  return (
    <div className="flex flex-1 items-start gap-3 overflow-x-auto p-3">
      {lists.map((list) => (
        <BoardList key={list.id} list={list} />
      ))}

      <AddListForm boardId={boardId} />
    </div>
  );
}
