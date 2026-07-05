"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getApiErrorMessage } from "@/lib/api/client";
import { cn } from "@/lib/utils";

import { useCreateBoard } from "../_hooks/use-create-board";

const SWATCHES = [
  { label: "Blue", color: "#0d74b8" },
  { label: "Gold", color: "#c08a2e" },
  { label: "Green", color: "#4c8a3f" },
  { label: "Brick", color: "#a6402f" },
  { label: "Purple", color: "#8e5ea8" },
  { label: "Pink", color: "#c1548c" },
  { label: "Mint", color: "#4fbe73" },
  { label: "Cyan", color: "#12afcb" },
  { label: "Gray", color: "#7c828a" },
];

interface CreateBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateBoardDialog({ open, onOpenChange }: CreateBoardDialogProps) {
  const [name, setName] = useState("");
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [selectedColor, setSelectedColor] = useState(SWATCHES[0].color);
  const createBoard = useCreateBoard();

  const showNameError = triedSubmit && name.trim() === "";

  function reset() {
    setName("");
    setTriedSubmit(false);
    setSelectedColor(SWATCHES[0].color);
    createBoard.reset();
  }

  function handleOpenChange(next: boolean) {
    if (!next) reset();
    onOpenChange(next);
  }

  function handleSubmit() {
    if (name.trim() === "") {
      setTriedSubmit(true);
      return;
    }
    const background = `linear-gradient(135deg, ${selectedColor}, ${selectedColor})`;
    createBoard.mutate(
      { name: name.trim(), background },
      {
        onSuccess: () => {
          handleOpenChange(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-0 rounded-md border border-slate-200 p-6 sm:max-w-120">
        <DialogHeader className="gap-0">
          <DialogTitle className="mb-1.5 text-lg font-semibold text-slate-950">
            Create board
          </DialogTitle>
        </DialogHeader>

        <Field data-invalid={showNameError} className="gap-0">
          <FieldLabel htmlFor="board-name" className="mb-1.75 text-sm font-medium text-slate-950">
            Board name
          </FieldLabel>
          <Input
            id="board-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Product Roadmap"
            aria-invalid={showNameError}
            className={cn("h-9 rounded-sm px-3 text-sm", showNameError ? "mb-0" : "mb-3.5")}
          />
          {showNameError && (
            <FieldError className="mb-3.5 text-[12.5px]">Board name is required.</FieldError>
          )}
        </Field>

        <Field className="gap-0">
          <FieldLabel className="mb-2.25 text-sm font-medium text-slate-950">Background</FieldLabel>
          <div className="grid grid-cols-5 gap-2.5">
            {SWATCHES.map((sw) => (
              <button
                key={sw.color}
                type="button"
                aria-label={sw.label}
                onClick={() => setSelectedColor(sw.color)}
                className="relative aspect-square w-full rounded-md hover:brightness-110 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                style={{ backgroundColor: sw.color }}
              >
                {selectedColor === sw.color && (
                  <Check
                    className="absolute top-1/2 left-1/2 size-4.25 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow"
                    strokeWidth={3}
                  />
                )}
              </button>
            ))}
          </div>
        </Field>

        {createBoard.isError && (
          <p className="mt-3 text-[12.5px] font-medium text-destructive">
            {getApiErrorMessage(createBoard.error, "Could not create board. Please try again.")}
          </p>
        )}

        <DialogFooter className="mt-4.5 mx-0 mb-0 flex-row justify-end gap-2 rounded-none border-t-0 bg-transparent p-0">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={createBoard.isPending}
            className="h-9 rounded-sm px-4 text-sm font-medium"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={createBoard.isPending}
            className="h-9 rounded-sm px-4 text-sm font-medium"
          >
            {createBoard.isPending ? "Creating…" : "Create board"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
