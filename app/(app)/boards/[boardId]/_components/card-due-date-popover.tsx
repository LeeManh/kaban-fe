"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PopoverClose, PopoverTitle } from "@/components/ui/popover";
import { TimeInput } from "@/components/ui/time-input";

import { useUpdateCard } from "../_hooks/use-update-card";
import { formatDateInput, formatTimeInput, parseDateInput, parseTimeInput } from "../_lib/date-input";
import { CardDueDateReminder } from "./card-due-date-reminder";

export function CardDueDatePopoverContent({
  boardId,
  cardId,
  version,
  dueDate,
  reminderOffsetMinutes,
}: {
  boardId: string;
  cardId: string;
  version: number;
  dueDate: string | null;
  reminderOffsetMinutes: number | null;
}) {
  const initial = dueDate ? new Date(dueDate) : new Date();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(dueDate ? initial : undefined);
  const [hasDueDate, setHasDueDate] = useState(!!dueDate);
  const [dateText, setDateText] = useState(dueDate ? formatDateInput(initial) : "");
  const [timeText, setTimeText] = useState(dueDate ? formatTimeInput(initial) : "");
  const [reminder, setReminder] = useState<number | null>(reminderOffsetMinutes);

  const updateCard = useUpdateCard(boardId);

  function selectDate(date: Date | undefined) {
    setSelectedDate(date);
    if (date) {
      setHasDueDate(true);
      setDateText(formatDateInput(date));
    }
  }

  function buildDueDate(): Date | null {
    const datePart = parseDateInput(dateText) ?? selectedDate ?? null;
    if (!datePart) return null;
    const result = new Date(datePart);
    const timePart = parseTimeInput(timeText);
    if (timePart) result.setHours(timePart.hours, timePart.minutes, 0, 0);
    return result;
  }

  function handleSave() {
    if (!hasDueDate) {
      handleRemove();
      return;
    }
    const due = buildDueDate();
    if (!due) return;
    updateCard.mutate({
      cardId,
      version,
      dueDate: due.toISOString(),
      reminderOffsetMinutes: reminder,
    });
  }

  function handleRemove() {
    updateCard.mutate({
      cardId,
      version,
      dueDate: null,
      reminderOffsetMinutes: null,
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <PopoverTitle className="mx-auto text-sm font-semibold text-slate-900">Dates</PopoverTitle>
        <PopoverClose render={<Button variant="ghost" size="icon-xs" className="cursor-pointer" />}>
          <X className="size-3.5" />
          <span className="sr-only">Close</span>
        </PopoverClose>
      </div>

      <Calendar
        mode="single"
        captionLayout="dropdown"
        selected={selectedDate}
        onSelect={selectDate}
        endMonth={new Date(new Date().getFullYear() + 10, 11)}
        disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
        className="mx-auto"
      />

      <div>
        <div className="mb-1.5 text-xs font-semibold text-slate-700">Due date</div>
        <div className="flex items-center gap-2">
          <Checkbox checked={hasDueDate} onCheckedChange={(checked) => setHasDueDate(!!checked)} />
          <Input
            value={dateText}
            onChange={(e) => setDateText(e.target.value)}
            placeholder="M/D/YYYY"
            className="flex-1"
          />
          <TimeInput value={timeText} onChange={setTimeText} />
        </div>
      </div>

      <CardDueDateReminder value={reminder} onChange={setReminder} />

      <PopoverClose render={<Button size="sm" className="w-full cursor-pointer" onClick={handleSave} />}>
        Save
      </PopoverClose>
      <PopoverClose
        render={
          <Button variant="outline" size="sm" className="w-full cursor-pointer" onClick={handleRemove} />
        }
      >
        Remove
      </PopoverClose>
    </div>
  );
}
