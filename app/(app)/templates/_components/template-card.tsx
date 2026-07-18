import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/user-avatar";
import type { TemplateOwner, TemplateVisibility } from "@/lib/api/templates";
import { cn, toBackgroundStyle } from "@/lib/utils";

export interface TemplateCardProps {
  id: string;
  categorySlug: string;
  name: string;
  background: string;
  description: string | null;
  templateVisibility?: TemplateVisibility;
  owner?: TemplateOwner;
}

export function TemplateCard({
  id,
  categorySlug,
  name,
  background,
  description,
  templateVisibility,
  owner,
}: TemplateCardProps) {
  return (
    <Link
      href={`/templates/${categorySlug}/${id}`}
      className="relative flex cursor-pointer flex-col overflow-hidden"
    >
      <div
        style={{ background: toBackgroundStyle(background) }}
        className="relative h-32 shrink-0 rounded-sm bg-cover bg-center shadow-sm"
      >
        {templateVisibility && (
          <Badge
            variant={templateVisibility === "PUBLIC" ? "default" : "secondary"}
            className="absolute top-2 right-2"
          >
            {templateVisibility === "PUBLIC" ? "Public" : "Private"}
          </Badge>
        )}
      </div>

      {owner && (
        <UserAvatar
          user={owner}
          className="absolute top-30 left-2.5 size-9 -translate-y-1/2 rounded-md ring-2 ring-card after:rounded-md"
          imageClassName="rounded-md"
          fallbackClassName="rounded-md text-xs"
        />
      )}

      <div className={cn("flex flex-col gap-1 px-3.5 py-2.5", owner && "pt-6")}>
        <span className="truncate text-[15px] font-semibold text-foreground">{name}</span>
        {owner && (
          <span className="truncate text-[12px] text-muted-foreground">
            by {owner.name ?? owner.email}
          </span>
        )}
        <span className="line-clamp-2 min-h-8 leading-4 text-[13px] text-muted-foreground">
          {description}
        </span>
      </div>
    </Link>
  );
}
