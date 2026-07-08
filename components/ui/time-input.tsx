"use client";

import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const date = new Date(2000, 0, 1, Math.floor(i / 2), i % 2 === 0 ? 0 : 30);
  return date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
});

function normalizeTimeInput(raw: string, fallbackMeridiem: "AM" | "PM") {
  const match = raw.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
  if (!match) return null;

  const hour = parseInt(match[1], 10);
  if (hour < 1 || hour > 12) return null;

  const minute = match[2] ? parseInt(match[2], 10) : 0;
  if (minute < 0 || minute > 59) return null;

  const meridiem = match[3] ? (match[3].toUpperCase() as "AM" | "PM") : fallbackMeridiem;
  return `${hour}:${minute.toString().padStart(2, "0")} ${meridiem}`;
}

function TimeInput({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const lastMeridiemRef = useRef<"AM" | "PM">(value.toUpperCase().includes("PM") ? "PM" : "AM");

  function commit(raw: string) {
    const normalized = normalizeTimeInput(raw, lastMeridiemRef.current);
    if (normalized) {
      lastMeridiemRef.current = normalized.toUpperCase().includes("PM") ? "PM" : "AM";
      onChange(normalized);
    }
  }

  return (
    <div className={cn("relative w-32", className)}>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          setOpen(false);
          commit(value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
          if (e.key === "Escape") setOpen(false);
        }}
      />
      {open && (
        <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-md bg-popover p-1 shadow-md ring-1 ring-foreground/10">
          {TIME_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                lastMeridiemRef.current = option.toUpperCase().includes("PM") ? "PM" : "AM";
                onChange(option);
                setOpen(false);
              }}
              className={cn(
                "block w-full cursor-pointer rounded-md px-2 py-1 text-left text-sm hover:bg-accent",
                value === option && "bg-accent font-medium",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { TimeInput };
