"use client";

import { Check, Globe, Lock } from "lucide-react";

import { PopoverSubHeader } from "@/components/ui/popover";
import type { TemplateVisibility } from "@/lib/api/boards";
import { cn } from "@/lib/utils";

import { useUpdateTemplateVisibility } from "../../../templates/_hooks/use-update-template-visibility";

const OPTIONS: {
  value: TemplateVisibility;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClassName: string;
}[] = [
  {
    value: "PRIVATE",
    label: "Private",
    description: "Only you can see and use this template.",
    icon: Lock,
    iconClassName: "text-destructive",
  },
  {
    value: "PUBLIC",
    label: "Public",
    description: "Anyone can find and use this template from the gallery.",
    icon: Globe,
    iconClassName: "text-emerald-500",
  },
];

export function BoardVisibilityPopover({
  boardId,
  visibility,
  onBack,
}: {
  boardId: string;
  visibility: TemplateVisibility;
  onBack: () => void;
}) {
  const updateVisibility = useUpdateTemplateVisibility(boardId);

  return (
    <>
      <PopoverSubHeader title="Change visibility" onBack={onBack} />

      <div className="flex flex-col gap-1">
        {OPTIONS.map((option) => {
          const isActive = option.value === visibility;
          return (
            <button
              key={option.value}
              type="button"
              disabled={updateVisibility.isPending}
              onClick={() => {
                if (!isActive) updateVisibility.mutate(option.value);
              }}
              className="flex w-full cursor-pointer items-start gap-2.5 rounded-md px-2 py-1.5 text-left hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
            >
              <option.icon className={cn("mt-0.5 size-4 shrink-0", option.iconClassName)} />
              <div className="flex-1">
                <div className="text-[13.5px] font-medium text-foreground">{option.label}</div>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
              <Check
                className={cn(
                  "mt-0.5 size-4 shrink-0 text-foreground",
                  !isActive && "invisible",
                )}
              />
            </button>
          );
        })}
      </div>
    </>
  );
}
