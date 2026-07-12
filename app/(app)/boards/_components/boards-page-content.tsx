"use client";

import { Clock, SquareKanban } from "lucide-react";
import { useRouter } from "next/navigation";

import { BoardCard, CreateBoardCard } from "./board-card";
import { BoardCardSkeleton } from "./board-card-skeleton";
import { EmptyBoardsState } from "./empty-boards-state";
import { useBoards } from "../_hooks/use-boards";
import { useRecentlyViewedBoards } from "../_hooks/use-recently-viewed-boards";
import { useToggleBoardStar } from "../_hooks/use-toggle-board-star";

function SectionHeading({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon className="size-4 text-muted-foreground" />
      <span className="text-[13px] font-bold tracking-[0.04em] text-muted-foreground uppercase">
        {title}
      </span>
    </div>
  );
}

export function BoardsPageContent() {
  const router = useRouter();
  const { data: boards = [], isLoading, isError } = useBoards();
  const { data: recentlyViewed = [] } = useRecentlyViewedBoards();
  const toggleStar = useToggleBoardStar();

  function handleToggleFavorite(boardId: string, isStarred: boolean) {
    toggleStar.mutate({ boardId, isStarred });
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden pt-4">
      <main className="flex-1 overflow-y-auto px-8 py-6.5">
        <div className="mx-auto max-w-4xl">
          {recentlyViewed.length > 0 && (
            <div className="mb-8">
              <SectionHeading icon={Clock} title="Recently viewed" />
              <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
                {recentlyViewed.map(({ board }) => (
                  <BoardCard
                    key={board.id}
                    title={board.name}
                    background={board.background}
                    favorite={board.isStarred}
                    onOpen={() => router.push(`/boards/${board.id}`)}
                    onToggleFavorite={() => handleToggleFavorite(board.id, board.isStarred)}
                  />
                ))}
              </div>
            </div>
          )}

          <SectionHeading icon={SquareKanban} title="Your Boards" />

          {isLoading ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <BoardCardSkeleton key={index} />
              ))}
            </div>
          ) : isError ? (
            <div className="py-16 text-center text-sm text-muted-foreground">
              Could not load boards. Please try again.
            </div>
          ) : boards.length === 0 ? (
            <EmptyBoardsState />
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
              {boards.map((board) => (
                <BoardCard
                  key={board.id}
                  title={board.name}
                  background={board.background}
                  favorite={board.isStarred}
                  onOpen={() => router.push(`/boards/${board.id}`)}
                  onToggleFavorite={() => handleToggleFavorite(board.id, board.isStarred)}
                />
              ))}
              <CreateBoardCard />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
