import Link from "next/link";

import { toBackgroundStyle } from "@/lib/utils";

export interface TemplateCardProps {
  id: string;
  categorySlug: string;
  name: string;
  background: string;
  description: string | null;
}

export function TemplateCard({
  id,
  categorySlug,
  name,
  background,
  description,
}: TemplateCardProps) {
  return (
    <Link
      href={`/templates/${categorySlug}/${id}`}
      className="flex cursor-pointer flex-col overflow-hidden"
    >
      <div
        style={{ background: toBackgroundStyle(background) }}
        className="h-32 shrink-0 rounded-sm bg-cover bg-center"
      />
      <div className="flex flex-col gap-1 px-3.5 py-2.5">
        <span className="truncate text-[15px] font-semibold text-foreground">{name}</span>
        <span className="line-clamp-2 min-h-8 leading-4 text-[13px] text-muted-foreground">
          {description}
        </span>
      </div>
    </Link>
  );
}
