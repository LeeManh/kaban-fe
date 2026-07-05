"use client";

import { SquareKanban } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { BoardTile, CreateBoardTile, type BoardTileAvatar } from "./board-tile";
import { BoardsTopbar } from "./boards-topbar";
import { CreateBoardDialog, type CreateBoardResult } from "./create-board-dialog";
import { EmptyBoardsState } from "./empty-boards-state";

interface BoardItem {
  id: string;
  title: string;
  background: string;
  favorite: boolean;
  avatars: BoardTileAvatar[];
}

const INITIAL_BOARDS: BoardItem[] = [
  {
    id: "product-roadmap",
    title: "Product Roadmap",
    background: "linear-gradient(135deg, #2563eb, #3b82f6)",
    favorite: true,
    avatars: [
      { initials: "JD", color: "#579dff" },
      { initials: "ML", color: "#22c55e" },
    ],
  },
  {
    id: "marketing-site",
    title: "Marketing Site",
    background: "linear-gradient(135deg, #16a34a, #22c55e)",
    favorite: false,
    avatars: [
      { initials: "SO", color: "#f97316" },
      { initials: "PN", color: "#ec4899" },
    ],
  },
  {
    id: "mobile-app-v2",
    title: "Mobile App v2",
    background: "linear-gradient(135deg, #ea580c, #f97316)",
    favorite: false,
    avatars: [
      { initials: "JD", color: "#579dff" },
      { initials: "ML", color: "#22c55e" },
      { initials: "SO", color: "#8b5cf6" },
    ],
  },
  {
    id: "design-system",
    title: "Design System",
    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
    favorite: true,
    avatars: [{ initials: "AR", color: "#8b5cf6" }],
  },
  {
    id: "q3-campaigns",
    title: "Q3 Campaigns",
    background: "linear-gradient(135deg, #0d9488, #14b8a6)",
    favorite: false,
    avatars: [
      { initials: "ML", color: "#22c55e" },
      { initials: "PN", color: "#ec4899" },
    ],
  },
  {
    id: "research-hub",
    title: "Research Hub",
    background: "linear-gradient(135deg, #db2777, #ec4899)",
    favorite: false,
    avatars: [{ initials: "JD", color: "#579dff" }],
  },
];

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function BoardsPageContent() {
  const router = useRouter();
  const [boards, setBoards] = useState<BoardItem[]>(INITIAL_BOARDS);
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const filteredBoards = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return boards;
    return boards.filter((board) => board.title.toLowerCase().includes(query));
  }, [boards, searchQuery]);

  function handleCreateBoard({ name, background }: CreateBoardResult) {
    setBoards((prev) => [
      ...prev,
      {
        id: `${slugify(name)}-${Date.now()}`,
        title: name,
        background,
        favorite: false,
        avatars: [],
      },
    ]);
  }

  function handleToggleFavorite(id: string) {
    setBoards((prev) => prev.map((b) => (b.id === id ? { ...b, favorite: !b.favorite } : b)));
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

        {boards.length === 0 ? (
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
                title={board.title}
                background={board.background}
                avatars={board.avatars}
                favorite={board.favorite}
                onOpen={() => router.push(`/boards/${board.id}`)}
                onToggleFavorite={() => handleToggleFavorite(board.id)}
              />
            ))}
            <CreateBoardTile onClick={() => setCreateDialogOpen(true)} />
          </div>
        )}
      </main>

      <CreateBoardDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreate={handleCreateBoard}
      />
    </div>
  );
}
