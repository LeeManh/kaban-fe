"use client";

import { SquareKanban } from "lucide-react";
import { useRouter } from "next/navigation";

import { BoardTile, CreateBoardTile } from "./board-tile";
import { EmptyBoardsState } from "./empty-boards-state";
import { useBoards } from "../_hooks/use-boards";
import { useToggleBoardStar } from "../_hooks/use-toggle-board-star";

export function BoardsPageContent() {
  const router = useRouter();
  const { data: boards = [], isLoading, isError } = useBoards();
  const toggleStar = useToggleBoardStar();

  function handleToggleFavorite(boardId: string, isStarred: boolean) {
    toggleStar.mutate({ boardId, isStarred });
  }

  function handleCreateBoard() {}

  return (
    <div className="flex flex-1 flex-col overflow-hidden pt-4">
      <main className="flex-1 overflow-y-auto px-8 py-6.5">
        <div className="mx-auto max-w-4xl">
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
            <EmptyBoardsState onCreateBoard={handleCreateBoard} />
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
              {boards.map((board) => (
                <BoardTile
                  key={board.id}
                  title={board.name}
                  background={board.background}
                  favorite={board.isStarred}
                  onOpen={() => router.push(`/boards/${board.id}`)}
                  onToggleFavorite={() => handleToggleFavorite(board.id, board.isStarred)}
                />
              ))}
              <CreateBoardTile onClick={handleCreateBoard} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
