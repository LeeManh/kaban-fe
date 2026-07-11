import { Check } from "lucide-react";

import type { UnsplashPhoto } from "@/app/api/unsplash/random/route";
import { Button } from "@/components/ui/button";

import { COVER_COLORS } from "../[boardId]/_components/card-cover-picker";

export const COLOR_SWATCHES = [
  { label: "Light blue", value: "linear-gradient(135deg, #f0f6fd, #dbe7f8)" },
  { label: "Sky", value: "linear-gradient(135deg, #6ec6f1, #1c6fd8)" },
  { label: "Ocean", value: "linear-gradient(135deg, #2f6fd1, #0c3a86)" },
  { label: "Indigo", value: "linear-gradient(135deg, #2a1a4d, #9c3fb5)" },
  { label: "Purple", value: "linear-gradient(135deg, #7a4fc9, #d97fd0)" },
  { label: "Orange", value: "linear-gradient(135deg, #d9531e, #f7b733)" },
  { label: "Pink", value: "linear-gradient(135deg, #e0607a, #f7b3a1)" },
  { label: "Teal", value: "linear-gradient(135deg, #00786d, #8fdfd2)" },
  { label: "Slate", value: "linear-gradient(135deg, #16233f, #4c6690)" },
  { label: "Brown", value: "linear-gradient(135deg, #3f1811, #a8402b)" },
];

export function BoardBackgroundPicker({
  value,
  onChange,
  photos,
  onViewMorePhotos,
  onViewMoreColors,
}: {
  value: string;
  onChange: (value: string, downloadLocation?: string) => void;
  photos?: UnsplashPhoto[];
  onViewMorePhotos: () => void;
  onViewMoreColors: () => void;
}) {
  return (
    <div className="flex max-h-96 flex-col gap-3 overflow-y-auto">
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Photos</span>
          <Button
            variant="outline"
            size="sm"
            className="h-6 cursor-pointer px-2 text-[11px]"
            onClick={onViewMorePhotos}
          >
            View more
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {photos?.map((photo) => (
            <button
              key={photo.id}
              type="button"
              aria-label={`Background photo by ${photo.authorName}`}
              onClick={() => onChange(photo.regularUrl, photo.downloadLocation)}
              style={{ backgroundImage: `url(${photo.thumbUrl})` }}
              className="relative h-14 cursor-pointer rounded-md bg-cover bg-center hover:brightness-110 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              {value === photo.regularUrl && (
                <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-white">
                  <Check className="size-2.5 text-slate-900" strokeWidth={3} />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Colors</span>
          <Button
            variant="outline"
            size="sm"
            className="h-6 cursor-pointer px-2 text-[11px]"
            onClick={onViewMoreColors}
          >
            View more
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {COLOR_SWATCHES.slice(0, 6).map((swatch) => (
            <button
              key={swatch.label}
              type="button"
              aria-label={swatch.label}
              onClick={() => onChange(swatch.value)}
              style={{ background: swatch.value }}
              className="relative h-14 cursor-pointer rounded-md hover:brightness-110 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              {value === swatch.value && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check className="size-4 text-white" strokeWidth={3} />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[11px] leading-snug text-muted-foreground">
        By using images from Unsplash, you agree to their{" "}
        <a
          href="https://unsplash.com/license"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-foreground"
        >
          license
        </a>{" "}
        and{" "}
        <a
          href="https://unsplash.com/tos"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-foreground"
        >
          Terms of Service
        </a>
        .
      </p>
    </div>
  );
}

export function BoardColorsPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex max-h-96 flex-col gap-3 overflow-y-auto">
      <div className="grid grid-cols-3 gap-1.5">
        {COLOR_SWATCHES.map((swatch) => (
          <button
            key={swatch.label}
            type="button"
            aria-label={swatch.label}
            onClick={() => onChange(swatch.value)}
            style={{ background: swatch.value }}
            className="relative h-14 cursor-pointer rounded-md hover:brightness-110 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            {value === swatch.value && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Check className="size-4 text-white" strokeWidth={3} />
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="h-px bg-border" />

      <div className="grid grid-cols-3 gap-1.5">
        {COVER_COLORS.map((color) => (
          <button
            key={color}
            type="button"
            aria-label={color}
            onClick={() => onChange(color)}
            style={{ backgroundColor: color }}
            className="relative h-14 cursor-pointer rounded-md hover:brightness-110 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            {value === color && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Check className="size-4 text-white" strokeWidth={3} />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
