"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";

interface CardChecklistItemFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isPending: boolean;
  placeholder?: string;
  submitLabel: string;
  pendingLabel: string;
  checkbox?: { checked: boolean; onCheckedChange: () => void };
  className?: string;
}

export function CardChecklistItemForm({
  value,
  onChange,
  onSubmit,
  onCancel,
  isPending,
  placeholder,
  submitLabel,
  pendingLabel,
  checkbox,
  className,
}: CardChecklistItemFormProps) {
  const formRef = useClickOutside<HTMLDivElement>(onCancel);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
    if (e.key === "Escape") onCancel();
  }

  return (
    <div ref={formRef} className={className}>
      {checkbox ? (
        <div className="flex items-center gap-2.5">
          <Checkbox
            checked={checkbox.checked}
            onCheckedChange={checkbox.onCheckedChange}
            className="cursor-pointer"
          />
          <Input
            autoFocus
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={(e) => e.currentTarget.select()}
            placeholder={placeholder}
            className="flex-1 text-[13.5px]"
            onKeyDown={handleKeyDown}
          />
        </div>
      ) : (
        <Input
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="text-[13.5px]"
          onKeyDown={handleKeyDown}
        />
      )}
      <div className={cn("mt-1.5 flex items-center gap-2", checkbox && "ml-6.5")}>
        <Button
          size="sm"
          className="cursor-pointer"
          disabled={!value.trim() || isPending}
          onClick={onSubmit}
        >
          {isPending ? pendingLabel : submitLabel}
        </Button>
        <Button variant="ghost" size="sm" className="cursor-pointer" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
