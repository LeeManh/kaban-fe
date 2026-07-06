import { BoardCanvas } from "./_components/board-canvas";
import { BoardHeader } from "./_components/board-header";

export default function BoardDetailPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <BoardHeader />
      <BoardCanvas />
    </div>
  );
}
