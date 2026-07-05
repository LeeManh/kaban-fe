"use client";

import { Check, Upload, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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

export interface CreateBoardResult {
  name: string;
  background: string;
}

interface CreateBoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (result: CreateBoardResult) => void;
}

export function CreateBoardDialog({ open, onOpenChange, onCreate }: CreateBoardDialogProps) {
  const [name, setName] = useState("");
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [selectedColor, setSelectedColor] = useState(SWATCHES[0].color);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);

  const showNameError = triedSubmit && name.trim() === "";

  function reset() {
    setName("");
    setTriedSubmit(false);
    setSelectedColor(SWATCHES[0].color);
    setUploadUrl(null);
  }

  function handleOpenChange(next: boolean) {
    if (!next) reset();
    onOpenChange(next);
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadUrl(URL.createObjectURL(file));
  }

  function handleSubmit() {
    if (name.trim() === "") {
      setTriedSubmit(true);
      return;
    }
    const background = uploadUrl
      ? `center / cover no-repeat url(${uploadUrl})`
      : `linear-gradient(135deg, ${selectedColor}, ${selectedColor})`;
    onCreate({ name: name.trim(), background });
    handleOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-0 rounded-md border border-slate-200 p-6 sm:max-w-120">
        <DialogHeader className="gap-0">
          <DialogTitle className="mb-1.5 text-lg font-semibold text-slate-950">
            Create board
          </DialogTitle>
          <DialogDescription className="mb-5.5 text-sm leading-normal text-slate-500">
            Give your board a name and pick a background to get started.
          </DialogDescription>
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
          <FieldLabel className="mb-2.25 text-sm font-medium text-slate-950">
            Background
          </FieldLabel>
          <Tabs defaultValue="colors">
            <TabsList className="mb-3.5 gap-0.5 rounded-md p-0.5 group-data-horizontal/tabs:h-7.5">
              <TabsTrigger value="colors" className="rounded-sm px-4 text-[13px] font-medium">
                Colors
              </TabsTrigger>
              <TabsTrigger value="photo" className="rounded-sm px-4 text-[13px] font-medium">
                Upload photo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="colors" className="mt-0">
              <div className="mb-2 grid grid-cols-5 gap-2.5">
                {SWATCHES.map((sw) => (
                  <button
                    key={sw.color}
                    type="button"
                    aria-label={sw.label}
                    onClick={() => {
                      setSelectedColor(sw.color);
                      setUploadUrl(null);
                    }}
                    className="relative aspect-square w-full rounded-md hover:brightness-110 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                    style={{ backgroundColor: sw.color }}
                  >
                    {selectedColor === sw.color && !uploadUrl && (
                      <Check
                        className="absolute top-1/2 left-1/2 size-4.25 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow"
                        strokeWidth={3}
                      />
                    )}
                  </button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="photo" className="mt-0">
              <label
                className="relative mb-2 flex h-33 flex-col items-center justify-center gap-2 rounded-md border-[1.5px] border-dashed border-slate-300 bg-slate-50 bg-cover bg-center p-3 text-center text-slate-600 hover:border-primary hover:bg-blue-50/50 hover:text-primary"
                style={uploadUrl ? { backgroundImage: `url(${uploadUrl})` } : undefined}
              >
                {uploadUrl ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setUploadUrl(null);
                    }}
                    aria-label="Remove uploaded image"
                    className="absolute top-2 right-2 flex size-6.5 items-center justify-center rounded-sm bg-white/90 text-slate-600 hover:bg-white hover:text-destructive"
                  >
                    <X className="size-3.5" />
                  </button>
                ) : (
                  <>
                    <Upload className="size-5" />
                    <span className="text-[12.5px] font-semibold">Click to upload an image</span>
                    <span className="text-[11px] text-slate-400">JPG or PNG, up to 5MB</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  aria-label="Upload background image file"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
            </TabsContent>
          </Tabs>
        </Field>

        <DialogFooter className="mt-4.5 mx-0 mb-0 flex-row justify-end gap-2 rounded-none border-t-0 bg-transparent p-0">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            className="h-9 rounded-sm px-4 text-sm font-medium"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="h-9 rounded-sm px-4 text-sm font-medium">
            Create board
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
