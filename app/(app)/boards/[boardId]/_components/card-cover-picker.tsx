import { Check, X } from "lucide-react";

import type { UnsplashPhoto } from "@/app/api/unsplash/random/route";
import { Button } from "@/components/ui/button";
import { PopoverClose, PopoverTitle } from "@/components/ui/popover";

const COVER_COLORS = [
  "#4bce97",
  "#f5cd47",
  "#fea362",
  "#f87168",
  "#9f8fef",
  "#579dff",
  "#6cc3e0",
  "#94c748",
  "#e774bb",
  "#8fa3bf",
];

export function CardCoverPicker({
  value,
  onChange,
  photos,
  onSearchClick,
}: {
  value: string;
  onChange: (value: string) => void;
  photos?: UnsplashPhoto[];
  onSearchClick: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <PopoverTitle className="text-sm font-semibold text-foreground">Cover</PopoverTitle>
        <PopoverClose render={<Button variant="ghost" size="icon-xs" className="cursor-pointer" />}>
          <X className="size-3.5" />
          <span className="sr-only">Close</span>
        </PopoverClose>
      </div>

      <div className="flex max-h-96 flex-col gap-3 overflow-y-aut">
        <div>
          <div className="mb-1.5 text-xs font-semibold text-foreground">Colors</div>
          <div className="grid grid-cols-5 gap-1.5">
            {COVER_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={color}
                onClick={() => onChange(color)}
                style={{ backgroundColor: color }}
                className="relative h-8 cursor-pointer rounded-md hover:brightness-110 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
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

        <div>
          <div className="mb-1.5 text-xs font-semibold text-foreground">Photos from Unsplash</div>
          <div className="grid grid-cols-3 gap-1.5">
            {photos?.map((photo) => (
              <button
                key={photo.id}
                type="button"
                aria-label={`Cover photo by ${photo.authorName}`}
                onClick={() => onChange(photo.regularUrl)}
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
          <Button
            variant="outline"
            size="default"
            className="mt-3 w-full cursor-pointer"
            onClick={onSearchClick}
          >
            Search for photos
          </Button>
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
    </>
  );
}
