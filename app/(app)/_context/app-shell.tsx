"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import { cn, toBackgroundStyle } from "@/lib/utils";

interface BoardChromeContextValue {
  background: string | null;
  setBoardBackground: (background: string | null) => void;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
}

const BoardChromeContext = createContext<BoardChromeContextValue | null>(null);

export function useBoardChrome() {
  const ctx = useContext(BoardChromeContext);
  if (!ctx) throw new Error("useBoardChrome must be used within AppShell");
  return ctx;
}

export function AppShell({ children }: { children: ReactNode }) {
  const [background, setBoardBackground] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <BoardChromeContext.Provider
      value={{ background, setBoardBackground, isMobileNavOpen, setIsMobileNavOpen }}
    >
      <div
        style={background ? { background: toBackgroundStyle(background) } : undefined}
        className={cn(
          "flex h-screen w-full flex-col overflow-hidden",
          background ? "bg-cover bg-center" : "bg-background",
        )}
      >
        {children}
      </div>
    </BoardChromeContext.Provider>
  );
}
