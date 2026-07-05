"use client";

import { SquareKanban } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { BoardTile, CreateBoardTile } from "./board-tile";
import { BoardsTopbar } from "./boards-topbar";
import { CreateBoardDialog } from "./create-board-dialog";
import { EmptyBoardsState } from "./empty-boards-state";
import { useBoards } from "../_hooks/use-boards";
import { useToggleBoardStar } from "../_hooks/use-toggle-board-star";

export function BoardsPageContent() {
  const router = useRouter();
  const { data: boards = [], isLoading, isError } = useBoards();
  const toggleStar = useToggleBoardStar();
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const filteredBoards = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return boards;
    return boards.filter((board) => board.name.toLowerCase().includes(query));
  }, [boards, searchQuery]);

  function handleToggleFavorite(boardId: string, isStarred: boolean) {
    toggleStar.mutate({ boardId, isStarred });
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <BoardsTopbar
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onCreateBoard={() => setCreateDialogOpen(true)}
      />
      <main className="flex-1 overflow-y-auto px-8 py-6.5">
        <div className="mb-4 flex items-center gap-2">
          <SquareKanban className="size-4 text-slate-500" />
          <span className="text-[13px] font-bold tracking-[0.04em] text-slate-500 uppercase">
            Your Boards
          </span>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-sm text-slate-400">Loading boards…</div>
        ) : isError ? (
          <div className="py-16 text-center text-sm text-slate-400">
            Could not load boards. Please try again.
          </div>
        ) : boards.length === 0 ? (
          <EmptyBoardsState onCreateBoard={() => setCreateDialogOpen(true)} />
        ) : filteredBoards.length === 0 ? (
          <div className="py-16 text-center text-sm text-slate-400">
            No boards match &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(236px,1fr))] gap-4">
            {filteredBoards.map((board) => (
              <BoardTile
                key={board.id}
                title={board.name}
                background={board.background}
                favorite={board.isStarred}
                onOpen={() => router.push(`/boards/${board.id}`)}
                onToggleFavorite={() => handleToggleFavorite(board.id, board.isStarred)}
              />
            ))}
            <CreateBoardTile onClick={() => setCreateDialogOpen(true)} />
          </div>
        )}
      </main>

      <CreateBoardDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  );
}
