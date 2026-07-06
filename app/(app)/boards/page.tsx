import { Sidebar } from "../_components/sidebar";
import { BoardsPageContent } from "./_components/boards-page-content";

export default function BoardsPage() {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <BoardsPageContent />
      </div>
    </div>
  );
}
