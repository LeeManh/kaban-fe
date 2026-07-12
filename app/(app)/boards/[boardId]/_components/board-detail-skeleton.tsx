import { BoardHeaderSkeleton } from "./board-header-skeleton";
import { BoardListSkeleton } from "./board-list-skeleton";

const LISTS = [
  [44, 64, 44],
  [64, 44],
  [44, 44, 64, 44],
  [64, 44],
  [44, 44, 64, 44],
];

export function BoardDetailSkeleton() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <BoardHeaderSkeleton />
      <div className="flex flex-1 items-start gap-3 overflow-hidden p-3">
        {LISTS.map((cardHeights, index) => (
          <BoardListSkeleton key={index} cardHeights={cardHeights} />
        ))}
      </div>
    </div>
  );
}
