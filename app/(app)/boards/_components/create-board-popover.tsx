"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Ellipsis, X } from "lucide-react";
import { type ReactElement, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toBackgroundStyle } from "@/lib/utils";

import { useCreateBoard } from "../_hooks/use-create-board";
import { notifyUnsplashDownload, useUnsplashPhotos } from "../_hooks/use-unsplash-photos";

const COLOR_SWATCHES = [
  { label: "Light blue", value: "#cfe3f7" },
  { label: "Blue", value: "#4f8fd1" },
  { label: "Navy", value: "#1c4f8c" },
  { label: "Purple", value: "linear-gradient(135deg, #6a3ea1, #8e5ea8)" },
  { label: "Pink", value: "linear-gradient(135deg, #b34fa8, #c1548c)" },
];

const createBoardSchema = z.object({
  name: z.string().min(1, "Board title is required"),
  background: z.string().min(1, "Please choose a background."),
});

type CreateBoardValues = z.infer<typeof createBoardSchema>;

export function CreateBoardPopover({ children }: { children: ReactElement }) {
  const [open, setOpen] = useState(false);
  const createBoard = useCreateBoard();
  const { data: photos } = useUnsplashPhotos(open);
  const [downloadLocation, setDownloadLocation] = useState<string | undefined>(undefined);

  const form = useForm<CreateBoardValues>({
    resolver: zodResolver(createBoardSchema),
    defaultValues: { name: "", background: COLOR_SWATCHES[0].value },
  });

  function reset() {
    form.reset({ name: "", background: COLOR_SWATCHES[0].value });
    setDownloadLocation(undefined);
    createBoard.reset();
  }

  function handleOpenChange(next: boolean) {
    if (!next) reset();
    setOpen(next);
  }

  function onSubmit(data: CreateBoardValues) {
    createBoard.mutate(
      { name: data.name.trim(), background: data.background },
      {
        onSuccess: () => {
          if (downloadLocation) notifyUnsplashDownload(downloadLocation);
          handleOpenChange(false);
        },
      },
    );
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger render={children} />
      <PopoverContent align="start" className="w-80 gap-3.5 p-4">
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="contents">
          <div className="flex items-center justify-between">
            <PopoverTitle className="mx-auto text-sm font-semibold text-slate-900">
              Create board
            </PopoverTitle>
            <PopoverClose render={<Button variant="ghost" size="icon-xs" />}>
              <X />
              <span className="sr-only">Close</span>
            </PopoverClose>
          </div>

          <Controller
            name="background"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <div
                  style={{ background: toBackgroundStyle(field.value) }}
                  className="relative mx-auto flex w-[60%] flex-col items-center gap-3 rounded-md bg-cover bg-center px-3 pt-2 pb-3"
                >
                  <Logo iconOnly className="shrink-0" />
                  <div className="grid w-full grid-cols-3 items-start gap-1.5">
                    <div className="flex flex-col gap-1 rounded-sm bg-white/90 p-1.25">
                      <div className="h-1 w-6 rounded-full bg-slate-300" />
                      <div className="h-5 rounded-sm bg-slate-200" />
                      <div className="h-3 rounded-sm bg-slate-200" />
                    </div>
                    <div className="flex flex-col gap-1 rounded-sm bg-white/90 p-1.25">
                      <div className="h-1 w-6 rounded-full bg-slate-300" />
                      <div className="h-3 rounded-sm bg-slate-200" />
                    </div>
                    <div className="flex flex-col gap-1 rounded-sm bg-white/90 p-1.25">
                      <div className="h-1 w-6 rounded-full bg-slate-300" />
                      <div className="h-3 rounded-sm bg-slate-200" />
                      <div className="h-2 rounded-sm bg-slate-200" />
                      <div className="h-2 rounded-sm bg-slate-200" />
                      <div className="h-4 rounded-sm bg-slate-200" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 text-xs font-semibold text-slate-700">
                    Background <span className="text-destructive">*</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {photos?.map((photo) => (
                      <button
                        key={photo.id}
                        type="button"
                        aria-label={`Background photo by ${photo.authorName}`}
                        onClick={() => {
                          setDownloadLocation(photo.downloadLocation);
                          field.onChange(photo.regularUrl);
                        }}
                        style={{ backgroundImage: `url(${photo.thumbUrl})` }}
                        className="relative h-11 rounded-md bg-cover bg-center hover:brightness-110 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                      >
                        {field.value === photo.regularUrl && (
                          <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-white">
                            <Check className="size-2.5 text-slate-900" strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="mt-1.5 grid grid-cols-6 gap-1.5">
                    {COLOR_SWATCHES.map((swatch) => (
                      <button
                        key={swatch.label}
                        type="button"
                        aria-label={swatch.label}
                        onClick={() => {
                          setDownloadLocation(undefined);
                          field.onChange(swatch.value);
                        }}
                        style={{ background: swatch.value }}
                        className="relative h-8 rounded-md hover:brightness-110 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                      >
                        {field.value === swatch.value && (
                          <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-white">
                            <Check className="size-2.5 text-slate-900" strokeWidth={3} />
                          </span>
                        )}
                      </button>
                    ))}
                    <button
                      type="button"
                      aria-label="More colors"
                      className="relative flex h-8 items-center justify-center rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                    >
                      <Ellipsis className="size-4" />
                    </button>
                  </div>
                  {fieldState.invalid && (
                    <FieldError className="mt-1 text-[12.5px]">
                      {fieldState.error?.message}
                    </FieldError>
                  )}
                </div>
              </>
            )}
          />

          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor="popover-board-name"
                  required
                  className="mb-1.5 text-xs font-semibold text-slate-700"
                >
                  Board title
                </FieldLabel>
                <Input
                  {...field}
                  id="popover-board-name"
                  aria-invalid={fieldState.invalid}
                  className={fieldState.invalid ? "mb-0" : "mb-1"}
                />
                {fieldState.invalid && (
                  <FieldError className="text-[12.5px]" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button type="submit" disabled={createBoard.isPending} className="w-full">
            {createBoard.isPending ? "Creating…" : "Create"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
