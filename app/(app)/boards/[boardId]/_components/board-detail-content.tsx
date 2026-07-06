"use client";

import { useEffect } from "react";

import { useBoardChrome } from "@/app/(app)/_context/app-shell";

import { useBoard } from "../_hooks/use-board";
import { BoardCanvas } from "./board-canvas";
import { BoardHeader } from "./board-header";

export function BoardDetailContent({ boardId }: { boardId: string }) {
  const { data: board, isLoading, isError } = useBoard(boardId);
  const { setBoardBackground } = useBoardChrome();

  useEffect(() => {
    setBoardBackground(board?.background ?? null);
    return () => setBoardBackground(null);
  }, [board?.background, setBoardBackground]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-slate-400">
        Loading board…
      </div>
    );
  }

  if (isError || !board) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-slate-400">
        Could not load board. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <BoardHeader board={board} />
      <BoardCanvas boardId={boardId} lists={board.lists} />
    </div>
  );
}
