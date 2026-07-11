"use client";

import { useEffect, useMemo, useState } from "react";

import { useBoardChrome } from "@/app/(app)/_context/app-shell";
import { getCurrentUserId } from "@/lib/api/tokens";

import { useBoard } from "../_hooks/use-board";
import { useBoardRoom } from "../_hooks/use-board-room";
import { EMPTY_BOARD_FILTER, matchesBoardFilter, type BoardFilterState } from "../_lib/board-filter";
import { BoardCanvas } from "./board-canvas";
import { BoardHeader } from "./board-header";

export function BoardDetailContent({ boardId }: { boardId: string }) {
  const { data: board, isLoading, isError } = useBoard(boardId);
  const { setBoardBackground } = useBoardChrome();
  const [filter, setFilter] = useState<BoardFilterState>(EMPTY_BOARD_FILTER);
  const currentUserId = getCurrentUserId();

  useBoardRoom(boardId);

  useEffect(() => {
    setBoardBackground(board?.background ?? null);
    return () => setBoardBackground(null);
  }, [board?.background, setBoardBackground]);

  const filteredLists = useMemo(() => {
    if (!board) return [];
    return board.lists.map((list) => ({
      ...list,
      cards: list.cards.filter((card) => matchesBoardFilter(card, filter, currentUserId)),
    }));
  }, [board, filter, currentUserId]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
        Loading board…
      </div>
    );
  }

  if (isError || !board) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
        Could not load board. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <BoardHeader board={board} filter={filter} onFilterChange={setFilter} />
      <BoardCanvas boardId={boardId} lists={filteredLists} />
    </div>
  );
}
