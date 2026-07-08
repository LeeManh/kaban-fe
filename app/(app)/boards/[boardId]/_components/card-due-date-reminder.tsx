"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const REMINDER_OPTIONS: { label: string; value: number | null }[] = [
  { label: "None", value: null },
  { label: "At time of due date", value: 0 },
  { label: "5 Minutes before", value: 5 },
  { label: "10 Minutes before", value: 10 },
  { label: "15 Minutes before", value: 15 },
  { label: "1 Hour before", value: 60 },
  { label: "2 Hours before", value: 120 },
  { label: "1 Day before", value: 1440 },
  { label: "2 Days before", value: 2880 },
];

export function CardDueDateReminder({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (value: number | null) => void;
}) {
  const current = REMINDER_OPTIONS.find((option) => option.value === value) ?? REMINDER_OPTIONS[0];

  return (
    <div>
      <div className="mb-1.5 text-xs font-semibold text-slate-700">Set due date reminder</div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" className="w-full cursor-pointer justify-between" />}
        >
          {current.label}
          <ChevronDown className="size-3.5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          {REMINDER_OPTIONS.map((option) => (
            <DropdownMenuItem key={option.label} onClick={() => onChange(option.value)}>
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <p className="mt-1.5 text-xs text-slate-500">
        Reminders will be sent to all members and watchers of this card.
      </p>
    </div>
  );
}
