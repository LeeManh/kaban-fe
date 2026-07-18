"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { getApiErrorMessage } from "@/lib/api/client";

import { useCreateBoardFromTemplate } from "../_hooks/use-create-board-from-template";

export function UseTemplatePopover({
  templateId,
  templateName,
}: {
  templateId: string;
  templateName: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const createBoard = useCreateBoardFromTemplate(templateId);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setTitle("");
      createBoard.reset();
    }
  }

  function handleCreate() {
    createBoard.mutate(
      { name: title.trim() },
      {
        onSuccess: (board) => {
          toast.success("Board created from template.");
          handleOpenChange(false);
          router.push(`/boards/${board.id}`);
        },
        onError: (err) =>
          toast.error(getApiErrorMessage(err, "Could not create board from template.")),
      },
    );
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger render={<Button className="cursor-pointer">Use template</Button>} />
      <PopoverContent align="end" className="w-80 gap-3.5 p-4">
        <PopoverTitle className="text-sm font-semibold text-foreground">
          Use template
        </PopoverTitle>

        <Field>
          <FieldLabel
            htmlFor="use-template-title"
            className="mb-1.5 text-xs font-semibold text-foreground"
          >
            Title <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="use-template-title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && title.trim()) handleCreate();
            }}
            placeholder={`Like "${templateName}" for example…`}
          />
        </Field>

        <Button
          className="w-full cursor-pointer"
          disabled={!title.trim() || createBoard.isPending}
          onClick={handleCreate}
        >
          {createBoard.isPending ? "Creating…" : "Create"}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
