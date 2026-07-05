"use client";

import { Bell, Search } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="flex h-14 flex-none items-center gap-3.5 border-b border-slate-200 bg-white px-3.5">
      <Logo className="shrink-0" />

      <div className="flex flex-1 items-center justify-center gap-2.5">
        <div className="relative max-w-2xl flex-1">
          <Search className="absolute top-1/2 left-2.75 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search boards…"
            aria-label="Search boards"
            className="w-full bg-slate-50 pl-8.5 h-9"
          />
        </div>
        <Button
          size="lg"
          className="shrink-0 gap-1.75 shadow-[0_1px_2px_--theme(--color-primary/30%)]"
        >
          Create
        </Button>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <button
          type="button"
          aria-label="Notifications"
          className="flex size-9 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100"
        >
          <Bell className="size-4.25" />
        </button>
        <Avatar className="size-7">
          <AvatarFallback className="bg-violet-500 text-xs font-bold text-white">AR</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
