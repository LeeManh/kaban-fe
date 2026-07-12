import { Skeleton } from "@/components/ui/skeleton";

const DEFAULT_CARD_HEIGHTS = [44, 64, 44];

export function BoardListSkeleton({
  cardHeights = DEFAULT_CARD_HEIGHTS,
}: {
  cardHeights?: number[];
}) {
  return (
    <div className="flex w-70 shrink-0 flex-col gap-2 rounded-md bg-muted p-2">
      <Skeleton className="h-4 w-24" />
      {cardHeights.map((height, index) => (
        <Skeleton key={index} className="w-full" style={{ height }} />
      ))}
    </div>
  );
}
