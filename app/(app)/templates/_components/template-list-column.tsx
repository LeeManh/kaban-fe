import { BoardCardPreview } from "@/app/(app)/boards/[boardId]/_components/board-card-item";
import type { TemplateListPreview } from "@/lib/api/templates";

export function TemplateListColumn({
  list,
  onCardClick,
}: {
  list: TemplateListPreview;
  onCardClick: (cardId: string) => void;
}) {
  return (
    <div className="flex w-70 shrink-0 flex-col rounded-md bg-muted p-2">
      <div className="mb-1 flex shrink-0 items-center gap-1.5 px-1.5 py-1">
        <span className="flex-1 truncate text-[13.5px] font-semibold text-foreground">
          {list.title}
        </span>
        {list.cards.length > 0 && (
          <span className="text-xs font-medium text-muted-foreground">{list.cards.length}</span>
        )}
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto">
        {list.cards.map((card) => (
          <BoardCardPreview
            key={card.id}
            card={card}
            onClick={() => onCardClick(card.id)}
            className="cursor-pointer border-2 border-transparent shadow-sm hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          />
        ))}
      </div>
    </div>
  );
}
