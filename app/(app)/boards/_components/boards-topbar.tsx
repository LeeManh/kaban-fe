import { Bell, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BoardsTopbarProps {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onCreateBoard: () => void;
}

export function BoardsTopbar({
  searchQuery,
  onSearchQueryChange,
  onCreateBoard,
}: BoardsTopbarProps) {
  return (
    <header className="flex h-14 flex-none items-center justify-between gap-3.5 border-b border-slate-200 bg-white px-5.5">
      <span className="shrink-0 text-lg font-bold tracking-[-0.02em]">Boards</span>

      <div className="flex flex-1 items-center gap-2.5 justify-center">
        <div className="relative flex-1 max-w-96">
          <Search className="absolute top-1/2 left-2.75 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Search boards…"
            aria-label="Search boards"
            className="h-9 w-full rounded-[9px] bg-slate-50 pl-8.5"
          />
        </div>
        <Button
          size="lg"
          onClick={onCreateBoard}
          className="shrink-0 gap-1.75 rounded-[9px] shadow-[0_1px_2px_--theme(--color-primary/30%)]"
        >
          Create
        </Button>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <button
          type="button"
          aria-label="Notifications"
          className="flex size-9 items-center justify-center rounded-[9px] text-slate-600 hover:bg-slate-100"
        >
          <Bell className="size-4.25" />
        </button>
        <Avatar className="size-8">
          <AvatarFallback className="bg-violet-500 text-xs font-bold text-white">AR</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
