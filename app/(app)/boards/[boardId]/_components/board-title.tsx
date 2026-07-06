"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";

export function BoardTitle({ name: initialName }: { name: string }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(initialName);

  if (isEditingName) {
    return (
      <Input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onFocus={(e) => e.currentTarget.select()}
        onBlur={() => setIsEditingName(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Escape") e.currentTarget.blur();
        }}
        className="mr-1 h-8 min-w-24 max-w-90 rounded-sm border-none bg-white/20 px-2 py-1 text-base font-bold text-white placeholder:text-white/70 focus-visible:ring-0 field-sizing-content md:text-base"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsEditingName(true)}
      className="mr-1 flex items-center rounded-sm py-1 px-2 text-base font-bold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.25)] hover:bg-white/15 h-8"
    >
      {name}
    </button>
  );
}
