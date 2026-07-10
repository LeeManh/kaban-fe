"use client";

import { Check, ChevronLeft, Pencil, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PopoverClose, PopoverTitle } from "@/components/ui/popover";
import type { CardLabel } from "@/lib/api/boards";

import { useAssignCardLabel, useRemoveCardLabel } from "../_hooks/use-card-labels";
import { useCreateLabel } from "../_hooks/use-create-label";
import { useDeleteLabel } from "../_hooks/use-delete-label";
import { useLabels } from "../_hooks/use-labels";
import { useUpdateLabel } from "../_hooks/use-update-label";
import { LabelSwatch } from "./label-swatch";

const LABEL_COLORS = [
  "#baf3db",
  "#f8e6a0",
  "#ffe2bd",
  "#ffd5d2",
  "#dfd8fd",
  "#4bce97",
  "#f5cd47",
  "#fea362",
  "#f87168",
  "#9f8fef",
  "#1f845a",
  "#946f00",
  "#c25100",
  "#ae2e24",
  "#6e5dc6",
  "#cce0ff",
  "#c6edfb",
  "#d3f1a7",
  "#fdd0ec",
  "#dcdfe4",
  "#579dff",
  "#6cc3e0",
  "#94c748",
  "#e774bb",
  "#8fa3bf",
  "#0055cc",
  "#227d9b",
  "#5b7f24",
  "#943d73",
  "#626f86",
];

const NO_COLOR = "#dcdfe4";

type PopoverMode = "list" | "create" | "edit";

export function CardLabelsPopoverContent({
  boardId,
  cardId,
  cardLabels,
}: {
  boardId: string;
  cardId: string;
  cardLabels: CardLabel[];
}) {
  const [mode, setMode] = useState<PopoverMode>("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formColor, setFormColor] = useState(LABEL_COLORS[5]);

  const { data: boardLabels } = useLabels(boardId);
  const createLabel = useCreateLabel(boardId);
  const updateLabel = useUpdateLabel(boardId);
  const deleteLabel = useDeleteLabel(boardId);
  const assignLabel = useAssignCardLabel(boardId);
  const removeLabel = useRemoveCardLabel(boardId);

  const cardLabelIds = new Set(cardLabels.map((label) => label.id));

  const filteredLabels = (boardLabels ?? []).filter((label) =>
    label.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  function toggleLabel(label: CardLabel) {
    if (cardLabelIds.has(label.id)) {
      removeLabel.mutate({ cardId, labelId: label.id });
    } else {
      assignLabel.mutate({ cardId, label });
    }
  }

  function resetForm() {
    setMode("list");
    setEditingLabelId(null);
    setFormName("");
    setFormColor(LABEL_COLORS[5]);
  }

  function openCreate() {
    setFormName("");
    setFormColor(LABEL_COLORS[5]);
    setMode("create");
  }

  function openEdit(label: CardLabel) {
    setEditingLabelId(label.id);
    setFormName(label.name);
    setFormColor(label.color);
    setMode("edit");
  }

  function submitCreateLabel() {
    const trimmed = formName.trim();
    if (!trimmed) return;
    createLabel.mutate({ name: trimmed, color: formColor }, { onSuccess: resetForm });
  }

  function submitUpdateLabel() {
    const trimmed = formName.trim();
    if (!trimmed || !editingLabelId) return;
    updateLabel.mutate(
      { labelId: editingLabelId, name: trimmed, color: formColor },
      { onSuccess: resetForm },
    );
  }

  function handleDeleteLabel() {
    if (!editingLabelId) return;
    deleteLabel.mutate(editingLabelId, { onSuccess: resetForm });
  }

  if (mode === "create" || mode === "edit") {
    const isEdit = mode === "edit";
    const isSaving = isEdit ? updateLabel.isPending : createLabel.isPending;

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Back"
            className="cursor-pointer"
            onClick={resetForm}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <PopoverTitle className="flex-1 text-center text-sm font-semibold text-slate-900">
            {isEdit ? "Edit label" : "Create label"}
          </PopoverTitle>
          <PopoverClose
            render={<Button variant="ghost" size="icon-xs" className="cursor-pointer" />}
          >
            <X className="size-3.5" />
            <span className="sr-only">Close</span>
          </PopoverClose>
        </div>

        <div className="flex h-16 items-center justify-center rounded-md bg-slate-100 p-3">
          <div
            style={{ backgroundColor: formColor }}
            className="flex h-8 w-full items-center justify-center rounded-md px-2.5 text-[13px] font-medium text-black"
          >
            {isEdit ? formName : ""}
          </div>
        </div>

        <div>
          <div className="mb-1.5 text-xs font-semibold text-slate-700">Title</div>
          <Input
            autoFocus
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (isEdit) {
                  submitUpdateLabel();
                } else {
                  submitCreateLabel();
                }
              }
              if (e.key === "Escape") resetForm();
            }}
          />
        </div>

        <div>
          <div className="mb-1.5 text-xs font-semibold text-slate-700">Select a color</div>
          <div className="grid grid-cols-5 gap-1.5">
            {LABEL_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={color}
                onClick={() => setFormColor(color)}
                style={{ backgroundColor: color }}
                className="relative flex h-9 cursor-pointer items-center justify-center rounded-md hover:brightness-110"
              >
                {formColor === color && <Check className="size-4 text-white" strokeWidth={3} />}
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full cursor-pointer gap-1.5"
          onClick={() => setFormColor(NO_COLOR)}
        >
          <X className="size-3.5" />
          Remove color
        </Button>

        {isEdit ? (
          <div className="flex items-center justify-between gap-2">
            <Button
              size="sm"
              className="cursor-pointer w-1/2"
              disabled={!formName.trim() || isSaving}
              onClick={submitUpdateLabel}
            >
              {isSaving ? "Saving…" : "Save"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="cursor-pointer w-1/2"
              disabled={deleteLabel.isPending}
              onClick={handleDeleteLabel}
            >
              {deleteLabel.isPending ? "Deleting…" : "Delete"}
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            className="w-full cursor-pointer"
            disabled={!formName.trim() || isSaving}
            onClick={submitCreateLabel}
          >
            {isSaving ? "Creating…" : "Create"}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <PopoverTitle className="mx-auto text-sm font-semibold text-slate-900">Labels</PopoverTitle>
        <PopoverClose render={<Button variant="ghost" size="icon-xs" className="cursor-pointer" />}>
          <X className="size-3.5" />
          <span className="sr-only">Close</span>
        </PopoverClose>
      </div>

      <Input
        autoFocus
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search labels…"
      />

      <div>
        <div className="mb-1.5 text-xs font-semibold text-slate-700">Labels</div>
        <div className="flex flex-col gap-1.5">
          {filteredLabels.map((label) => (
            <div key={label.id} className="flex items-center gap-2">
              <Checkbox
                checked={cardLabelIds.has(label.id)}
                onCheckedChange={() => toggleLabel(label)}
              />
              <LabelSwatch label={label} className="h-8 flex-1 px-2.5 text-[13px]" />
              <button
                type="button"
                aria-label="Edit label"
                onClick={() => openEdit(label)}
                className="flex size-7 cursor-pointer items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
              >
                <Pencil className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" size="sm" className="w-full cursor-pointer" onClick={openCreate}>
        Create a new label
      </Button>
    </div>
  );
}
