"use client";

import { Check } from "lucide-react";

export function CardTitle({
  title,
  isDone,
  onToggleDone,
}: {
  title: string;
  isDone: boolean;
  onToggleDone: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onToggleDone}
        aria-label={isDone ? "Mark incomplete" : "Mark complete"}
        className="flex size-4.5 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-slate-300 hover:border-emerald-500"
      >
        {isDone && <Check className="size-3 text-emerald-600" />}
      </button>
      <h2 className="text-xl leading-snug font-semibold text-slate-900">{title}</h2>
    </div>
  );
}
