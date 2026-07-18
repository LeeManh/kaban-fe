"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { TemplateCategory } from "@/lib/api/templates";

import { TEMPLATE_CATEGORIES } from "../../../templates/_lib/template-categories";
import { useMakeTemplate } from "../_hooks/use-make-template";

export function BoardMakeTemplateDialog({
  open,
  onOpenChange,
  boardId,
  boardName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  boardId: string;
  boardName: string;
}) {
  const [name, setName] = useState(boardName);
  const [category, setCategory] = useState<TemplateCategory | "">("");
  const [description, setDescription] = useState("");

  const makeTemplate = useMakeTemplate(boardId);

  function reset() {
    setName(boardName);
    setCategory("");
    setDescription("");
  }

  function handleCreate() {
    if (!name.trim() || !category) return;

    makeTemplate.mutate(
      {
        name: name.trim(),
        templateCategory: category,
        description: description.trim() || undefined,
      },
      {
        onSuccess: () => {
          toast.success("Template created.");
          onOpenChange(false);
          reset();
        },
      },
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) reset();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Create template</DialogTitle>
        <DialogDescription>
          This creates a copy of this board as a template. Cards, lists, labels, and attachments are
          kept, but members and due dates are not.
        </DialogDescription>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="template-name">
            Template name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="template-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="template-category">
            Category <span className="text-destructive">*</span>
          </Label>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value as TemplateCategory)}
          >
            <SelectTrigger id="template-category">
              <SelectValue placeholder="Select a category">
                {(value: TemplateCategory) =>
                  TEMPLATE_CATEGORIES.find((c) => c.value === value)?.label ?? value
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {TEMPLATE_CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="template-description">Description (optional)</Label>
          <Textarea
            id="template-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this template for?"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="cursor-pointer">
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!name.trim() || !category || makeTemplate.isPending}
            className="cursor-pointer"
          >
            {makeTemplate.isPending ? "Creating…" : "Create template"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
