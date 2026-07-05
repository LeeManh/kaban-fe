import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EmptyBoardsState({ onCreateBoard }: { onCreateBoard: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-md border border-slate-200 bg-white px-6 py-12 text-center shadow-xs">
      <div className="mb-4.5 flex gap-2">
        <div className="h-15 w-12 rotate-[-7deg] rounded-md bg-linear-to-br from-blue-200 to-blue-300 shadow-[0_4px_10px_--theme(--color-primary/18%)]" />
        <div className="mt-1.5 h-15 w-12 rounded-md bg-linear-to-br from-violet-200 to-violet-300 shadow-[0_4px_10px_--theme(--color-violet-600/16%)]" />
        <div className="h-15 w-12 rotate-[7deg] rounded-md bg-linear-to-br from-green-200 to-green-300 shadow-[0_4px_10px_--theme(--color-green-600/16%)]" />
      </div>
      <div className="mb-1.5 text-[17px] font-bold tracking-[-0.01em] text-slate-900">
        No boards yet
      </div>
      <div className="mb-5 max-w-85 text-[13.5px] leading-[1.55] text-slate-500">
        Boards keep your projects, tasks, and teammates organized in one place. Create your first
        one to get started.
      </div>
      <Button
        onClick={onCreateBoard}
        className="gap-1.75 rounded-md shadow-[0_1px_2px_--theme(--color-primary/30%)]"
      >
        <Plus className="size-4" strokeWidth={2.4} />
        Create your first board
      </Button>
    </div>
  );
}
